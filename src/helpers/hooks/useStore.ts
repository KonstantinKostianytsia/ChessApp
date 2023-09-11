import {useContext} from 'react';
import {BluetoothDevicesStore} from 'stores/Main/BluetoothDevicesStore';
import {BoardStore} from 'stores/Main/BoardStore';
import {ChessGameStore} from 'stores/Main/ChessGameStore';
import {RootStore} from 'stores/index';
import {StoreContext} from 'stores/rootStoreContext';

export const useStore = (): RootStore => useContext<RootStore>(StoreContext);

export const useBluetoothDevicesStore = (): BluetoothDevicesStore =>
  useStore().bluetoothDevicesStore as BluetoothDevicesStore;

export const useBoardStore = (): BoardStore =>
  useStore().boardStore as BoardStore;

export const useChessGameStore = (): ChessGameStore =>
  useStore().chesssGameStore as ChessGameStore;
