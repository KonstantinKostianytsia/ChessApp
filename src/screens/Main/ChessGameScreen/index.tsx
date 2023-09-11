import React from 'react';
import {Dimensions, View} from 'react-native';
import {Observer} from 'mobx-react';

import ChessBoard from 'components/organizms/ChessBoard';
import BackgroundColor from 'components/atoms/BackgroundColor';
import {useChessGameStore} from 'helpers/hooks/useStore';
import styles from './styles';
import {useTheme} from 'helpers/hooks/useTheme';
import {BOARD_CELLS_PADDINGS} from 'constants/BoardConstants';

const dimensions = Dimensions.get('window');

const BOARD_MARGIN_HORIZONTAL = 20;
const BOARD_SIZE = dimensions.width - BOARD_MARGIN_HORIZONTAL;

const ChessGameScreen = () => {
  const chessGameStore = useChessGameStore();
  const theme = useTheme();

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
