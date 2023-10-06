import {
  ChessFigureColor,
  ChessFigureType,
} from 'models/boardModels/ChessFigure';
import {IChessFigureRange} from 'models/constants/ChessFigureConstants';

const BLACK_CHESS_FIGURES: Array<IChessFigureRange> = [
  {
    minValue: 24,
    maxValue: 27,
    figureType: ChessFigureType.Pawn,
    figureColor: ChessFigureColor.Black,
  },
  {
    minValue: 21,
    maxValue: 23,
    figureType: ChessFigureType.Rook,
    figureColor: ChessFigureColor.Black,
  },
  {
    minValue: 17,
    maxValue: 20,
    figureType: ChessFigureType.Knight,
    figureColor: ChessFigureColor.Black,
  },
  {
    minValue: 14,
    maxValue: 16,
    figureType: ChessFigureType.Bishop,
    figureColor: ChessFigureColor.Black,
  },
  {
    minValue: 10,
    maxValue: 13,
    figureType: ChessFigureType.Queen,
    figureColor: ChessFigureColor.Black,
  },
  {
    minValue: 0,
    maxValue: 9,
    figureType: ChessFigureType.King,
    figureColor: ChessFigureColor.Black,
  },
];

const EMPTY_CELL_RANGE: Array<IChessFigureRange> = [
  {
    minValue: 28,
    maxValue: 32,
  },
];

const WHITE_CHESS_FIGURES: Array<IChessFigureRange> = [
  {
    minValue: 33,
    maxValue: 36,
    figureType: ChessFigureType.Pawn,
    figureColor: ChessFigureColor.White,
  },
  {
    minValue: 37,
    maxValue: 39,
    figureType: ChessFigureType.Rook,
    figureColor: ChessFigureColor.White,
  },
  {
    minValue: 40,
    maxValue: 43,
    figureType: ChessFigureType.Knight,
    figureColor: ChessFigureColor.White,
  },
  {
    minValue: 44,
    maxValue: 46,
    figureType: ChessFigureType.Bishop,
    figureColor: ChessFigureColor.White,
  },
  {
    minValue: 47,
    maxValue: 50,
    figureType: ChessFigureType.Queen,
    figureColor: ChessFigureColor.White,
  },
  {
    minValue: 51,
    maxValue: 63,
    figureType: ChessFigureType.King,
    figureColor: ChessFigureColor.White,
  },
];

export const CHESS_FIGURE_VALUES_RANGES: Array<IChessFigureRange> = [
  ...BLACK_CHESS_FIGURES,
  ...EMPTY_CELL_RANGE,
  ...WHITE_CHESS_FIGURES,
];
