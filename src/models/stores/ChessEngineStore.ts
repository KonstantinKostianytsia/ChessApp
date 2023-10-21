import {IMove} from 'models/common/IMove';

export enum ChessEngineDifficulty {
  Easy = 'Easy',
  PreNormal = 'PreNormal',
  Normal = 'Normal',
  Hard = 'Hard',
  Grandmaster = 'Grandmaster',
}

export enum ChessEngine {
  Stockfish = 'Stockfish',
}

export type ChessEngineIMoveCallback = (move: IMove) => void;
