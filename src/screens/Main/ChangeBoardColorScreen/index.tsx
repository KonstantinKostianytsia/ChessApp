import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {Observer} from 'mobx-react';

import BackgroundColor from 'components/atoms/BackgroundColor';
import {useTheme} from 'helpers/hooks/useTheme';
import Board from 'components/organizms/Board';
import {styles} from './styles';
import ColorPickerModal from 'components/organizms/ColorPickerModal';
import {useBluetoothDevicesStore, useBoardStore} from 'helpers/hooks/useStore';
import {IBluetoothCommandsService} from 'models/services/IBluetoothCommandsService';
import {BluetoothCommandsService} from 'services/BluetoothCommandsService';
import {
  UNHANDLED_INNER_ERROR,
  VALIDATION_ERROR,
} from 'constants/ErrorConstants';
import BufferService from 'services/BufferService';
import {BoardValidator} from 'helpers/validator/BoardValidator';
import {
  converColumnToColummnIndex,
  converRowToRowIndex,
} from 'helpers/boardHelpers';
import {Column} from 'models/boardModels/Column';
import {Row} from 'models/boardModels/Row';

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

  useEffect(() => {
    /// Different modes can be handled here. Just add expression where you want to add data
    /// and call updateCellsState with new formatted data
    const removeListener = bluetoothStore.setOnBoardStateMessage(message => {
      const stateString = BufferService.convertBase64ToString(message);
      const updateBoardState =
        commandFormatterService.parseBoardFigureState(stateString);
      boardStore.updateCellsState(updateBoardState);
    });

    return () => {
      removeListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeColorPicker = () => {
    setIsColorPickerVisible(false);
  };
  const openColorPicker = () => {
    setIsColorPickerVisible(true);
  };

  const renderColorPickerModal = () => {
    const onSelectColor = (color: string) => {
      if (boardStore.currentCellCoord) {
        boardStore.updateCellsState([
          {
            cellState: {
              cellRGBColor: color,
            },
            cellCoords: boardStore.currentCellCoord,
          },
        ]);
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
      } else {
        throw Error(UNHANDLED_INNER_ERROR);
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
    const onPressCell = (row: Row, column: Column) => {
      const rowIndex = converRowToRowIndex(row);
      const columnIndex = converColumnToColummnIndex(column);
      const boardValidator = new BoardValidator(rowIndex, columnIndex);
      if (boardValidator.validate()) {
        boardStore.setCurrentCellCoord({row, column});
        openColorPicker();
      } else {
        throw new Error(VALIDATION_ERROR);
      }
    };
    return (
      <Board onPressCell={onPressCell} boardState={boardStore.boardState} />
    );
  };

  return (
    <Observer>
      {() => (
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
      )}
    </Observer>
  );
};

export default ChangeBoardColorScreen;
