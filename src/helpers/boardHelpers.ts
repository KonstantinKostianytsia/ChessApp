import {COLUMNS_CAPTIONS, ROW_CAPTIONS} from 'constants/BoardConstants';
import {CellColor} from 'models/boardModels/Board';
import {Column} from 'models/boardModels/Column';
import {Row} from 'models/boardModels/Row';

/// Receives indexes from 0-7
export const getCellColor = (
  rowIndex: number,
  columnIndex: number,
): CellColor => {
  if (rowIndex % 2 === 0) {
    return columnIndex % 2 === 0 ? CellColor.White : CellColor.Black;
  } else {
    return columnIndex % 2 === 1 ? CellColor.White : CellColor.Black;
  }
};

export const convertRowIndexToRow = (rowIndex: number): Row => {
  return ROW_CAPTIONS[ROW_CAPTIONS.length - rowIndex - 1] as Row;
};

export const convertColumnIndexToColumn = (columnIndex: number): Column => {
  return COLUMNS_CAPTIONS[columnIndex] as Column;
};

export const converRowToRowIndex = (row: Row): number => {
  return ROW_CAPTIONS.length - row;
};

export const converColumnToColummnIndex = (column: Column): number => {
  return COLUMNS_CAPTIONS.findIndex((value: string) => value === column);
};
