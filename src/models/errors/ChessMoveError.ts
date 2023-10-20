import {BaseError} from './BaseError';
import {IChessMove} from 'models/services/IChessBoardAnalyzer';

export enum ChessMoveErrorType {
  IlligalMove = 'IlligalMove',
}

export class ChessMoveError extends BaseError {
  wrongMove: IChessMove;

  constructor(
    wrongMove: IChessMove,
    type: ChessMoveErrorType,
    message?: string,
  ) {
    super(type, message);
    this.wrongMove = wrongMove;
  }
}
