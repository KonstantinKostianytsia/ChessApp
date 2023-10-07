import {ChessFigureType} from 'models/boardModels/ChessFigure';
import {IChessFigureRange} from 'models/constants/ChessFigureConstants';

const FIGURE_DIVERGENCE: Array<IChessFigureRange> = [
  {
    minValue: 0,
    maxValue: 2.99,
  },
  {
    minValue: 3,
    maxValue: 6.99,
    figureType: ChessFigureType.Pawn,
  },
  {
    minValue: 7,
    maxValue: 10.99,
    figureType: ChessFigureType.Rook,
  },
  {
    minValue: 11,
    maxValue: 14.99,
    figureType: ChessFigureType.Knight,
  },
  {
    minValue: 15,
    maxValue: 18.99,
    figureType: ChessFigureType.Bishop,
  },
  {
    minValue: 19,
    maxValue: 22.99,
    figureType: ChessFigureType.Queen,
  },
  {
    minValue: 23,
    maxValue: 40, /// To handle min and max values of sensors
    figureType: ChessFigureType.King,
  },
];

export const CHESS_FIGURE_VALUES_RANGES: Array<IChessFigureRange> =
  FIGURE_DIVERGENCE;
