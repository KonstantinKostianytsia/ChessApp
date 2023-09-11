import React, {useState, useEffect} from 'react';
import {View, Text, EmitterSubscription, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Observer} from 'mobx-react';

import BackgroundColor from 'components/atoms/BackgroundColor';
import {useTheme} from 'helpers/hooks/useTheme';
import {styles} from './styles';
import FilledButton from 'components/moleculs/FilledButton';
import {MainStackRoutes} from 'navigation/routes';
import {MainStackParamList} from 'navigation/MainStack/MainStackNavigator';
import AvailableDevicesListPicker from 'components/organizms/ListDevicePicker';
import OutlineButton from 'components/moleculs/OutlineButton';
import {ModalWithHeader} from 'components/moleculs/ModalWithHeader';
import {IDeviceInfo} from 'models/common/IDeviceInfo';
import {useBluetoothDevicesStore} from 'helpers/hooks/useStore';
import RefreshButton from 'components/moleculs/RefreshButton';
import {IAlertsService} from 'models/services/IAlertsService';
import {RNAlertsService} from 'services/RNAlertsService';
import {Stack} from 'react-native-spacing-system';

type WelcomeScreenNavigatioProp = NativeStackNavigationProp<
  MainStackParamList,
  MainStackRoutes.WelcomeScreen
>;

const WelcomeScreen = () => {
  const alertsService: IAlertsService = new RNAlertsService();

  const theme = useTheme();
  const bluetoothDevicesStore = useBluetoothDevicesStore();
  const navigation = useNavigation<WelcomeScreenNavigatioProp>();

  const [isDeviceModalVisible, setIsDeviceModalVisible] = useState(false);
  let stopListeners: EmitterSubscription[] = [];

  useEffect(() => {
    bluetoothDevicesStore.initBluetooth().then(() => {
      console.log('PACKAGE INITITALIZED');
      stopListeners.push(
        bluetoothDevicesStore.setOnStopScanningLister(onStopScanning),
        // bluetoothDevicesStore.setOnFindDeviceListener(onFindDevice),
      );
    });

    return () => {
      stopListeners.map(item => item.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onStopScanning = () => {
    console.log('Scan is stopped');
    /// To prevent raise conditions
    bluetoothDevicesStore.fetchConnectedDevices().then(() => {
      bluetoothDevicesStore.fetchDiscoveredDevices();
    });
  };

  // const onFindDevice = (device: IDeviceInfo) => {
  //   // console.log('Find device');
  //   // console.log(device);
  // };

  const showDeviceModal = () => {
    setIsDeviceModalVisible(true);
  };
  const hideDeviceModal = () => {
    setIsDeviceModalVisible(false);
  };

  const renderButtons = () => {
    const renderFormButton = (title: string, handler: () => void) => {
      return (
        <FilledButton
          onPress={handler}
          style={styles.buttonStyles}
          backgroundColor={theme.colors.buttonBackground}>
          <Text>{title}</Text>
        </FilledButton>
      );
    };

    const onPressChangeColorButton = () => {
      navigation.navigate(MainStackRoutes.ChangeBoardColorScreen);
    };
    const onPressClassicGame = () => {
      navigation.navigate(MainStackRoutes.ChessGameScreen);
    };
    return (
      <View style={styles.buttonsContainerStyles}>
        {renderFormButton('Change color of cells', onPressChangeColorButton)}
        <Stack size={theme.spacingSystem[8]} />
        {renderFormButton('Classic game', onPressClassicGame)}
      </View>
    );
  };

  const renderConnectedDeviceView = () => {
    const connectedDevice = bluetoothDevicesStore.connectedDevice;
    const onPress = () => {
      if (bluetoothDevicesStore.availableDevices.length === 0) {
        bluetoothDevicesStore.scanAvailableDevices();
      }
      showDeviceModal();
    };
    return (
      <OutlineButton
        style={styles.availableDevicesButton}
        onPress={onPress}
        color={theme.colors.textColor}>
        <>
          <Text>
            {connectedDevice ? connectedDevice.name : 'Selected item'}{' '}
          </Text>
          <Text style={styles.devicesButtonRightIcon}>▿</Text>
        </>
      </OutlineButton>
    );
  };

  const renderModal = () => {
    const isScanning = bluetoothDevicesStore.isScanning;
    const onSelectItem = (item: IDeviceInfo) => {
      if (bluetoothDevicesStore.connectedDevice) {
        const isConnectedDeviceSelected =
          item.udid === bluetoothDevicesStore.connectedDevice.udid;
        let message = isConnectedDeviceSelected
          ? 'Are you sure you want to disconnect?'
          : 'Are you sure you want to disconnect and connect to another device?';
        alertsService.showMessage(message, undefined, [
          {
            text: 'OK',
            onPress: () => {
              bluetoothDevicesStore
                .disconnectFromDevice(
                  bluetoothDevicesStore.connectedDevice as unknown as IDeviceInfo,
                )
                .then(() => {
                  /// if we try to connect to another device
                  if (!isConnectedDeviceSelected) {
                    bluetoothDevicesStore
                      .connectToDevice(item)
                      .finally(() => hideDeviceModal());
                  }
                });
            },
          },
          {
            text: 'Cancel',
            onPress: () => {
              hideDeviceModal();
            },
            buttonType: 'highligted',
          },
        ]);
      } else {
        bluetoothDevicesStore.connectToDevice(item);
      }
    };

    const renderRightHeaderComponent = () => {
      const onPressRefresh = () => {
        bluetoothDevicesStore.scanAvailableDevices();
      };
      return (
        <RefreshButton
          isRefreshing={isScanning}
          onPressRefresh={onPressRefresh}
        />
      );
    };

    return (
      <ModalWithHeader
        contentStyles={styles.availableDevicesContentContainer}
        visible={isDeviceModalVisible}
        renderRightComponent={renderRightHeaderComponent}
        onPressCancel={hideDeviceModal}>
        <View style={styles.availableDevicesListContainer}>
          <AvailableDevicesListPicker
            selectedItem={bluetoothDevicesStore.connectedDevice}
            isDisplayLoaderForItem={bluetoothDevicesStore.isConnectingToDevice}
            itemToDisplayLoader={bluetoothDevicesStore.selectedDevice}
            listItems={bluetoothDevicesStore.availableDevices}
            onSelectItem={onSelectItem}
          />
        </View>
      </ModalWithHeader>
    );
  };

  return (
    <Observer>
      {() => (
        <BackgroundColor
          containerStyles={styles.backgroundStyles}
          backgroundColor={theme.colors.lightGrey}>
          <>
            <View style={styles.contentContainer}>
              {renderConnectedDeviceView()}
              {renderButtons()}
              <View />
            </View>
            {renderModal()}
          </>
        </BackgroundColor>
      )}
    </Observer>
  );
};

export default WelcomeScreen;
