import {BoardCellCoord} from 'models/boardModels/Board';
import {BaseError} from './BaseError';

export enum ChessFigureErrorType {}

export class ChessFigureError extends BaseError {
  cellCoords: BoardCellCoord;
  constructor(
    cellCoords: BoardCellCoord,
    type: ChessFigureErrorType,
    message?: string,
  ) {
    super(type, message);
    this.cellCoords = cellCoords;
  }
}
