import React, {useEffect} from 'react';
import {Dimensions, View, Text} from 'react-native';
import {Observer} from 'mobx-react';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';

import ChessBoard from 'components/organizms/ChessBoard';
import BackgroundColor from 'components/atoms/BackgroundColor';
import {
  useBluetoothDevicesStore,
  useChessGameStore,
} from 'helpers/hooks/useStore';
import styles from './styles';
import {useTheme} from 'helpers/hooks/useTheme';
import {
  BOARD_CALIBRATION_TIME,
  BOARD_CELLS_PADDINGS,
} from 'constants/BoardConstants';
import {Row} from 'models/boardModels/Row';
import {Column} from 'models/boardModels/Column';
import {useDelay} from 'helpers/hooks/useDelay';

const dimensions = Dimensions.get('window');

const BOARD_MARGIN_HORIZONTAL = 20;
const BOARD_SIZE = dimensions.width - BOARD_MARGIN_HORIZONTAL;

const ChessGameScreen = () => {
  useKeepAwake();

  const chessGameStore = useChessGameStore();
  const bluetoothStore = useBluetoothDevicesStore();
  const theme = useTheme();

  useDelay(BOARD_CALIBRATION_TIME, () => {
    chessGameStore.stopCalibration();
  });

  useEffect(() => {
    try {
      const removeListener = bluetoothStore.setOnBoardStateMessage(
        updateCellsState => {
          chessGameStore.onNewBoardStateMessage(updateCellsState);
        },
      );

      return () => {
        removeListener.remove();
      };
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const renderBoard = () => {
    const onPressCell = (row: Row, column: Column) => {
      console.log('TEST');
    };
    return (
      <ChessBoard
        boardSize={BOARD_SIZE - 2 * BOARD_CELLS_PADDINGS}
        onPressCell={onPressCell}
        boardState={chessGameStore.chessBoardState}
      />
    );
  };

  return (
    <Observer>
      {() => (
        <BackgroundColor
          containerStyles={styles.backgroundStyles}
          backgroundColor={theme.colors.lightGrey}>
          <>
            {chessGameStore.isBoardCalibrating && (
              <Text>Wait until board is callibrating</Text>
            )}
            <View
              style={{
                height: BOARD_SIZE,
                width: BOARD_SIZE,
              }}>
              {renderBoard()}
            </View>
          </>
        </BackgroundColor>
      )}
    </Observer>
  );
};

export default ChessGameScreen;
