import {makeAutoObservable} from 'mobx';

import {
  BLUETOOTH_SERVICE_ID,
  READ_BOARD_STATE_CHARACTERISTIC,
  WRITE_COLOR_CHARACTERISTIC,
} from 'constants/BluetoothConstants';
import {UNHANDLED_INNER_ERROR} from 'constants/ErrorConstants';
import {IDeviceInfo} from 'models/common/IDeviceInfo';
import {BluetoothError} from 'models/services/BluetoothErrors';
import {IBluetoothService} from 'models/services/IBluetoothService';
import {IBluetoothCommandsService} from 'models/services/IBluetoothCommandsService';
import BufferService from 'services/BufferService';
import {UpdateCellState} from 'models/boardModels/Board';

const WAIT_UNTIL_CONNECTING_FINISHING = 'WAIT_UNTIL_CONNECTING_FINISHING';
const THERE_IS_NO_CONNECTED_DEVICE = 'THERE_IS_NO_CONNECTED_DEVICE';

export class BluetoothDevicesStore {
  private bluetoothService: IBluetoothService;
  private bluetoothCommandService: IBluetoothCommandsService;
  availableDevices: IDeviceInfo[] = [];
  selectedDevice: IDeviceInfo | undefined = undefined;
  connectedDevice: IDeviceInfo | undefined = undefined;
  isConnectingToDevice: boolean = false;
  isScanning: boolean = false;

  constructor(
    bluetoothService: IBluetoothService,
    bluetoothCommandService: IBluetoothCommandsService,
  ) {
    this.bluetoothService = bluetoothService;
    this.bluetoothCommandService = bluetoothCommandService;
    makeAutoObservable(this);
  }

  private setIsScanning = (value: boolean) => {
    this.isScanning = value;
  };

  private setAvailableDevices = (devices: IDeviceInfo[]) => {
    this.availableDevices = devices;
  };

  private addAvailableDevices = (devices: IDeviceInfo[]) => {
    const concatedArrays = [...this.availableDevices, ...devices];
    for (var i = 0; i < concatedArrays.length; ++i) {
      for (var j = i + 1; j < concatedArrays.length; ++j) {
        if (concatedArrays[i].udid === concatedArrays[j].udid) {
          concatedArrays.splice(j--, 1);
        }
      }
    }
    this.availableDevices = concatedArrays;
  };

  private setConnectedDevice = (device?: IDeviceInfo) => {
    this.connectedDevice = device;
  };

  private setSelectedDevice = (device?: IDeviceInfo) => {
    this.selectedDevice = device;
  };

  private setIsConnectingToDevice = (value: boolean) => {
    this.isConnectingToDevice = value;
  };

  public connectToDevice = async (device: IDeviceInfo) => {
    /// if a user already connected to device - disconnect him
    if (this.connectedDevice) {
      await this.disconnectFromDevice(this.connectedDevice);
    }
    /// if a user connecting to device - throw wait exception
    if (this.selectedDevice) {
      throw Error(WAIT_UNTIL_CONNECTING_FINISHING);
    }
    this.setSelectedDevice(device);
    this.setIsConnectingToDevice(true);
    try {
      await this.bluetoothService.connect(device.udid);
      this.setConnectedDevice(device);
    } catch (err) {
      this.setSelectedDevice(undefined);
      throw err;
    } finally {
      this.setIsConnectingToDevice(false);
    }
  };

  public disconnectFromDevice = async (device: IDeviceInfo) => {
    this.setIsConnectingToDevice(true);
    try {
      await this.bluetoothService.disconnect(device.udid);
    } catch (err) {
      throw err;
    } finally {
      this.setIsConnectingToDevice(false);
    }
    this.setSelectedDevice(undefined);
    this.setConnectedDevice(undefined);
  };

  public scanAvailableDevices = async () => {
    this.setIsScanning(true);
    await this.bluetoothService.scan();
  };

  public initBluetooth = async () => {
    await this.bluetoothService.init();
    await this.bluetoothService.enableBluetooth();
    return;
  };

  public fetchConnectedDevices = async () => {
    const result = await this.bluetoothService.getConnectedPeripherals();
    if (result.length > 0) {
      this.setConnectedDevice(result[0]);
      this.setSelectedDevice(result[0]);
    }
    this.addAvailableDevices(result);
  };

  public fetchDiscoveredDevices = async () => {
    const result = await this.bluetoothService.getDiscoveredPeripherals();
    this.addAvailableDevices(result);
  };

  public sendMessageToConnectedDevice = async (message: string) => {
    if (this.connectedDevice) {
      await this.bluetoothService.writeMessage(
        this.connectedDevice.udid,
        BLUETOOTH_SERVICE_ID,
        WRITE_COLOR_CHARACTERISTIC,
        message,
      );
    } else {
      throw Error(THERE_IS_NO_CONNECTED_DEVICE);
    }
  };

  public setOnStopScanningLister = (callback: () => void) => {
    const onStopScanning = () => {
      this.setIsScanning(false);
      callback();
    };
    return this.bluetoothService.setOnStopScanning(onStopScanning);
  };

  public setOnFindDeviceListener = (
    callback: (device: IDeviceInfo) => void,
  ) => {
    return this.bluetoothService.setOnFindDevice((device: IDeviceInfo) => {
      callback(device);
    });
  };

  public setOnBoardStateMessage = (
    callback: (boardState: UpdateCellState[]) => void,
  ) => {
    const monitorCallback = (
      error?: BluetoothError | undefined,
      value?: string | undefined,
    ) => {
      if (error) {
        throw Error(error.message);
      } else {
        if (value) {
          const encodedBoardStateStr =
            BufferService.convertBase64ToString(value);
          const updateBoardState =
            this.bluetoothCommandService.parseBoardFigureState(
              encodedBoardStateStr,
            );
          callback(updateBoardState);
        }
      }
    };

    if (this.connectedDevice) {
      return this.bluetoothService.monitorCharacteristics(
        this.connectedDevice.udid,
        BLUETOOTH_SERVICE_ID,
        READ_BOARD_STATE_CHARACTERISTIC,
        monitorCallback,
      );
    } else {
      throw Error(UNHANDLED_INNER_ERROR);
    }
  };
}
