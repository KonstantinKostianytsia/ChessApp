import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  cellsWraper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    height: '100%',
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
