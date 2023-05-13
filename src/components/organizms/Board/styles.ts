import {BOARD_CELLS_PADDINGS} from 'constants/BoardConstants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainBoardContainer: {
    width: '100%',
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardColumnsCaptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
  },
  boardRowContainer: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCaptionStyle: {
    position: 'absolute',
  },
  cellsContainerStyles: {
    flex: 1,
    borderWidth: 1,
    width: '100%',
  },
  cellsWraper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    height: '100%',
  },
});

export const getRowCaptionStyles = (
  color: string,
  captionsPaddings: number,
  isRightCaptions?: boolean,
) => ({
  ...styles.rowCaptionStyle,
  color,
  right: isRightCaptions ? -1 * captionsPaddings : undefined,
  left: !isRightCaptions ? -1 * captionsPaddings : undefined,
});

export const getCellsContainerStyles = (
  marginHorizontal: number,
  borderColor?: string,
) => ({
  ...styles.cellsContainerStyles,
  marginHorizontal,
  borderColor,
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
