import {initialChessBoardState} from 'boardStates/ChessBoardStates/initialChessBoardState';
import {UNHANDLED_INNER_ERROR} from 'constants/ErrorConstants';
import {
  getNewChessBoardStateFromPreviousAndMove,
  transformUpdateCellStateToChessBoardState,
} from 'helpers/ChessFiguresHelpers';
import {action, makeObservable, observable} from 'mobx';

import {
  BoardCellCoord,
  BoardWithChessFigureState,
  UpdateCellState,
} from 'models/boardModels/Board';
import {IChessBoardValidator} from 'models/helpers/validators/IChessBoardValidator';
import {IChessBoardAnalyzer} from 'models/services/IChessBoardAnalyzer';
import {IChessFigureTransformer} from 'models/services/IChessFigureTransformer';
import {GameStoreBase} from 'models/stores/GameStoreBase';

export class ChessGameStore extends GameStoreBase {
  chessBoardState: BoardWithChessFigureState = [];
  currentCellCoord: BoardCellCoord | undefined = undefined;

  private _chessTransformerService: IChessFigureTransformer;
  private _chessBoardValidator: IChessBoardValidator;
  private _chessBoardAnalyzer: IChessBoardAnalyzer;

  constructor(
    chessTransformerService: IChessFigureTransformer,
    chessBoardValidator: IChessBoardValidator,
    chessBoardAnalyzer: IChessBoardAnalyzer,
  ) {
    super();
    /// makeAutoObservable can't be used in stores that use inheritance
    makeObservable(this, {
      chessBoardState: observable,
      currentCellCoord: observable,
      setChessBoardState: action,
      initializeBoard: action,
    });

    this._chessTransformerService = chessTransformerService;
    this._chessBoardValidator = chessBoardValidator;
    this._chessBoardAnalyzer = chessBoardAnalyzer;

    this.initializeBoard();
  }

  public setChessBoardState(boardState: BoardWithChessFigureState) {
    const isStateChanged = this._chessBoardValidator.setNewState(
      this.chessBoardState,
      boardState,
    );
    if (isStateChanged) {
      const foundMoves = this._chessBoardAnalyzer.findLastMove(
        this.chessBoardState,
        boardState,
      );
      if (foundMoves !== null) {
        if (this._chessBoardValidator.validate()) {
          if (foundMoves.length === 1) {
            this.chessBoardState = getNewChessBoardStateFromPreviousAndMove(
              this.chessBoardState,
              foundMoves[0],
            );
            this.makeMove(foundMoves[0].startPos, foundMoves[0].finishPos);
          } else {
            throw Error(UNHANDLED_INNER_ERROR);
          }
        }
      }
    }
  }

  /// Get New State
  /// Check if state changed
  /// Find last move comparing new state and previous, get all moves return null | Array<IMove>
  ///    if figure was in prev state and disappeared in new state it is startPos
  ///    if figure appeared in new state and it was undefiend in prev state it is finishPos
  ///    if figure changed the color in new state it is finishPos
  /// validate last move
  ///     consider castling if king and rook moved in one move
  ///     changing pawn to any figure if pawn got to another part
  ///     get pawn if king went to another board part
  /// set new state
  public onNewBoardStateMessage(updateCellsState: UpdateCellState[]) {
    const newChessBoardState =
      transformUpdateCellStateToChessBoardState(updateCellsState);
    this.setChessBoardState(newChessBoardState);
  }

  public initializeBoard() {
    const chessBoard =
      this._chessTransformerService.trasformeStringsToChessBoardState(
        initialChessBoardState,
      );
    this.chessBoardState = chessBoard;
  }
}
