import {IDeviceInfo} from 'models/common/IDeviceInfo';
import {
  BluetoothError,
  BluetoothErrorType,
} from 'models/services/BluetoothErrors';
import {IBluetoothDeviceResponse} from 'models/services/IBluetoothService';
import {BleError, BleErrorCode} from 'react-native-ble-plx';

/// TODO: Remove it
export const mapBluetoothDeviceResponse = (
  bluetoothDevice: IBluetoothDeviceResponse,
) => {
  const device: IDeviceInfo = {
    name: bluetoothDevice.name,
    udid: bluetoothDevice.id,
  };

  return device;
};

export const mapBleErrorPlxToBluetoothError = (
  bleError: BleError,
): BluetoothError => {
  switch (bleError.errorCode) {
    case BleErrorCode.UnknownError:
    default:
      return new BluetoothError(
        BluetoothErrorType.UnknownError,
        bleError.message,
      );
  }
};
