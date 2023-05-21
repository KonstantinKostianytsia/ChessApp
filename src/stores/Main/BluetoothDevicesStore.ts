import {makeAutoObservable} from 'mobx';
import {IDeviceInfo} from 'models/common/IDeviceInfo';
import {IBluetoothService} from 'models/services/IBluetoothService';

const WAIT_UNTIL_CONNECTING_FINISHING = 'WAIT_UNTIL_CONNECTING_FINISHING';

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

  private addAvailableDevices = (device: IDeviceInfo) => {
    this.availableDevices = [...this.availableDevices, device];
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
    } finally {
      this.setIsConnectingToDevice(false);
    }
  };

  public disconnectFromDevice = async (device: IDeviceInfo) => {
    await this.bluetoothService.disconnect(device.udid);
    this.setConnectedDevice(undefined);
  };

  public scanAvailableDevices = async () => {
    this.setIsScanning(true);
    await this.bluetoothService.scan();
  };

  public initBluetooth = async () => {
    await this.bluetoothService.enableBluetooth();
    return await this.bluetoothService.init();
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
      this.addAvailableDevices(device);
      callback(device);
    });
  };

  public fetchConnectedDevices = async () => {
    const result = await this.bluetoothService.getConnectedPeripherals();
    this.setAvailableDevices(result);
  };

  public fetchDiscoveredDevices = async () => {
    const result = await this.bluetoothService.getDiscoveredPeripherals();
    this.setAvailableDevices(result);
  };
}
