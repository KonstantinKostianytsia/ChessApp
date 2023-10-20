import {BaseError} from 'models/errors/BaseError';

export enum BluetoothErrorType {
  UnknownError,
}

export class BluetoothError extends BaseError {
  constructor(type: BluetoothErrorType, message?: string) {
    super(type, message);
  }
}
