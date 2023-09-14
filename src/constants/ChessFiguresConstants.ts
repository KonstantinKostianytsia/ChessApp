import {
  ChessFigureColor,
  ChessFigureType,
} from 'models/boardModels/ChessFigure';
import {IChessFigureRange} from 'models/constants/ChessFigureConstants';

const BLACK_CHESS_FIGURES: Array<IChessFigureRange> = [
  {
    minValue: 15,
    maxValue: 17,
    figureType: ChessFigureType.Pawn,
    figureColor: ChessFigureColor.Black,
  },
  {
    minValue: 18,
    maxValue: 20,
    figureType: ChessFigureType.Rook,
    figureColor: ChessFigureColor.Black,
  },
  {
    minValue: 21,
    maxValue: 23,
    figureType: ChessFigureType.Knight,
    figureColor: ChessFigureColor.Black,
  },
  {
    minValue: 24,
    maxValue: 26,
    figureType: ChessFigureType.Bishop,
    figureColor: ChessFigureColor.Black,
  },
  {
    minValue: 27,
    maxValue: 29,
    figureType: ChessFigureType.Queen,
    figureColor: ChessFigureColor.Black,
  },
  {
    minValue: 30,
    maxValue: 32,
    figureType: ChessFigureType.King,
    figureColor: ChessFigureColor.Black,
  },
];

const EMPTY_CELL_RANGE: Array<IChessFigureRange> = [
  {
    minValue: 33,
    maxValue: 38,
  },
];

const WHITE_CHESS_FIGURES: Array<IChessFigureRange> = [
  {
    minValue: 39,
    maxValue: 42,
    figureType: ChessFigureType.Pawn,
    figureColor: ChessFigureColor.White,
  },
  {
    minValue: 43,
    maxValue: 46,
    figureType: ChessFigureType.Rook,
    figureColor: ChessFigureColor.White,
  },
  {
    minValue: 47,
    maxValue: 50,
    figureType: ChessFigureType.Knight,
    figureColor: ChessFigureColor.White,
  },
  {
    minValue: 51,
    maxValue: 54,
    figureType: ChessFigureType.Bishop,
    figureColor: ChessFigureColor.White,
  },
  {
    minValue: 55,
    maxValue: 58,
    figureType: ChessFigureType.Queen,
    figureColor: ChessFigureColor.White,
  },
  {
    minValue: 59,
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
