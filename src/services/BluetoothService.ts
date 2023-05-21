import RNBleManager from 'react-native-ble-manager';
import {
  Platform,
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';

import {
  IBluetoothDeviceResponse,
  IBluetoothService,
} from 'models/services/IBluetoothService';
import {requestLocationPermissions} from 'helpers /permissionsHelpers';
import {IDeviceInfo} from 'models/common/IDeviceInfo';
import {SCANNING_TIME} from 'constants/BluetoothConstants';
import {mapBluetoothDeviceResponse} from 'mappers/BluetoothMappers';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export class BluetoothService implements IBluetoothService {
  private isScaning: boolean = false;

  init = async () => {
    try {
      /// For Android version 31+ location permissions are not needed and it fails silently
      if (Platform.OS === 'android' && Platform.Version <= 30) {
        await requestLocationPermissions();
      }
    } catch (err) {
      console.log(err);
    }
    return await RNBleManager.start({showAlert: true});
  };

  scan = async (): Promise<void> => {
    if (!this.isScaning) {
      try {
        await RNBleManager.scan([], SCANNING_TIME);
        this.isScaning = false;
        return;
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('denied: is already scanning');
    }
  };

  connect = async (id: string): Promise<void> => {
    return await RNBleManager.connect(id);
  };

  disconnect = async (id: string): Promise<void> => {
    return await RNBleManager.disconnect(id, false);
  };

  enableBluetooth = async (): Promise<any> => {
    try {
      const result = await RNBleManager.enableBluetooth();
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  getConnectedPeripherals = async () => {
    const result = await RNBleManager.getConnectedPeripherals();
    const formatterResults = result.map<IDeviceInfo>(item => ({
      udid: item.id,
      name: item.name || '',
    }));
    return formatterResults;
  };

  getDiscoveredPeripherals = async () => {
    const result = await RNBleManager.getDiscoveredPeripherals();
    const formatterResults = result.map<IDeviceInfo>(item => ({
      udid: item.id,
      name: item.name || '',
    }));
    return formatterResults;
  };

  setOnStopScanning = (callback: () => void): EmitterSubscription => {
    const storListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        this.isScaning = false;
        callback();
      },
    );
    return storListener;
  };

  setOnFindDevice = (callback: (device: IDeviceInfo) => void) => {
    const storListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      (arg: IBluetoothDeviceResponse) => {
        /// it may return not device
        if (arg.id) {
          callback(mapBluetoothDeviceResponse(arg));
        }
      },
    );
    return storListener;
  };
}
