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
  cellsContainerStyles: {
    flex: 1,
    borderWidth: 1,
    width: '100%',
  },
});

export const getCellsContainerStyles = (
  marginHorizontal: number,
  borderColor?: string,
) => ({
  ...styles.cellsContainerStyles,
  marginHorizontal,
  borderColor,
});

export const getBoardMainContainer = (
  padding: number,
  borderColor: string,
  backgroundColor: string,
) => [
  styles.mainBoardContainer,
  {
    paddingHorizontal: padding,
    paddingVertical: padding,
    borderColor,
    backgroundColor,
  },
];
