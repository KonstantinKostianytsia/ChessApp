import {initialChessBoardState} from 'boardStates/ChessBoardStates/initialChessBoardState';
import {
  getNewChessBoardStateFromPreviousAndMove,
  transformUpdateCellStateToChessBoardState,
} from 'helpers/ChessFiguresHelpers';
import {
  converColumnToColummnIndex,
  converRowToRowIndex,
} from 'helpers/boardHelpers';
import {action, makeObservable, observable} from 'mobx';

import {
  BoardCellCoord,
  BoardWithChessFigureState,
  UpdateCellState,
} from 'models/boardModels/Board';
import {BaseErrorType} from 'models/common/ErrorType';
import {BaseError} from 'models/errors/BaseError';
import {IChessBoardValidator} from 'models/helpers/validators/IChessBoardValidator';
import {
  IChessBoardAnalyzer,
  IChessMove,
} from 'models/services/IChessBoardAnalyzer';
import {IChessFigureTransformer} from 'models/services/IChessFigureTransformer';
import {GameStoreBase} from 'models/stores/GameStoreBase';
import {RootStore} from 'stores';

export class ChessGameStore extends GameStoreBase {
  chessBoardState: BoardWithChessFigureState = [];
  currentCellCoord: BoardCellCoord | undefined = undefined;
  shownErrorMoves: IChessMove | null = null;

  private _chessTransformerService: IChessFigureTransformer;
  private _chessBoardValidator: IChessBoardValidator;
  private _chessBoardAnalyzer: IChessBoardAnalyzer;
  private _rootStore: RootStore;

  constructor(
    chessTransformerService: IChessFigureTransformer,
    chessBoardValidator: IChessBoardValidator,
    chessBoardAnalyzer: IChessBoardAnalyzer,
    rootStore: RootStore,
  ) {
    super();
    /// makeAutoObservable can't be used in stores that use inheritance
    makeObservable(this, {
      chessBoardState: observable,
      currentCellCoord: observable,
      shownErrorMoves: observable,
      setChessBoardState: action,
      initializeBoard: action,
      setErrorMove: action,
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
            } catch (err) {
              throw err;
            }
          }
        } else {
          console.log(this._chessBoardValidator.getErrors());
          throw new BaseError(BaseErrorType.VALIDATION_ERROR);
        }
      }
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
}
