import {DEFAULT_BOARD_SIZE} from 'constants/BoardConstants';
import {VALIDATION_ERROR} from 'constants/ErrorConstants';
import {
  convertColumnIndexToColumn,
  convertRowIndexToRow,
} from 'helpers/boardHelpers';
import {converUpdateCellStateTypeToBoardState} from 'helpers/mappers/BoardStateMappers';
import {
  BoardCellCoord,
  BoardWithChessFigureState,
  CellWithChessFigureStateType,
  UpdateCellState,
} from 'models/boardModels/Board';
import {ChessFigure} from 'models/boardModels/ChessFigure';
import {
  AverageCellsValues,
  ChessBoardCounterResponse,
  ComparatorType,
  IChessBoardAnalyzer,
  IChessMove,
} from 'models/services/IChessBoardAnalyzer';

export class ChessBoardAnalyzer implements IChessBoardAnalyzer {
  averageCellsValues: AverageCellsValues = [];
  isStateChanged(
    prevState: BoardWithChessFigureState | undefined,
    newState: BoardWithChessFigureState | undefined,
    comparator?: ComparatorType,
  ): boolean {
    const defaultComparator: ComparatorType = (
      prevStateCell: CellWithChessFigureStateType | undefined,
      newStateCell: CellWithChessFigureStateType | undefined,
    ) => {
      if (prevStateCell?.cellChessFigure === undefined) {
        return newStateCell?.cellChessFigure === prevStateCell?.cellChessFigure;
      }
      return (
        prevStateCell.cellChessFigure.equals(newStateCell?.cellChessFigure) &&
        prevStateCell.cellRGBColor === newStateCell?.cellRGBColor
      );
    };

    const compareValues: ComparatorType = comparator || defaultComparator;
    if (
      !prevState ||
      !newState ||
      prevState.length === 0 ||
      newState.length === 0
    ) {
      return true;
    }
    for (let row = 0; row < DEFAULT_BOARD_SIZE; ++row) {
      for (let column = 0; column < DEFAULT_BOARD_SIZE; ++column) {
        const prevStateCell = prevState[row][column];
        const newStateCell = newState[row][column];
        const isPrevStateEqualNewState = compareValues(
          prevStateCell,
          newStateCell,
        );

        if (!isPrevStateEqualNewState) {
          return true;
        }
      }
    }
    return false;
  }

  /// Data should be validated before passing to this function
  findLastMove(
    prevState: BoardWithChessFigureState,
    newState: BoardWithChessFigureState,
  ): IChessMove | null {
    const comparator: ComparatorType = (
      prevStateCell: CellWithChessFigureStateType | undefined,
      newStateCell: CellWithChessFigureStateType | undefined,
    ) => {
      return Boolean(
        prevStateCell?.cellChessFigure?.equals(newStateCell?.cellChessFigure),
      );
    };

    if (!this.isStateChanged(prevState, newState, comparator)) {
      return null;
    }
    let startPos: BoardCellCoord | null = null;
    let finishPos: BoardCellCoord | null = null;
    let figure: ChessFigure | null = null;
    let amountOfStateChanges = 0;

    for (let row = 0; row < DEFAULT_BOARD_SIZE; row++) {
      for (let column = 0; column < DEFAULT_BOARD_SIZE; column++) {
        const prevCellState = prevState[row][column];
        const newCellState = newState[row][column];
        /// If new state chess figure is NOT equal prev state
        if (!comparator(prevCellState, newCellState)) {
          amountOfStateChanges += 1;
          /// figure moved to an empty cell
          if (
            prevCellState?.cellChessFigure === undefined ||
            newCellState?.cellChessFigure === undefined
          ) {
            /// A figure appeared in this cell because
            /// prevStateCell !== newStateCell
            /// prevStateCell === undefined
            /// so figure appeared in newStateCell it is finish point
            if (prevCellState?.cellChessFigure === undefined) {
              finishPos = {
                row: convertRowIndexToRow(row),
                column: convertColumnIndexToColumn(column),
              };
              figure = newCellState?.cellChessFigure as ChessFigure;
              continue;
            }

            /// prevStateCell === undefined
            /// so figure disappeared in newStateCell it is start point
            if (newCellState?.cellChessFigure === undefined) {
              startPos = {
                row: convertRowIndexToRow(row),
                column: convertColumnIndexToColumn(column),
              };
              figure = prevCellState.cellChessFigure;
              continue;
            }
          }
          /// Figure hit another figure
          /// so it is finish point
          else {
            finishPos = {
              row: convertRowIndexToRow(row),
              column: convertColumnIndexToColumn(column),
            };
            figure = newCellState.cellChessFigure;
            continue;
          }
        }
      }
    }

    if (amountOfStateChanges > 2) {
      throw Error(VALIDATION_ERROR);
    }

    if (startPos !== null && finishPos !== null && figure !== null) {
      return {
        startPos,
        finishPos,
        chessFigure: figure,
      };
    } else {
      return null;
    }
  }

  countAmountOfFigures(
    prevState: BoardWithChessFigureState,
    newState: BoardWithChessFigureState,
  ) {
    const prevStateAmount = new ChessBoardCounterResponse();
    const newStateAmount = new ChessBoardCounterResponse();

    for (let row = 0; row < DEFAULT_BOARD_SIZE; ++row) {
      for (let column = 0; column < DEFAULT_BOARD_SIZE; ++column) {
        const prevCellStateFigure = prevState[row][column]?.cellChessFigure;
        if (prevCellStateFigure) {
          prevStateAmount[prevCellStateFigure.color][
            prevCellStateFigure.figureType
          ]++;
        }
        const newCellStateFigure = newState[row][column]?.cellChessFigure;
        if (newCellStateFigure) {
          newStateAmount[newCellStateFigure.color][
            newCellStateFigure.figureType
          ]++;
        }
      }
    }

    return {
      prevStateAmount,
      newStateAmount,
    };
  }

  collectDataForAverageDataTable(updateState: UpdateCellState[]): void {
    const newState = converUpdateCellStateTypeToBoardState(updateState);
    /// Initialize average data table
    if (this.averageCellsValues.length === 0) {
      for (let i = 0; i < DEFAULT_BOARD_SIZE; ++i) {
        this.averageCellsValues.push([]);
        for (let j = 0; j < DEFAULT_BOARD_SIZE; ++j) {
          this.averageCellsValues[i].push(j);
        }
      }
      for (let row = 0; row < DEFAULT_BOARD_SIZE; row++) {
        for (let column = 0; column < DEFAULT_BOARD_SIZE; column++) {
          const newCellValue = newState[row][column]?.cellValue;
          if (newCellValue) {
            this.averageCellsValues[row][column] = newCellValue;
          }
        }
      }
    } else {
      for (let row = 0; row < DEFAULT_BOARD_SIZE; ++row) {
        for (let column = 0; column < DEFAULT_BOARD_SIZE; ++column) {
          const cellValue = newState[row][column]?.cellValue as number;
          const previousAverage = this.averageCellsValues[row][column];
          const averageValue = Number(
            ((cellValue + previousAverage) / 2).toFixed(2),
          );
          this.averageCellsValues[row][column] = averageValue;
        }
      }
    }
  }
}
