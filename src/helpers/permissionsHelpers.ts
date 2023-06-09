import {PermissionsAndroid, Platform} from 'react-native';

const PLATFORM_ERROR = 'Method has been called with non Android platform';
const PLATFORM_VERSION_ERROR = 'Platform version is not compatible';
const USER_REFUSED_REQUEST = 'User refused request';

export const requestLocationPermissions = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      if (Platform.Version < 23) {
        reject(PLATFORM_VERSION_ERROR);
      }
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          resolve();
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result === PermissionsAndroid.RESULTS.GRANTED) {
              resolve();
            } else {
              reject(USER_REFUSED_REQUEST);
            }
          });
        }
      });
    } else {
      reject(PLATFORM_ERROR);
    }
  });
};

export const requestScanBluetoothDevices = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      ).then(result => {
        if (result) {
          resolve();
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          ).then(result => {
            if (result === PermissionsAndroid.RESULTS.GRANTED) {
              resolve();
            } else {
              reject(USER_REFUSED_REQUEST);
            }
          });
        }
      });
    } else {
      reject(PLATFORM_ERROR);
    }
  });
};

export const requestBluetoothConnect = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ).then(result => {
        if (result) {
          resolve();
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          ).then(result => {
            if (result === PermissionsAndroid.RESULTS.GRANTED) {
              resolve();
            } else {
              reject(USER_REFUSED_REQUEST);
            }
          });
        }
      });
    } else {
      reject(PLATFORM_ERROR);
    }
  });
};
