import {useContext} from 'react';
import {BluetoothDevicesStore} from 'stores/Main/BluetoothDevicesStore';
import {RootStore} from 'stores/index';
import {StoreContext} from 'stores/rootStoreContext';

export const useStore = (): RootStore => useContext<RootStore>(StoreContext);

export const useBluetoothDevicesStore = (): BluetoothDevicesStore =>
  useStore().bluetoothDevicesStore as BluetoothDevicesStore;
