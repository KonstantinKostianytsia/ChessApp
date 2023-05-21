import {IDeviceInfo} from 'models/common/IDeviceInfo';
import {IBluetoothDeviceResponse} from 'models/services/IBluetoothService';

export const mapBluetoothDeviceResponse = (
  bluetoothDevice: IBluetoothDeviceResponse,
) => {
  const device: IDeviceInfo = {
    name: bluetoothDevice.name,
    udid: bluetoothDevice.id,
  };

  return device;
};
