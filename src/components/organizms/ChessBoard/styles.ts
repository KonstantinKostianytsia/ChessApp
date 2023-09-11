import {StyleSheet} from 'react-native';

import {BOARD_CELLS_PADDINGS} from 'constants/BoardConstants';

const styles = StyleSheet.create({
  figuresContainer: {
    left: BOARD_CELLS_PADDINGS,
    top: BOARD_CELLS_PADDINGS,
    bottom: BOARD_CELLS_PADDINGS,
    right: BOARD_CELLS_PADDINGS,
    position: 'absolute',
  },
  figureContainer: {
    position: 'absolute',
  },
});

export const getFigureContainerStyles = (
  leftOffset: number,
  topOffset: number,
) => {
  return [
    styles.figureContainer,
    {
      left: leftOffset,
      top: topOffset,
    },
  ];
};

export default styles;
