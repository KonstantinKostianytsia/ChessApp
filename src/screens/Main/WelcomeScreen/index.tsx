import React from 'react';
import {Dimensions, View} from 'react-native';

import BackgroundColor from 'components/atoms/BackgroundColor';
import {useTheme} from 'helpers /hooks/useTheme';
import Board from 'components/organizms/Board';
import {styles} from './styles';

const dimensions = Dimensions.get('window');

const BOARD_MARGIN_HORIZONTAL = 20;
const BOARD_SIZE = dimensions.width - BOARD_MARGIN_HORIZONTAL;

const WelcomeScreen = () => {
  const theme = useTheme();

  const renderBoard = () => {
    return (
      <Board
        onPressCell={(row, column) => {
          console.log(row, column);
        }}
      />
    );
  };

  return (
    <BackgroundColor
      containerStyles={styles.backgroundStyles}
      backgroundColor={theme.colors.lightGrey}>
      <View
        style={{
          height: BOARD_SIZE,
          width: BOARD_SIZE,
        }}>
        {renderBoard()}
      </View>
    </BackgroundColor>
  );
};

export default WelcomeScreen;
