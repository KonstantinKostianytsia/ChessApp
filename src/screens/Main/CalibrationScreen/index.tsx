import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Labels from 'components/atoms/Labels';
import FilledButton from 'components/moleculs/FilledButton';
import {CALIBRATION_DELAY} from 'constants/ChessFiguresConstants';
import {useDelay} from 'helpers/hooks/useDelay';
import {
  useBluetoothDevicesStore,
  useCalibrationStore,
} from 'helpers/hooks/useStore';
import {useTheme} from 'helpers/hooks/useTheme';
import {Observer} from 'mobx-react';
import {MainStackParamList} from 'navigation/MainStack/MainStackNavigator';
import {MainStackRoutes} from 'navigation/routes';
import React, {useEffect} from 'react';
import {View} from 'react-native';

type CalibrationScreenNavigatioProp = NativeStackNavigationProp<
  MainStackParamList,
  MainStackRoutes.CalibrationScreen
>;
const CalibrationScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<CalibrationScreenNavigatioProp>();

  const calibrationStore = useCalibrationStore();
  const bluetoothStore = useBluetoothDevicesStore();

  useEffect(() => {
    try {
      const messageListener = bluetoothStore.setOnBoardStateMessage(
        updateCellsState => {
          calibrationStore.onNewBoardStateMessage(updateCellsState);
        },
      );

      return () => {
        messageListener.remove();
      };
    } catch (err) {
      console.warn(err);
    }
  }, []);

  useDelay(CALIBRATION_DELAY, () => {
    calibrationStore.stopCalibrating();
  });

  const onSubmitButtonPress = () => {
    navigation.replace(MainStackRoutes.ChessGameScreen);
  };

  return (
    <Observer>
      {() => (
        <View>
          {calibrationStore.isCalibrating && (
            <Labels.NormalText>
              We are calibrating your board...
            </Labels.NormalText>
          )}
          {!calibrationStore.isCalibrating && (
            <FilledButton
              onPress={onSubmitButtonPress}
              backgroundColor={theme.colors.buttonBackground}>
              <Labels.MediumText>Let's go!</Labels.MediumText>
            </FilledButton>
          )}
        </View>
      )}
    </Observer>
  );
};

export default CalibrationScreen;
