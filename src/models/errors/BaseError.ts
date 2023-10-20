import {BaseErrorType} from 'models/common/ErrorType';
import {ChessFigureErrorType} from './ChessFigureError';
import {BluetoothErrorType} from 'models/services/BluetoothErrors';
import {ChessMoveErrorType} from './ChessMoveError';

export type CombinedErrorType =
  | BaseErrorType
  | ChessFigureErrorType
  | BluetoothErrorType
  | ChessMoveErrorType;
export class BaseError extends Error {
  type: CombinedErrorType;

  constructor(type: CombinedErrorType, message?: string) {
    super(message);
    this.type = type;
  }
}
