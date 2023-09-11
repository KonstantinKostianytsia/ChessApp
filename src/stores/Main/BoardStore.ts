import {makeAutoObservable} from 'mobx';

import {DEFAULT_BOARD_SIZE} from 'constants/BoardConstants';
import {
  BoardCellCoord,
  BoardState,
  UpdateCellState,
} from 'models/boardModels/Board';
import {
  converColumnToColummnIndex,
  converRowToRowIndex,
} from 'helpers/boardHelpers';
import {IBoardValidator} from 'helpers/validator/BoardValidator';
import {VALIDATION_ERROR} from 'constants/ErrorConstants';

const BOARD_ALREADY_EMPTY = 'BOARD_ALREADY_EMPTY';
const BOARD_IS_NOT_INITIALIZED = 'BOARD_IS_NOT_INITIALIZED';

export class BoardStore {
  boardState: BoardState = [];
  currentCellCoord: BoardCellCoord | undefined = undefined;
  private _boardValidator: IBoardValidator;

  constructor(boardValidator: IBoardValidator) {
    makeAutoObservable(this);
    this.initializeBoard();
    this._boardValidator = boardValidator;
  }

  private setBoardState = (value: BoardState) => {
    this.boardState = value;
  };

  private getBoardDeepCopy = () => {
    const boardStateCopy = [];
    for (let i = 0; i < this.boardState.length; ++i) {
      const rowCopy = [...this.boardState[i]];
      boardStateCopy.push(rowCopy);
    }
    return boardStateCopy;
  };

  public setCurrentCellCoord = (value: BoardCellCoord) => {
    const rowIndex = converRowToRowIndex(value.row);
    const columnIndex = converColumnToColummnIndex(value.column);
    this._boardValidator.setCoords(rowIndex, columnIndex);
    if (this._boardValidator.validate()) {
      this.currentCellCoord = value;
    } else {
      throw new Error(VALIDATION_ERROR);
    }
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

  public updateCellsState = (cellsData: Array<UpdateCellState>) => {
    if (!this.boardState) {
      throw Error(BOARD_IS_NOT_INITIALIZED);
    }
    const boardStateCopy = this.getBoardDeepCopy();

    for (const cellState of cellsData) {
      const rowIndex = converRowToRowIndex(cellState.cellCoords.row);
      const columnIndex = converColumnToColummnIndex(
        cellState.cellCoords.column,
      );

      if (boardStateCopy[rowIndex][columnIndex]) {
        boardStateCopy[rowIndex][columnIndex] = {
          ...boardStateCopy[rowIndex][columnIndex],
          ...cellState.cellState,
        };
      } else {
        boardStateCopy[rowIndex][columnIndex] = cellState.cellState;
      }
    }

    this.setBoardState(boardStateCopy);
  };
}
