import {
  ChessEngineError,
  ChessEngineErrorType,
} from 'models/errors/ChessEngineError';
import {
  IChessServiceCommandFormatter,
  IFindBestWayParams,
} from 'models/services/IChessServiceCommandFormatter';

export class StockfishCommandFormatter
  implements IChessServiceCommandFormatter
{
  commandToFindBestWay(params: IFindBestWayParams): string {
    if (params.depth) {
      return `go depth ${params.depth}\n`;
    } else if (params?.thinkingTime) {
      return `go movetime ${params.thinkingTime}\n`;
    } else {
      throw new ChessEngineError(
        ChessEngineErrorType.FindBestMoveParamsNotFound,
      );
    }
  }

  commandToSetCurrentPosition(currentPositionFen: string): string {
    return `position fen ${currentPositionFen}\n`;
  }
}
