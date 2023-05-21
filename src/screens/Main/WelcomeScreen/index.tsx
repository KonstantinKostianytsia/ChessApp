import React, {useState, useEffect} from 'react';
import {View, Text, EmitterSubscription} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Observer} from 'mobx-react';

import BackgroundColor from 'components/atoms/BackgroundColor';
import {useTheme} from 'helpers /hooks/useTheme';
import {styles} from './styles';
import FilledButton from 'components/moleculs/FilledButton';
import {MainStackRoutes} from 'navigation/routes';
import {MainStackParamList} from 'navigation/MainStack/MainStackNavigator';
import AvailableDevicesListPicker from 'components/organizms/ListDevicePicker';
import OutlineButton from 'components/moleculs/OutlineButton';
import {ModalWithHeader} from 'components/moleculs/ModalWithHeader';
import {IDeviceInfo} from 'models/common/IDeviceInfo';
import {useBluetoothDevicesStore} from 'helpers /hooks/useStore';
import CustomButton from 'components/atoms/CustomButton';
import RefreshButton from 'components/moleculs/RefreshButton';

type WelcomeScreenNavigatioProp = NativeStackNavigationProp<
  MainStackParamList,
  MainStackRoutes.WelcomeScreen
>;

const WelcomeScreen = () => {
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
        bluetoothDevicesStore.setOnFindDeviceListener(onFindDevice),
      );
    });

    return () => {
      stopListeners.map(item => item.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onStopScanning = () => {
    console.log('Scan is stopped');
    bluetoothDevicesStore.fetchDiscoveredDevices();
  };

  const onFindDevice = (device: IDeviceInfo) => {
    console.log('Find device');
    console.log(device);
  };

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
    return (
      <View style={styles.buttonsContainerStyles}>
        {renderFormButton('Change color of cells', onPressChangeColorButton)}
      </View>
    );
  };

  const renderConnectedDeviceView = () => {
    const onPress = () => {
      bluetoothDevicesStore.scanAvailableDevices();
      showDeviceModal();
    };
    return (
      <OutlineButton
        style={styles.availableDevicesButton}
        onPress={onPress}
        color={theme.colors.textColor}>
        <>
          <Text>
            {bluetoothDevicesStore.selectedDevice
              ? bluetoothDevicesStore.selectedDevice.name
              : 'Selected item'}{' '}
          </Text>
          <Text style={styles.devicesButtonRightIcon}>▿</Text>
        </>
      </OutlineButton>
    );
  };

  const renderModal = () => {
    const isScanning = bluetoothDevicesStore.isScanning;
    const onSelectItem = (item: IDeviceInfo) => {
      bluetoothDevicesStore.connectToDevice(item).then(() => {
        hideDeviceModal();
      });
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
