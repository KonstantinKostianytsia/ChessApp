import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';

import BackgroundColor from 'components/atoms/BackgroundColor';
import {useTheme} from 'helpers /hooks/useTheme';
import Board from 'components/organizms/Board';
import {styles} from './styles';
import ColorPickerModal from 'components/organizms/ColorPickerModal';

const dimensions = Dimensions.get('window');

const BOARD_MARGIN_HORIZONTAL = 20;
const BOARD_SIZE = dimensions.width - BOARD_MARGIN_HORIZONTAL;

const ChangeBoardColorScreen = () => {
  const theme = useTheme();
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const closeColorPicker = () => {
    setIsColorPickerVisible(false);
  };
  const openColorPicker = () => {
    setIsColorPickerVisible(true);
  };

  const renderColorPickerModal = () => {
    return (
      <ColorPickerModal
        visible={isColorPickerVisible}
        onColorChangeComplete={color => {
          closeColorPicker();
        }}
      />
    );
  };

  const renderBoard = () => {
    return (
      <Board
        onPressCell={(row, column) => {
          openColorPicker();
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
        {renderColorPickerModal()}
      </View>
    </BackgroundColor>
  );
};

export default ChangeBoardColorScreen;
