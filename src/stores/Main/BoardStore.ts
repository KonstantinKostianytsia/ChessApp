import {makeAutoObservable} from 'mobx';

import {DEFAULT_BOARD_SIZE} from 'constants/BoardConstants';
import {BoardCellCoord, BoardState} from 'models/boardModels/Board';
import {
  converColumnToColummnIndex,
  converRowToRowIndex,
} from 'helpers/boardHelpers';

const BOARD_ALREADY_EMPTY = 'BOARD_ALREADY_EMPTY';
const BOARD_IS_NOT_INITIALIZED = 'BOARD_IS_NOT_INITIALIZED';

export class BoardStore {
  boardState: BoardState = [];
  currentCellCoord: BoardCellCoord | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
    this.initializeBoard();
  }

  private setBoardState = (value: BoardState) => {
    this.boardState = value;
  };

  public setCurrentCellCoord = (value: BoardCellCoord) => {
    this.currentCellCoord = value;
  };

  public emptyBoard = () => {
    if (this.boardState.length === 0) {
      throw Error(BOARD_ALREADY_EMPTY);
    }
    const boardCopy: BoardState = [];
    for (let row = 0; row < this.boardState.length; row++) {
      boardCopy.push([]);
      for (let column = 0; column < this.boardState[row].length; column++) {
        boardCopy[row].push(undefined);
      }
    }
    this.setBoardState(boardCopy);
  };

  public initializeBoard = () => {
    const boardCopy: BoardState = [];
    for (let row = 0; row < DEFAULT_BOARD_SIZE; ++row) {
      boardCopy.push([]);
      for (let column = 0; column < DEFAULT_BOARD_SIZE; ++column) {
        boardCopy[row].push(undefined);
      }
    }
    this.setBoardState(boardCopy);

    this.emptyBoard();
  };

  public updateCellColor = (color: string, cellCoord: BoardCellCoord) => {
    if (!this.boardState) {
      throw Error(BOARD_IS_NOT_INITIALIZED);
    }
    const rowIndex = converRowToRowIndex(cellCoord.row);
    const columnIndex = converColumnToColummnIndex(cellCoord.column);

    const rowCopy = [...this.boardState[rowIndex]];
    rowCopy[columnIndex] = {cellRGBColor: color};

    this.boardState[rowIndex] = rowCopy;
  };
}
