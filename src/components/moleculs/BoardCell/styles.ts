import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  boardCellMainContainer: {flex: 1},
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
