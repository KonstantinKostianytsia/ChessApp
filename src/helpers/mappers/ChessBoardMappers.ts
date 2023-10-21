import {COLUMNS_CAPTIONS, ROW_CAPTIONS} from 'constants/BoardConstants';
import {BoardCellCoord} from 'models/boardModels/Board';
import {Column} from 'models/boardModels/Column';
import {Row} from 'models/boardModels/Row';
import {BaseErrorType} from 'models/common/ErrorType';
import {IMove} from 'models/common/IMove';
import {BaseError} from 'models/errors/BaseError';

export const convertIBoardCellCoordsToStandartAnotation = (
  boardCellCoord: BoardCellCoord,
): string => {
  return boardCellCoord.column.toLowerCase() + boardCellCoord.row;
};

/// converts standart cell anotation to BoardCellCoord
/// example: e2 -> {row: 2, column: E}
export const convertStandartAnotationToBoardCellCoord = (
  cell: string,
): BoardCellCoord => {
  if (cell.length !== 2) {
    throw new BaseError(
      BaseErrorType.VALIDATION_ERROR,
      'Cell string is incorrect',
    );
  }
  const column = cell[0].toUpperCase();
  const row = Number(cell[1]);
  if (!COLUMNS_CAPTIONS.includes(column)) {
    throw new BaseError(
      BaseErrorType.VALIDATION_ERROR,
      'Such column is not found',
    );
  }
  if (!ROW_CAPTIONS.includes(row)) {
    throw new BaseError(
      BaseErrorType.VALIDATION_ERROR,
      'Such row is not found',
    );
  }
  return {
    row: row as Row,
    column: column as Column,
  };
};

/// converts standart move anotation to IMove
/// example: e2e4 -> {startPos: {row: 2, column: 'E'}, finishPos: {row: 4, column: 'E'}}
export const convertStandartMoveAnotationToIMove = (move: string): IMove => {
  const moveString = move.trim();
  if (moveString.length !== 4) {
    throw new BaseError(
      BaseErrorType.VALIDATION_ERROR,
      'Move string is incorrect',
    );
  }
  const startPosString = moveString.slice(0, 2);
  const finishPosString = moveString.slice(2);
  const startPos = convertStandartAnotationToBoardCellCoord(startPosString);
  const finishPos = convertStandartAnotationToBoardCellCoord(finishPosString);
  return {
    startPos,
    finishPos,
  };
};
