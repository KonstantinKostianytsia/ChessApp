import {EmitterSubscription} from 'react-native';

import {IDeviceInfo} from 'models/common/IDeviceInfo';
import {BluetoothError} from './BluetoothErrors';

export interface IBluetoothService {
  writeMessage: (
    peripheralId: string,
    serviceUUID: string,
    characteristicUUID: string,
    message: string,
  ) => void;
  // readMessage: (
  //   peripheralId: string,
  //   serviceUUID: string,
  //   characteristicUUID: string,
  // ) => Promise<string>;
  // startNotification: (
  //   peripheralId: string,
  //   serviceUUID: string,
  //   characteristicUUID: string,
  //   callback: BluetoothNotificationCallback,
  // ) => {};
  init: () => Promise<any>;
  connect: (id: string) => Promise<void>;
  disconnect: (id: string) => Promise<void>;
  getConnectedPeripherals: () => Promise<IDeviceInfo[]>;
  getDiscoveredPeripherals: () => Promise<IDeviceInfo[]>;
  scan: () => Promise<any>;
  enableBluetooth: () => Promise<any>;
  isConnected: (deviceId: string) => Promise<boolean>;
  setOnStopScanning: (callback: () => void) => EmitterSubscription;
  setOnFindDevice: (
    callback: (device: IDeviceInfo) => void,
  ) => EmitterSubscription;
  monitorCharacteristics: (
    peripheralId: string,
    serviceUUID: string,
    characteristicUUID: string,
    listener: (error?: BluetoothError, value?: string) => void,
  ) => EmitterSubscription;
}

export type BluetoothNotificationCallback = (
  message: string,
  peripheral: string,
  characteristic: string,
  service: string,
) => void;

export interface IBluetoothDeviceResponse {
  id: string;
  name: string; // the name of the peripheral
  rssi: number; // the RSSI value
  advertising: {
    /// the advertising payload, here are some examples:
    isConnectable: Boolean;
    serviceUUIDs: string[];
    manufacturerData: string; /// contains the raw bytes and data (Base64 encoded string)
    serviceData: string; ///  contains the raw bytes and data (Base64 encoded string)
    txPowerLevel: number;
  };
}

export interface IBluetoothServiceInfo {
  characteristics: Array<ICharacteristic>;
  services: Array<IService>;
}

export interface IService {
  uuid: string;
}

export interface ICharacteristic {
  characteristic: string;
  descriptors: Array<IDescriptor>;
}

export interface IDescriptor {
  uuid: string;
  value: string;
}
