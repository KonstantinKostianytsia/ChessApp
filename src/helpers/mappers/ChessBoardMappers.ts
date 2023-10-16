import {BoardCellCoord} from 'models/boardModels/Board';

export const convertIBoardCellCoordsToStandartAnotation = (
  boardCellCoord: BoardCellCoord,
): string => {
  return boardCellCoord.column.toLowerCase() + boardCellCoord.row;
};
