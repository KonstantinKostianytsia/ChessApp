import {
  BoardWithChessFigureState,
  CellWithChessFigureStateType,
  UpdateCellState,
} from 'models/boardModels/Board';
import {
  ChessFigure,
  ChessFigureColor,
  ChessFigureType,
} from 'models/boardModels/ChessFigure';
import {IMove} from 'models/common/IMove';

export interface IChessMove extends IMove {
  chessFigure: ChessFigure;
}

export type FigureAmount = {[key in ChessFigureType]: number};

export type ChessBoardCounterResponseType = {
  [key in ChessFigureColor]: FigureAmount;
};

export class ChessBoardCounterResponse
  implements ChessBoardCounterResponseType
{
  White: FigureAmount = {
    Bishop: 0,
    Queen: 0,
    King: 0,
    Knight: 0,
    Rook: 0,
    Pawn: 0,
  };

  Black: FigureAmount = {
    Bishop: 0,
    Queen: 0,
    King: 0,
    Knight: 0,
    Rook: 0,
    Pawn: 0,
  };
}

export type ComparatorType = (
  prevStateCell: CellWithChessFigureStateType | undefined,
  newStateCell: CellWithChessFigureStateType | undefined,
) => boolean;

export type AverageCellsValues = Array<Array<number>>;

export interface IChessBoardAnalyzer {
  averageCellsValues: AverageCellsValues;
  isStateChanged(
    prevState: BoardWithChessFigureState,
    newState: BoardWithChessFigureState,
    comparator?: ComparatorType,
  ): boolean;

  findLastMove(
    prevState: BoardWithChessFigureState,
    newState: BoardWithChessFigureState,
  ): Array<IChessMove> | null;

  countAmountOfFigures(
    prevState: BoardWithChessFigureState,
    newState: BoardWithChessFigureState,
  ): {
    prevStateAmount: ChessBoardCounterResponseType;
    newStateAmount: ChessBoardCounterResponseType;
  };

  collectDataForAverageDataTable(newState: UpdateCellState[]): void;
  makeMove(chessMove: IChessMove): boolean;
  displayBoardState(): void;
}
