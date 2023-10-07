import {emptyChessBoardState} from 'boardStates/ChessBoardStates/initialChessBoardState';
import {transformUpdateCellStateToChessBoardState} from 'helpers/ChessFiguresHelpers';
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
  isBoardCalibrating: boolean = true;

  private _chessTransformerService: IChessFigureTransformer;
  private _chessBoardValidator: IChessBoardValidator;
  public chessBoardAnalyzer: IChessBoardAnalyzer;

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
      isBoardCalibrating: observable,
      setChessBoardState: action,
      initializeBoard: action,
      startCalibration: action,
      stopCalibration: action,
    });

    this._chessTransformerService = chessTransformerService;
    this._chessBoardValidator = chessBoardValidator;
    this.chessBoardAnalyzer = chessBoardAnalyzer;

    this.initializeBoard();
  }

  public startCalibration = () => {
    this.isBoardCalibrating = true;
  };

  public stopCalibration = () => {
    this.isBoardCalibrating = false;
  };

  public collectAverageData = (newState: UpdateCellState[]) => {
    this.chessBoardAnalyzer.collectDataForAverageDataTable(newState);
  };

  public setChessBoardState(boardState: BoardWithChessFigureState) {
    const isStateChanged = this._chessBoardValidator.setNewState(
      this.chessBoardState,
      boardState,
    );
    if (isStateChanged) {
      if (this._chessBoardValidator.validate()) {
        this.chessBoardState = boardState;
      }
    }
  }

  public onNewBoardStateMessage(updateCellsState: UpdateCellState[]) {
    if (this.isBoardCalibrating) {
      this.collectAverageData(updateCellsState);
      return;
    } else {
      const newChessBoardState = transformUpdateCellStateToChessBoardState(
        updateCellsState,
        this.chessBoardAnalyzer.averageCellsValues,
      );
      this.setChessBoardState(newChessBoardState);
    }
  }

  public initializeBoard() {
    const chessBoard =
      this._chessTransformerService.trasformeStringsToChessBoardState(
        emptyChessBoardState,
      );
    this.chessBoardState = chessBoard;
  }
}
