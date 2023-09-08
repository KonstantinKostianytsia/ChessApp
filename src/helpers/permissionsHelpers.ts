import {Permission, PermissionsAndroid, Platform} from 'react-native';

const PLATFORM_ERROR = 'Method has been called with non Android platform';
const PLATFORM_VERSION_ERROR = 'Platform version is not compatible';
const USER_REFUSED_REQUEST = 'User refused request';

const requestPermission = (permission: Permission): Promise<void> => {
  return new Promise((resolve, reject) => {
    PermissionsAndroid.check(permission).then(result => {
      if (result) {
        resolve();
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(requestResult => {
          if (requestResult === PermissionsAndroid.RESULTS.GRANTED) {
            resolve();
          } else {
            reject(USER_REFUSED_REQUEST);
          }
        });
      }
    });
  });
};

export const requestLocationPermissions = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      if (Platform.Version < 23) {
        reject(PLATFORM_VERSION_ERROR);
      }
      requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(resolve)
        .catch(err => {
          reject(err);
        });
    } else {
      reject(PLATFORM_ERROR);
    }
  });
};

export const requestScanBluetoothDevices = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      requestPermission(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN)
        .then(resolve)
        .catch(err => {
          reject(err);
        });
    } else {
      reject(PLATFORM_ERROR);
    }
  });
};

export const requestBluetoothConnect = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      requestPermission(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT)
        .then(resolve)
        .catch(err => reject(err));
    } else {
      reject(PLATFORM_ERROR);
    }
  });
};
