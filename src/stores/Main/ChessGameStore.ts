import {initialChessBoardState} from 'boardStates/ChessBoardStates/initialChessBoardState';
import {DEFAULT_BOARD_SIZE} from 'constants/BoardConstants';
import {
  getNewChessBoardStateFromPreviousAndMove,
  transformUpdateCellStateToChessBoardState,
} from 'helpers/ChessFiguresHelpers';
import {
  converColumnToColummnIndex,
  converRowToRowIndex,
  convertColumnIndexToColumn,
  convertRowIndexToRow,
} from 'helpers/boardHelpers';
import {movesAreEqual} from 'helpers/utils/moveUtils';
import {action, makeObservable, observable} from 'mobx';

import {
  BoardCellCoord,
  BoardWithChessFigureState,
  UpdateCellState,
} from 'models/boardModels/Board';
import {
  ChessFigure,
  ChessFigureColor,
  ChessFigureType,
} from 'models/boardModels/ChessFigure';
import {BaseErrorType} from 'models/common/ErrorType';
import {BaseError} from 'models/errors/BaseError';
import {
  ChessEngineError,
  ChessEngineErrorType,
} from 'models/errors/ChessEngineError';
import {ChessMoveError, ChessMoveErrorType} from 'models/errors/ChessMoveError';
import {IChessBoardValidator} from 'models/helpers/validators/IChessBoardValidator';
import {
  IChessBoardAnalyzer,
  IChessMove,
} from 'models/services/IChessBoardAnalyzer';
import {
  IChessFigureTransformer,
  IChessFigureTransformerToFEN,
} from 'models/services/IChessFigureTransformer';
import {GameOverReason, GameStoreBase} from 'models/stores/GameStoreBase';
import {RootStore} from 'stores';

export class ChessGameStore extends GameStoreBase {
  chessBoardState: BoardWithChessFigureState = [];
  currentCellCoord: BoardCellCoord | undefined = undefined;
  shownErrorMoves: IChessMove | null = null;
  whoseTurn: ChessFigureColor = ChessFigureColor.White;
  isGameOver: boolean = false;
  gameOverReason: GameOverReason | null = null;

  private _chessTransformerService: IChessFigureTransformer;
  private _chessBoardValidator: IChessBoardValidator;
  private _chessBoardAnalyzer: IChessBoardAnalyzer &
    IChessFigureTransformerToFEN;
  private _rootStore: RootStore;

  constructor(
    chessTransformerService: IChessFigureTransformer,
    chessBoardValidator: IChessBoardValidator,
    chessBoardAnalyzer: IChessBoardAnalyzer & IChessFigureTransformerToFEN,
    rootStore: RootStore,
  ) {
    super();
    /// makeAutoObservable can't be used in stores that use inheritance
    makeObservable(this, {
      chessBoardState: observable,
      currentCellCoord: observable,
      shownErrorMoves: observable,
      whoseTurn: observable,
      setChessBoardState: action,
      initializeBoard: action,
      setErrorMove: action,
      changeWhoseTurn: action,
    });

    this._chessTransformerService = chessTransformerService;
    this._chessBoardValidator = chessBoardValidator;
    this._chessBoardAnalyzer = chessBoardAnalyzer;
    this._rootStore = rootStore;

    this.initializeBoard();
  }

  public setChessBoardState(boardState: BoardWithChessFigureState) {
    const isStateChanged = this._chessBoardAnalyzer.isStateChanged(
      this.chessBoardState,
      boardState,
    );
    this.checkPreviousIncorrectMovesFixed(boardState);
    if (isStateChanged) {
      const foundMoves = this._chessBoardAnalyzer.findLastMove(
        this.chessBoardState,
        boardState,
      );
      if (foundMoves !== null) {
        /// If it is stockfish turn
        /// check a figure was moved to a cell stockfish selected
        if (this.whoseTurn === ChessFigureColor.Black) {
          if (!this._rootStore.chessEngineStore.lastBestMove) {
            throw new ChessEngineError(
              ChessEngineErrorType.LastBestMoveNotFound,
            );
          }
          if (
            !movesAreEqual(
              foundMoves[0],
              this._rootStore.chessEngineStore.lastBestMove,
            )
          ) {
            throw new ChessMoveError(
              foundMoves[0],
              ChessMoveErrorType.IncorrectMove,
            );
          }
        }
        const newState = getNewChessBoardStateFromPreviousAndMove(
          this.chessBoardState,
          foundMoves[0],
        );
        this._chessBoardValidator.setNewState(newState);
        this._chessBoardValidator.setPrevState(this.chessBoardState);
        if (this._chessBoardValidator.validate()) {
          if (foundMoves.length === 1) {
            try {
              this._chessBoardAnalyzer.makeMove(foundMoves[0]);
              this.chessBoardState = newState;
              this.makeMove(foundMoves[0].startPos, foundMoves[0].finishPos);
              this.changeWhoseTurn();
            } catch (err) {
              throw err;
            }
          }
        } else {
          throw new BaseError(BaseErrorType.VALIDATION_ERROR);
        }
      } else {
        throw new Error('MOVE IS NULL');
      }
    } else {
      throw new Error("State didn't changed");
    }
  }

  /// Get New State
  /// Check if state changed
  /// Check previous error cells changed
  /// Find last move comparing new state and previous, get all moves return null | Array<IMove>
  ///    if figure was in prev state and disappeared in new state it is startPos
  ///    if figure appeared in new state and it was undefiend in prev state it is finishPos
  ///    if figure changed the color in new state it is finishPos
  /// validate last move
  /// set new state
  public onNewBoardStateMessage(updateCellsState: UpdateCellState[]) {
    try {
      const newChessBoardState = transformUpdateCellStateToChessBoardState(
        updateCellsState,
        this._rootStore.calibrationStore.averageData,
      );
      this.setChessBoardState(newChessBoardState);
    } catch (err) {
      throw err;
    }
  }

  public initializeBoard() {
    const chessBoard =
      this._chessTransformerService.trasformeStringsToChessBoardState(
        initialChessBoardState,
      );
    this.chessBoardState = chessBoard;
  }

  public setErrorMove(move: IChessMove) {
    this.shownErrorMoves = move;
  }

  public changeWhoseTurn() {
    if (this.whoseTurn === ChessFigureColor.White) {
      this.whoseTurn = ChessFigureColor.Black;
    } else {
      this.whoseTurn = ChessFigureColor.White;
    }
  }

  public getCurrentFenState() {
    return this._chessBoardAnalyzer.getFEN();
  }

  public checkKingIsUnderAttack() {
    try {
      const kingCellCoords = this.findFigure(
        new ChessFigure(this.whoseTurn, ChessFigureType.King),
      );
      const isUnderAttack = this._chessBoardAnalyzer.isCellUnderAtack(
        kingCellCoords,
        this.whoseTurn === ChessFigureColor.White
          ? ChessFigureColor.Black
          : ChessFigureColor.White,
      );
      if (isUnderAttack) {
        return {
          underAttack: true,
          cellCoords: kingCellCoords,
        };
      }
    } catch (err) {
      throw err;
    }
  }

  public checkIsGameOver(): boolean {
    if (this._chessBoardAnalyzer.isGameOver()) {
      this.isGameOver = true;
      if (this._chessBoardAnalyzer.isCheckmate()) {
        this.gameOverReason = GameOverReason.CheckMate;
      } else if (this._chessBoardAnalyzer.isStaleMate()) {
        this.gameOverReason = GameOverReason.StealMate;
      } else if (this._chessBoardAnalyzer.isDraw()) {
        this.gameOverReason = GameOverReason.Draw;
      } else if (this._chessBoardAnalyzer.isInsufficientMaterial()) {
        this.gameOverReason = GameOverReason.InsufficientMaterial;
      } else if (this._chessBoardAnalyzer.isThreefoldRepetition()) {
        this.gameOverReason = GameOverReason.ThreefoldRepetition;
      }
      return true;
    }
    return false;
  }

  private checkPreviousIncorrectMovesFixed(
    newState: BoardWithChessFigureState,
  ) {
    if (this.shownErrorMoves) {
      const newStartPosState =
        newState[converRowToRowIndex(this.shownErrorMoves.startPos.row)][
          converColumnToColummnIndex(this.shownErrorMoves.startPos.column)
        ];
      if (
        newStartPosState?.cellChessFigure &&
        newStartPosState.cellChessFigure.equals(
          this.shownErrorMoves.chessFigure,
        )
      ) {
        this.shownErrorMoves = null;
      }
    }
  }

  private findFigure(chessFigure: ChessFigure): BoardCellCoord {
    for (let row = 0; row < DEFAULT_BOARD_SIZE; ++row) {
      for (let column = 0; column < DEFAULT_BOARD_SIZE; ++column) {
        if (
          chessFigure.equals(this.chessBoardState[row][column]?.cellChessFigure)
        ) {
          return {
            row: convertRowIndexToRow(row),
            column: convertColumnIndexToColumn(column),
          };
        }
      }
    }
    throw new BaseError(BaseErrorType.NOT_FOUND, 'Such figure not found');
  }
}
