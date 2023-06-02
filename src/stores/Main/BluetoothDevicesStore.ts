import {makeAutoObservable} from 'mobx';
import {IDeviceInfo} from 'models/common/IDeviceInfo';
import {IBluetoothService} from 'models/services/IBluetoothService';

const WAIT_UNTIL_CONNECTING_FINISHING = 'WAIT_UNTIL_CONNECTING_FINISHING';
const THERE_IS_NO_CONNECTED_DEVICE = 'THERE_IS_NO_CONNECTED_DEVICE';

export class BluetoothDevicesStore {
  private bluetoothService: IBluetoothService;
  availableDevices: IDeviceInfo[] = [];
  selectedDevice: IDeviceInfo | undefined = undefined;
  connectedDevice: IDeviceInfo | undefined = undefined;
  isConnectingToDevice: boolean = false;
  isScanning: boolean = false;

  constructor(bluetoothService: IBluetoothService) {
    this.bluetoothService = bluetoothService;
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
    console.log(concatedArrays);
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

  public setOnStopScanningLister = (callback: () => void) => {
    return this.bluetoothService.setOnStopScanning(() => {
      this.setIsScanning(false);
      callback();
    });
  };

  public setOnFindDeviceListener = (
    callback: (device: IDeviceInfo) => void,
  ) => {
    return this.bluetoothService.setOnFindDevice((device: IDeviceInfo) => {
      callback(device);
    });
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
        '5f47f8ff-fbb4-47d4-ac92-8520ef9fed17',
        '17e8a436-de30-47dd-bfb8-baf4d82afbdb',
        message,
      );
    } else {
      throw Error(THERE_IS_NO_CONNECTED_DEVICE);
    }
  };
}
