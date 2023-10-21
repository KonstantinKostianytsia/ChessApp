import {IMove} from 'models/common/IMove';

export interface IChessServiceEventParser {
  getBestMove(line: string): IMove | null;
}
