import {makeAutoObservable} from 'mobx';
import {IMove} from 'models/common/IMove';
import {
  ChessEngineError,
  ChessEngineErrorType,
} from 'models/errors/ChessEngineError';
import {
  ChessServiceEventCallback,
  IChessService,
} from 'models/services/IChessService';
import {
  IChessServiceCommandFormatter,
  IFindBestWayParams,
} from 'models/services/IChessServiceCommandFormatter';
import {IChessServiceEventParser} from 'models/services/IChessServiceEventParser';
import {
  ChessEngine,
  ChessEngineDifficulty,
  ChessEngineIMoveCallback,
} from 'models/stores/ChessEngineStore';
import {EmitterSubscription} from 'react-native';
import {StockfishCommandFormatter} from 'services/StockfishCommandFormatter';
import {StockFishEventParser} from 'services/StockFishEventParser';
import {StockFishService} from 'services/ChessServices/StockFishService';

export class ChessEngineStore {
  isFindingBestWay: boolean = false;
  lastBestMove: IMove | null = null;
  currentDifficultyLevel: ChessEngineDifficulty = ChessEngineDifficulty.Easy;
  currentChessService: IChessService | null = null;

  private _currentChessEngineEventFormatter: null | IChessServiceEventParser =
    null;
  private _currentChessEngineCommandFormatter: null | IChessServiceCommandFormatter =
    null;

  constructor() {
    makeAutoObservable(this);
    this.setChessEngine(ChessEngine.Stockfish);
  }

  setDifficulty(difficulty: ChessEngineDifficulty) {
    this.currentDifficultyLevel = difficulty;
  }

  setChessEngine(chessEngine: ChessEngine) {
    switch (chessEngine) {
      case ChessEngine.Stockfish:
      default:
        this.currentChessService = new StockFishService();
        this._currentChessEngineCommandFormatter =
          new StockfishCommandFormatter();
        this._currentChessEngineEventFormatter = new StockFishEventParser();
        break;
    }
  }

  async setChessEngineListener(
    callback: ChessEngineIMoveCallback,
  ): Promise<EmitterSubscription> {
    if (this.currentChessService !== null) {
      return await this.currentChessService.startEngine(
        this.engineListenerDecorator(callback),
      );
    } else {
      throw new ChessEngineError(
        ChessEngineErrorType.ChessEngineServiceNotFound,
        'Chess engine is not selected',
      );
    }
  }

  async findBestMove(currentPositionFen: string) {
    if (this.currentChessService !== null) {
      this.setIsFindingBestMove(true);
      await this.currentChessService.sendCommand(
        this.generateCommandToSetCurrentPosition(currentPositionFen),
      );
      await this.currentChessService.sendCommand(
        this.generateCommandToFindBestMove(),
      );
    } else {
      throw new ChessEngineError(
        ChessEngineErrorType.ChessEngineServiceNotFound,
        'Engine is not selected',
      );
    }
  }

  async shutdownEngine() {
    if (this.currentChessService !== null) {
      this.currentChessService.shutdownEngine();
    } else {
      throw new ChessEngineError(
        ChessEngineErrorType.ChessEngineServiceNotFound,
      );
    }
  }

  private setLastBestMove(move: IMove) {
    this.lastBestMove = move;
  }

  private setIsFindingBestMove(value: boolean) {
    this.isFindingBestWay = value;
  }

  private engineListenerDecorator(
    callback: ChessEngineIMoveCallback,
  ): ChessServiceEventCallback {
    return (line: string) => {
      const bestMove = this.parseChessServiceEvent(line);
      if (bestMove) {
        this.setLastBestMove(bestMove);
        callback(bestMove);
        this.setIsFindingBestMove(false);
      }
    };
  }

  private parseChessServiceEvent(line: string): IMove | null {
    if (this._currentChessEngineEventFormatter !== null) {
      const bestMove = this._currentChessEngineEventFormatter.getBestMove(line);
      return bestMove;
    } else {
      throw new ChessEngineError(
        ChessEngineErrorType.ChessEngineServiceNotFound,
      );
    }
  }

  private generateCommandToSetCurrentPosition(
    currentPositionFen: string,
  ): string {
    if (this._currentChessEngineCommandFormatter !== null) {
      return this._currentChessEngineCommandFormatter.commandToSetCurrentPosition(
        currentPositionFen,
      );
    } else {
      throw new ChessEngineError(
        ChessEngineErrorType.ChessEngineServiceNotFound,
      );
    }
  }

  private generateCommandToFindBestMove(): string {
    if (this._currentChessEngineCommandFormatter !== null) {
      return this._currentChessEngineCommandFormatter.commandToFindBestWay(
        this.difficultyLevel,
      );
    } else {
      throw new ChessEngineError(
        ChessEngineErrorType.ChessEngineServiceNotFound,
      );
    }
  }

  private get difficultyLevel(): IFindBestWayParams {
    switch (this.currentDifficultyLevel) {
      case ChessEngineDifficulty.Easy:
        return {depth: 1};
      case ChessEngineDifficulty.PreNormal:
        return {depth: 2};
      case ChessEngineDifficulty.Normal:
        return {depth: 3};
      case ChessEngineDifficulty.Hard:
        return {depth: 4};
      case ChessEngineDifficulty.Grandmaster:
        return {depth: 5};
    }
  }
}
