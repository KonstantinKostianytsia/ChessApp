import {CustomError} from 'models/common/CustomError';

export enum BluetoothErrorType {
  UnknownError,
}

export class BluetoothError extends CustomError {
  errorType: BluetoothErrorType;
  constructor(errorType: BluetoothErrorType, message?: string) {
    super(message);
    this.errorType = errorType;
  }
}
