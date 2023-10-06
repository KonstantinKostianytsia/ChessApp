import {BoardCellCoord} from 'models/boardModels/Board';

export interface IMove {
  startPos: BoardCellCoord;
  finishPos: BoardCellCoord;
}
