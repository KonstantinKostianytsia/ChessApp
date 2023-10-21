import {BaseError} from './BaseError';

export enum ChessEngineErrorType {
  ChessEngineServiceNotFound = 'ChessEngineServiceNotFound',
  FindBestMoveParamsNotFound = 'FindBestMoveParamsNotFound',
  LastBestMoveNotFound = 'LastBestMoveNotFound',
}

export class ChessEngineError extends BaseError {
  constructor(type: ChessEngineErrorType, message?: string) {
    super(type, message);
  }
}
