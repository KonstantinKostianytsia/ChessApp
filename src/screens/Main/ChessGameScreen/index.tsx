import React, {useEffect} from 'react';
import {Dimensions, View} from 'react-native';
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
import {BOARD_CELLS_PADDINGS} from 'constants/BoardConstants';
import {transformUpdateCellStateToChessBoardState} from 'helpers/ChessFiguresHelpers';
import {Row} from 'models/boardModels/Row';
import {Column} from 'models/boardModels/Column';

const dimensions = Dimensions.get('window');

const BOARD_MARGIN_HORIZONTAL = 20;
const BOARD_SIZE = dimensions.width - BOARD_MARGIN_HORIZONTAL;

const ChessGameScreen = () => {
  useKeepAwake();

  const chessGameStore = useChessGameStore();
  const bluetoothStore = useBluetoothDevicesStore();
  const theme = useTheme();

  useEffect(() => {
    try {
      const removeListener = bluetoothStore.setOnBoardStateMessage(
        updateCellsState => {
          const newChessBoardState =
            transformUpdateCellStateToChessBoardState(updateCellsState);
          chessGameStore.setChessBoardState(newChessBoardState);
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
