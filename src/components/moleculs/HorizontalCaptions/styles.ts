import {BOARD_CELLS_PADDINGS} from 'constants/BoardConstants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  boardColumnsCaptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
  },
});

export const getColumnsCaptionContainerStyles = (isTop?: boolean) => {
  return [
    styles.boardColumnsCaptions,
    {
      left: BOARD_CELLS_PADDINGS,
      top: isTop ? 0 : undefined,
      bottom: !isTop ? 0 : undefined,
    },
  ];
};
