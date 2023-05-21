import {IBluetoothService} from 'models/services/IBluetoothService';
import {BluetoothDevicesStore} from './Main/BluetoothDevicesStore';
import {BluetoothService} from 'services/BluetoothService';

export class RootStore {
  private bluetoothService: IBluetoothService = new BluetoothService();
  bluetoothDevicesStore: BluetoothDevicesStore;

  constructor() {
    this.bluetoothDevicesStore = new BluetoothDevicesStore(
      this.bluetoothService,
    );
  }
}

const rootStore = new RootStore();

export default rootStore;
