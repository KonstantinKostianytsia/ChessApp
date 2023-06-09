import RNBleManager from 'react-native-ble-manager';
import {
  Platform,
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';
import {BleManager} from 'react-native-ble-plx';

import {
  IBluetoothDeviceResponse,
  IBluetoothService,
} from 'models/services/IBluetoothService';
import {
  requestBluetoothConnect,
  requestLocationPermissions,
  requestScanBluetoothDevices,
} from 'helpers/permissionsHelpers';
import {IDeviceInfo} from 'models/common/IDeviceInfo';
import {SCANNING_TIME} from 'constants/BluetoothConstants';
import {mapBluetoothDeviceResponse} from 'mappers/BluetoothMappers';
import {mapPeripheralToIDeviceInfo} from 'helpers/mappers/RNBleManagerMapper';
import BufferService from './BufferService';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export class BluetoothService implements IBluetoothService {
  private isScaning: boolean = false;
  private manager;

  constructor() {
    this.manager = new BleManager();
  }
  init = async () => {
    try {
      /// For Android version 31+ location permissions are not needed and it fails silently
      if (Platform.OS === 'android' && Platform.Version <= 30) {
        await requestLocationPermissions();
      }
      if (Platform.OS === 'android') {
        await requestScanBluetoothDevices();
        await requestBluetoothConnect();
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
    const services = await this.manager.connectToDevice(id, {
      autoConnect: true,
    });
    console.log('DEVICE Service', services);
    await this.manager.discoverAllServicesAndCharacteristicsForDevice(id);
  };

  disconnect = async (id: string): Promise<void> => {
    await this.manager.cancelDeviceConnection(id);
    return;
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
    const formatterResults = result.map<IDeviceInfo>(
      mapPeripheralToIDeviceInfo,
    );
    return formatterResults;
  };

  getDiscoveredPeripherals = async () => {
    let result = await RNBleManager.getDiscoveredPeripherals();
    result = result.filter(value => value.advertising.isConnectable);
    const formatterResults = result.map<IDeviceInfo>(
      mapPeripheralToIDeviceInfo,
    );
    return formatterResults;
  };

  writeMessage = async (
    peripheralId: string,
    serviceUUID: string,
    characteristicUUID: string,
    message: string,
  ) => {
    const formatterData = BufferService.convertStringToBase64(message);
    const result = await this.manager.writeCharacteristicWithResponseForDevice(
      peripheralId,
      serviceUUID,
      characteristicUUID,
      formatterData,
    );
    console.log(result);
    return;
  };

  // readMessage = async (
  //   peripheralId: string,
  //   serviceUUID: string,
  //   characteristicUUID: string,
  // ): Promise<string> => {
  // };

  // startNotification = async (
  //   peripheralId: string,
  //   serviceUUID: string,
  //   characteristicUUID: string,
  //   callback: BluetoothNotificationCallback,
  // ) => {
  // };

  isConnected = async (deviceId: string): Promise<boolean> => {
    return await RNBleManager.isPeripheralConnected(deviceId);
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
      'BleManagerDiscoverPeripheral',
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
