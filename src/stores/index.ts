import {IBluetoothService} from 'models/services/IBluetoothService';
import {BluetoothDevicesStore} from './Main/BluetoothDevicesStore';
import {BluetoothService} from 'services/BluetoothService';
import {BoardStore} from './Main/BoardStore';
import {BoardValidator} from 'helpers/validator/BoardValidator';
import {ChessGameStore} from './Main/ChessGameStore';
import {ChessFigureTransformer} from 'services/ChessFiguresTransformer';

export class RootStore {
  private bluetoothService: IBluetoothService = new BluetoothService();
  boardStore: BoardStore;
  bluetoothDevicesStore: BluetoothDevicesStore;
  chesssGameStore: ChessGameStore;

  constructor() {
    this.bluetoothDevicesStore = new BluetoothDevicesStore(
      this.bluetoothService,
    );
    this.boardStore = new BoardStore(new BoardValidator());
    this.chesssGameStore = new ChessGameStore(new ChessFigureTransformer());
  }
}

const rootStore = new RootStore();

export default rootStore;
