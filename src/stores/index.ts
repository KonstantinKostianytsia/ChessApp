import {IBluetoothService} from 'models/services/IBluetoothService';
import {BluetoothDevicesStore} from './Main/BluetoothDevicesStore';
import {BluetoothService} from 'services/BluetoothService';
import {BoardStore} from './Main/BoardStore';
import {BoardValidator} from 'helpers/validator/BoardValidator';
import {ChessGameStore} from './Main/ChessGameStore';
import {ChessFigureTransformer} from 'services/ChessFiguresTransformer';
import {IBluetoothCommandsService} from 'models/services/IBluetoothCommandsService';
import {BluetoothCommandsService} from 'services/BluetoothCommandsService';
import {ChessBoardValidator} from 'helpers/validator/ChessBoardValidator';
import {ChessBoardAnalyzer} from 'services/ChessBoardAnalyzer';
import {CalibrationStore} from './Main/CalibrationStore';
import {ChessEngineStore} from './Main/ChessEngineStore';

export class RootStore {
  private bluetoothService: IBluetoothService = new BluetoothService();
  private bluetoothCommandService: IBluetoothCommandsService =
    new BluetoothCommandsService();
  boardStore: BoardStore;
  bluetoothDevicesStore: BluetoothDevicesStore;
  chesssGameStore: ChessGameStore;
  calibrationStore: CalibrationStore;
  chessEngineStore: ChessEngineStore;

  constructor() {
    this.bluetoothDevicesStore = new BluetoothDevicesStore(
      this.bluetoothService,
      this.bluetoothCommandService,
    );
    this.boardStore = new BoardStore(new BoardValidator());

    const chessBoardAnalyzer = new ChessBoardAnalyzer();
    this.chesssGameStore = new ChessGameStore(
      new ChessFigureTransformer(),
      new ChessBoardValidator(),
      chessBoardAnalyzer,
      this,
    );
    this.calibrationStore = new CalibrationStore(chessBoardAnalyzer);
    this.chessEngineStore = new ChessEngineStore();
  }
}

const rootStore = new RootStore();

export default rootStore;
