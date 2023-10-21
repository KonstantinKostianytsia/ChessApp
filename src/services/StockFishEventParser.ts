import {convertStandartMoveAnotationToIMove} from 'helpers/mappers/ChessBoardMappers';
import {IMove} from 'models/common/IMove';
import {IChessServiceEventParser} from 'models/services/IChessServiceEventParser';

export class StockFishEventParser implements IChessServiceEventParser {
  getBestMove(line: string): IMove | null {
    if (line.startsWith('bestmove')) {
      const moveString = line.split(' ')[1];
      return convertStandartMoveAnotationToIMove(moveString);
    }
    return null;
  }
}
