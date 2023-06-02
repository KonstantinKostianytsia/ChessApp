import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';

import BackgroundColor from 'components/atoms/BackgroundColor';
import {useTheme} from 'helpers/hooks/useTheme';
import Board from 'components/organizms/Board';
import {styles} from './styles';
import ColorPickerModal from 'components/organizms/ColorPickerModal';
import {useBluetoothDevicesStore, useBoardStore} from 'helpers/hooks/useStore';
import {IBluetoothCommandsService} from 'models/services/IBluetoothCommandsService';
import {BluetoothCommandsService} from 'services/BluetoothCommandsService';

const dimensions = Dimensions.get('window');

const BOARD_MARGIN_HORIZONTAL = 20;
const BOARD_SIZE = dimensions.width - BOARD_MARGIN_HORIZONTAL;

const ChangeBoardColorScreen = () => {
  const theme = useTheme();
  const boardStore = useBoardStore();
  const bluetoothStore = useBluetoothDevicesStore();

  const commandFormatterService: IBluetoothCommandsService =
    new BluetoothCommandsService();

  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const closeColorPicker = () => {
    setIsColorPickerVisible(false);
  };
  const openColorPicker = () => {
    setIsColorPickerVisible(true);
  };

  const renderColorPickerModal = () => {
    const onSelectColor = (color: string) => {
      if (boardStore.currentCellCoord) {
        boardStore.updateCellColor(color, boardStore.currentCellCoord);
        bluetoothStore
          .sendMessageToConnectedDevice(
            commandFormatterService.convertCellState({
              cellRGBColor: color,
              ...boardStore.currentCellCoord,
            }),
          )
          .then(() => {
            console.log('WRITE SUCCESS');
          })
          .finally(() => {
            closeColorPicker();
          });
      }
    };
    return (
      <ColorPickerModal
        visible={isColorPickerVisible}
        onColorChangeComplete={onSelectColor}
      />
    );
  };

  const renderBoard = () => {
    return (
      <Board
        onPressCell={(row, column) => {
          boardStore.setCurrentCellCoord({row, column});
          openColorPicker();
        }}
        boardState={boardStore.boardState}
      />
    );
  };

  return (
    <BackgroundColor
      containerStyles={styles.backgroundStyles}
      backgroundColor={theme.colors.lightGrey}>
      <>
        <View
          style={{
            height: BOARD_SIZE,
            width: BOARD_SIZE,
          }}>
          {renderBoard()}
        </View>
        {renderColorPickerModal()}
      </>
    </BackgroundColor>
  );
};

export default ChangeBoardColorScreen;
