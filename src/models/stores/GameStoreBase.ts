import {BoardCellCoord} from 'models/boardModels/Board';

export interface HistoryType {
  startPoint: BoardCellCoord;
  endPoint: BoardCellCoord;
}

export enum GameOverReason {
  CheckMate = 'CheckMate',
  StealMate = 'StealMate',
  Draw = 'Draw',
  InsufficientMaterial = 'InsufficientMaterial',
  ThreefoldRepetition = 'ThreefoldRepetition',
}

export class GameStoreBase {
  private _startDateTime: Date | undefined;
  private _endDateTime: Date | undefined;
  private _historyOfMoves: Array<HistoryType> = [];

  constructor() {}

  get gameTime(): number {
    if (this._startDateTime) {
      if (this._endDateTime) {
        return this._endDateTime.getTime() - this._startDateTime.getTime();
      } else {
        return new Date().getTime() - this._startDateTime.getTime();
      }
    } else {
      return -1;
    }
  }

  get lastMove(): HistoryType | undefined {
    if (this._historyOfMoves.length > 0) {
      return this._historyOfMoves[this._historyOfMoves.length - 1];
    }
  }

  public start() {
    this._startDateTime = new Date();
  }

  public finish() {
    this._endDateTime = new Date();
  }

  public makeMove(startPoint: BoardCellCoord, endPoint: BoardCellCoord) {
    this._historyOfMoves.push({startPoint, endPoint});
  }
}
