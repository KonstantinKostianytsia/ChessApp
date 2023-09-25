import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {Observer} from 'mobx-react';
import {Stack} from 'react-native-spacing-system';
import RNFS from 'react-native-fs';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';

import BackgroundColor from 'components/atoms/BackgroundColor';
import {useTheme} from 'helpers/hooks/useTheme';
import Board from 'components/organizms/Board';
import {styles} from './styles';
import ColorPickerModal from 'components/organizms/ColorPickerModal';
import {useBluetoothDevicesStore, useBoardStore} from 'helpers/hooks/useStore';
import {IBluetoothCommandsService} from 'models/services/IBluetoothCommandsService';
import {BluetoothCommandsService} from 'services/BluetoothCommandsService';
import {UNHANDLED_INNER_ERROR} from 'constants/ErrorConstants';
import {Column} from 'models/boardModels/Column';
import {Row} from 'models/boardModels/Row';
import {IFileSystemService} from 'models/services/IFileSystemService';
import {UpdateCellState} from 'models/boardModels/Board';
import FilledButton from 'components/moleculs/FilledButton';
import Labels from 'components/atoms/Labels';
import Timer from 'components/moleculs/Timer';
import {useTimer} from 'helpers/hooks/useTimer';
import {converRowToRowIndex} from 'helpers/boardHelpers';
import {requestWriteExternalStorage} from 'helpers/permissionsHelpers';
import {IFileSystemTextFormatter} from 'models/services/IFileSystemTextFormatter';
import {FileSystemTextFormatter} from 'services/TextFormatters/FileSystemTextFormatter';
import {FileSystemService} from 'services/FileSystemService';

const dimensions = Dimensions.get('window');

const BOARD_MARGIN_HORIZONTAL = 20;
const BOARD_SIZE = dimensions.width - BOARD_MARGIN_HORIZONTAL;
const collectedData: Array<Array<number>> = [[], [], [], [], [], [], [], []];

const ChangeBoardColorScreen = () => {
  useKeepAwake();

  const theme = useTheme();
  const boardStore = useBoardStore();
  const bluetoothStore = useBluetoothDevicesStore();

  const commandFormatterService: IBluetoothCommandsService =
    new BluetoothCommandsService();
  const fileSystemService: IFileSystemService = new FileSystemService();
  const fileSystemTextFormatter: IFileSystemTextFormatter =
    new FileSystemTextFormatter();

  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const {currentTime, isCounterStarted, startTimer, resetTimer} = useTimer();

  useEffect(() => {
    /// Different modes can be handled here. Just add expression where you want to add data
    /// and call updateCellsState with new formatted data
    try {
      const removeListener =
        bluetoothStore.setOnBoardStateMessage(onUpdateCellsState);
      return () => {
        removeListener.remove();
      };
    } catch (err) {
      /// Work around error message should be display. User should stay on the Welcome screen.
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCounterStarted]);

  const onUpdateCellsState = (updateCellsState: UpdateCellState[]) => {
    boardStore.updateCellsState(updateCellsState);

    if (isCounterStarted) {
      for (let cell of updateCellsState) {
        if (cell.cellState.cellValue) {
          const rowIndex = converRowToRowIndex(cell.cellCoords.row);
          collectedData[rowIndex].push(cell.cellState.cellValue);
        }
      }
    }
  };

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
        onPressCancel={closeColorPicker}
      />
    );
  };

  const renderBoard = () => {
    const onPressCell = (row: Row, column: Column) => {
      boardStore.setCurrentCellCoord({row, column});
      openColorPicker();
    };
    return (
      <Board
        boardSize={BOARD_SIZE}
        onPressCell={onPressCell}
        boardState={boardStore.boardState}
      />
    );
  };

  const renderDebugBlock = () => {
    const onPressButton = () => {
      if (!isCounterStarted) {
        startTimer();
      } else {
        resetTimer();
        requestWriteExternalStorage().then(() => {
          const formattedContent =
            fileSystemTextFormatter.formatDebugFileSystemData(collectedData);
          const path = `${RNFS.DownloadDirectoryPath}/${Date.now()}.txt`;
          fileSystemService
            .createAndWriteToFile(path, formattedContent)
            .then(() => console.log('SUCCESS'))
            .catch(err => console.log(err));
        });
      }
    };
    return (
      <>
        {isCounterStarted && <Timer timeInSeconds={currentTime} />}
        <FilledButton
          style={styles.debugButtonStyle}
          onPress={onPressButton}
          backgroundColor={
            isCounterStarted
              ? theme.colors.cancelButtonBackground
              : theme.colors.buttonBackground
          }>
          <Labels.NormalText>
            {isCounterStarted ? 'Stop' : 'Start'}
          </Labels.NormalText>
        </FilledButton>
      </>
    );
  };

  return (
    <Observer>
      {() => (
        <BackgroundColor
          containerStyles={styles.backgroundStyles}
          backgroundColor={theme.colors.lightGrey}>
          <>
            {renderDebugBlock()}
            <Stack size={theme.spacingSystem[8]} />
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
