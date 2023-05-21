import {EmitterSubscription} from 'react-native';

import {IDeviceInfo} from 'models/common/IDeviceInfo';

export interface IBluetoothService {
  // sendMessage: (message: string) => void;
  // receiveMessage: () => Promise<string>;
  init: () => Promise<any>;
  connect: (id: string) => Promise<void>;
  disconnect: (id: string) => Promise<void>;
  getConnectedPeripherals: () => Promise<IDeviceInfo[]>;
  getDiscoveredPeripherals: () => Promise<IDeviceInfo[]>;
  scan: () => Promise<any>;
  enableBluetooth: () => Promise<any>;
  setOnStopScanning: (callback: () => void) => EmitterSubscription;
  setOnFindDevice: (
    callback: (device: IDeviceInfo) => void,
  ) => EmitterSubscription;
}

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
