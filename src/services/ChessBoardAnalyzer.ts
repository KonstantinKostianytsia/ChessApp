import {Chess} from 'chess.js';
import {DEFAULT_BOARD_SIZE} from 'constants/BoardConstants';
import {VALIDATION_ERROR} from 'constants/ErrorConstants';
import {
  convertColumnIndexToColumn,
  convertRowIndexToRow,
} from 'helpers/boardHelpers';
import {converUpdateCellStateTypeToBoardState} from 'helpers/mappers/BoardStateMappers';
import {convertIBoardCellCoordsToStandartAnotation} from 'helpers/mappers/ChessBoardMappers';
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
import {IChessFigureTransformerToFEN} from 'models/services/IChessFigureTransformer';

const UNHANDLED_CASTLING = 'UNHANDLED_CASTLING';

export class ChessBoardAnalyzer
  implements IChessBoardAnalyzer, IChessFigureTransformerToFEN
{
  averageCellsValues: AverageCellsValues = [];

  private _chessGame: Chess = new Chess();

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
  ): Array<IChessMove> | null {
    const comparator: ComparatorType = (
      prevStateCell: CellWithChessFigureStateType | undefined,
      newStateCell: CellWithChessFigureStateType | undefined,
    ) => {
      if (prevStateCell?.cellChessFigure !== undefined) {
        return prevStateCell.cellChessFigure.equals(
          newStateCell?.cellChessFigure,
        );
      } else {
        return prevStateCell?.cellChessFigure === newStateCell?.cellChessFigure;
      }
    };

    if (!this.isStateChanged(prevState, newState, comparator)) {
      return null;
    }
    let startPos: Array<BoardCellCoord> = [];
    let finishPos: Array<BoardCellCoord> = [];
    let figure: Array<ChessFigure> = [];
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
            if (
              prevCellState?.cellChessFigure === undefined &&
              newCellState?.cellChessFigure !== undefined
            ) {
              finishPos?.push({
                row: convertRowIndexToRow(row),
                column: convertColumnIndexToColumn(column),
              });
              /// We don't know what figure moved because newState contains Unknown figures
              continue;
            }

            /// prevStateCell === undefined
            /// so figure disappeared in newStateCell it is start point
            if (
              newCellState?.cellChessFigure === undefined &&
              prevCellState?.cellChessFigure !== undefined
            ) {
              startPos.push({
                row: convertRowIndexToRow(row),
                column: convertColumnIndexToColumn(column),
              });
              figure.push(prevCellState.cellChessFigure);
              continue;
            }
          }
          /// Figure hit another figure
          /// so it is finish point
          else {
            finishPos.push({
              row: convertRowIndexToRow(row),
              column: convertColumnIndexToColumn(column),
            });
            /// We don't know what figure moved because newState contains Unknown figures
            continue;
          }
        }
      }
    }

    console.log(startPos);
    console.log(finishPos);
    console.log(figure);
    if (amountOfStateChanges % 2 !== 0) {
      /// a correct movement contains even amount of changes
      throw Error(VALIDATION_ERROR);
    }

    const foundStartPos = startPos.length;
    const foundFinishPos = finishPos.length;
    const foundFigure = figure.length;

    /// No movements were found
    if (foundFinishPos === 0 && foundFigure === 0 && foundStartPos === 0) {
      return null;
    }

    if (foundFigure === 1 && foundStartPos === 1 && foundFinishPos === 1) {
      return [
        {
          finishPos: finishPos[0],
          startPos: startPos[0],
          chessFigure: figure[0],
        },
      ];
    }

    if (foundFigure === 2 && foundFinishPos === 2 && foundStartPos === 2) {
      throw Error(UNHANDLED_CASTLING);
    }

    return null;
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

  getFEN(): string {
    return this._chessGame.fen();
  }

  makeMove(chessMove: IChessMove): boolean {
    try {
      const move = this._chessGame.move({
        from: convertIBoardCellCoordsToStandartAnotation(chessMove.startPos),
        to: convertIBoardCellCoordsToStandartAnotation(chessMove.finishPos),
      });
      console.log(move);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  displayBoardState(): void {
    console.log(this._chessGame.ascii());
  }
}
