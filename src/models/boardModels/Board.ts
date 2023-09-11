import {Column} from './Column';
import {ChessFigure} from './ChessFigure';
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
  cellValue?: number;
}

/// A cell with chess figure
/// TODO Consider removing cellValue
export interface CellWithChessFigureStateType extends CellStateType {
  cellChessFigure?: ChessFigure;
}

export interface UpdateCellState {
  cellState: CellStateType;
  cellCoords: BoardCellCoord;
}

export type CellDataType = BoardCellCoord & CellStateType;

export type BoardState = Array<Array<CellStateType | undefined>>;
export type BoardWithChessFigureState = Array<
  Array<CellWithChessFigureStateType | undefined>
>;
