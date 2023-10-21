import {
  mainLoop,
  shutdownStockfish,
  sendCommand,
} from 'react-native-stockfish-android';
import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native'; // in order to read Stockfish output.
import {
  ChessServiceEventCallback,
  IChessService,
} from 'models/services/IChessService';

export class StockFishService implements IChessService {
  async startEngine(
    callback: ChessServiceEventCallback,
  ): Promise<EmitterSubscription> {
    const eventEmitter = new NativeEventEmitter(
      NativeModules.ReactNativeStockfishChessEngine,
    );
    // Also you need to listen to the event 'stockfish-output' in order to get output lines from Stockfish.
    const eventListener = eventEmitter.addListener(
      'stockfish-output',
      callback,
    );
    await mainLoop();
    return eventListener;
  }

  async sendCommand(command: string): Promise<void> {
    await sendCommand(command);
  }

  async shutdownEngine(): Promise<void> {
    await shutdownStockfish();
  }
}
