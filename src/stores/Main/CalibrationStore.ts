import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import {UpdateCellState} from 'models/boardModels/Board';
import {
  AverageCellsValues,
  IChessBoardAnalyzer,
} from 'models/services/IChessBoardAnalyzer';

export class CalibrationStore {
  isCalibrating = true;
  averageData: AverageCellsValues = [];

  private _chessBoardAnalyzer: IChessBoardAnalyzer;

  constructor(chessBoardAnalyzer: IChessBoardAnalyzer) {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'CalibrationStore',
      properties: ['averageData'],
      storage: AsyncStorage,
    });

    this._chessBoardAnalyzer = chessBoardAnalyzer;
  }

  public onNewBoardStateMessage(updateCellsState: UpdateCellState[]) {
    this._chessBoardAnalyzer.collectDataForAverageDataTable(updateCellsState);
  }

  stopCalibrating() {
    this.averageData = this._chessBoardAnalyzer.averageCellsValues;
    this.isCalibrating = false;
  }
}
