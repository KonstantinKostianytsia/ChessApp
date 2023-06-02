import {IDeviceInfo} from 'models/common/IDeviceInfo';
import {
  IBluetoothServiceInfo,
  ICharacteristic,
  IDescriptor,
  IService,
} from 'models/services/IBluetoothService';
import {
  Characteristic,
  Descriptor,
  Peripheral,
  PeripheralInfo,
  Service,
} from 'react-native-ble-manager';

export const mapPeripheralToIDeviceInfo = (
  peripheral: Peripheral,
): IDeviceInfo => {
  return {
    udid: peripheral.id,
    name: peripheral.name || peripheral.advertising.localName || '',
  };
};

export const mapPeripheralInfoToIBluetoothServiceInfo = (
  peripheralInfo: PeripheralInfo,
): IBluetoothServiceInfo => {
  return {
    characteristics: peripheralInfo.characteristics
      ? peripheralInfo.characteristics.map(mapCharacteristicToICharacteristic)
      : [],
    services: peripheralInfo.services
      ? peripheralInfo.services.map(mapPeriferalServiceToIService)
      : [],
  };
};

export const mapPeriferalServiceToIService = (service: Service): IService => {
  return {
    uuid: service.uuid,
  };
};

export const mapCharacteristicToICharacteristic = (
  characteristic: Characteristic,
): ICharacteristic => {
  return {
    ['characteristic']: characteristic.characteristic,
    descriptors: characteristic.descriptors
      ? characteristic.descriptors.map(mapDescriptorToIDescriptor)
      : [],
  };
};

export const mapDescriptorToIDescriptor = (
  descriptor: Descriptor,
): IDescriptor => {
  return {
    uuid: descriptor.uuid,
    value: descriptor.value,
  };
};
