import {initialChessBoardState} from 'boardStates/ChessBoardStates/initialChessBoardState';
import {action, makeObservable, observable} from 'mobx';

import {
  BoardCellCoord,
  BoardWithChessFigureState,
} from 'models/boardModels/Board';
import {IChessFigureTransformer} from 'models/services/IChessFigureTransformer';
import {GameStoreBase} from 'models/stores/GameStoreBase';

export class ChessGameStore extends GameStoreBase {
  chessBoardState: BoardWithChessFigureState = [];
  currentCellCoord: BoardCellCoord | undefined = undefined;

  private _chessTransformerService: IChessFigureTransformer;
  //   private _chessBoardValidator: IChessBoardValidator

  constructor(chessTransformerService: IChessFigureTransformer) {
    super();
    /// makeAutoObservable can't be used in stores that use inheritance
    makeObservable(this, {
      chessBoardState: observable,
      currentCellCoord: observable,
      setChessBoardState: action,
      initializeBoard: action,
    });

    this._chessTransformerService = chessTransformerService;

    this.initializeBoard();
  }

  public setChessBoardState(boardState: BoardWithChessFigureState) {
    this.chessBoardState = boardState;
  }

  public initializeBoard() {
    const chessBoard =
      this._chessTransformerService.trasformeStringsToChessBoardState(
        initialChessBoardState,
      );
    this.setChessBoardState(chessBoard);
  }
}
