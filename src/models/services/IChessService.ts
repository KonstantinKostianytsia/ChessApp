import {EmitterSubscription} from 'react-native';

export type ChessServiceEventCallback = (line: string) => void;

export interface IChessService {
  startEngine: (
    callback: ChessServiceEventCallback,
  ) => Promise<EmitterSubscription>;
  sendCommand: (command: string) => Promise<void>;
  shutdownEngine: () => Promise<void>;
}
