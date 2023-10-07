import {ChessFigureType} from 'models/boardModels/ChessFigure';
import {IRange} from 'models/helpers/utils/IRange';

export interface IChessFigureRange extends IRange {
  figureType?: ChessFigureType;
}
