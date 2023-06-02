import {IBluetoothService} from 'models/services/IBluetoothService';
import {BluetoothDevicesStore} from './Main/BluetoothDevicesStore';
import {BluetoothService} from 'services/BluetoothService';
import {BoardStore} from './Main/BoardStore';

export class RootStore {
  private bluetoothService: IBluetoothService = new BluetoothService();
  boardStore: BoardStore;
  bluetoothDevicesStore: BluetoothDevicesStore;

  constructor() {
    this.bluetoothDevicesStore = new BluetoothDevicesStore(
      this.bluetoothService,
    );
    this.boardStore = new BoardStore();
  }
}

const rootStore = new RootStore();

export default rootStore;
