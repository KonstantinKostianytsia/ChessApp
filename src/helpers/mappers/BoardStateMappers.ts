import {DEFAULT_BOARD_SIZE} from 'constants/BoardConstants';
import {
  converColumnToColummnIndex,
  converRowToRowIndex,
} from 'helpers/boardHelpers';
import {BoardState, UpdateCellState} from 'models/boardModels/Board';

export const converUpdateCellStateTypeToBoardState = (
  updateState: UpdateCellState[],
): BoardState => {
  const boardState: BoardState = [];

  /// Initialize BoardState value
  for (let row = 0; row < DEFAULT_BOARD_SIZE; ++row) {
    boardState.push([]);
    for (let column = 0; column < DEFAULT_BOARD_SIZE; ++column) {
      boardState[row].push(undefined);
    }
  }

  for (const updateCellState of updateState) {
    const rowIndex = converRowToRowIndex(updateCellState.cellCoords.row);
    const columnIndex = converColumnToColummnIndex(
      updateCellState.cellCoords.column,
    );

    boardState[rowIndex][columnIndex] = updateCellState.cellState;
  }

  return boardState;
};
