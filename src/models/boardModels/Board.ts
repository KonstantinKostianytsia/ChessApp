import {Column} from './Column';
import {Figure} from './Figure';
import {Row} from './Row';

export enum CellColor {
  Black = 'Black',
  White = 'White',
}

export interface BoardCellCoord {
  row: Row;
  column: Column;
}

export interface CellStateType {
  cellRGBColor?: string;
  cellFigure?: Figure;
  cellValue?: number;
}

export interface UpdateCellState {
  cellState: CellStateType;
  cellCoords: BoardCellCoord;
}

export type CellDataType = BoardCellCoord & CellStateType;

export type BoardState = Array<Array<CellStateType | undefined>>;
