import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  boardCellMainContainer: {flex: 1},
  boardLEDColorStyles: {
    flex: 1,
    width: '100%',
    opacity: 1,
  },
});

export const getBoardCellMainContainerStyles = (
  color: string,
  size?: number,
) => ({
  backgroundColor: color,
  height: size,
  width: size,
  ...styles.boardCellMainContainer,
});

export const getBoardLEDColorStyles = (LEDColor?: string) => ({
  ...styles.boardLEDColorStyles,
  backgroundColor: LEDColor,
});
