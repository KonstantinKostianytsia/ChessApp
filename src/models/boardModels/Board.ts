import {Column} from './Column';
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
}

export type CellDataType = BoardCellCoord & CellStateType;

export type BoardState = Array<Array<CellStateType | undefined>>;
