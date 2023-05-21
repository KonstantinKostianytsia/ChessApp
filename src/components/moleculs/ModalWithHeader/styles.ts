import {StyleSheet} from 'react-native';

const HEADER_HEIGHT = 50;
const HEADER_HORIZONTAL_PADDING = 20;

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEADER_HEIGHT,
    paddingHorizontal: HEADER_HORIZONTAL_PADDING,
  },
  closeButtonStyles: {
    fontSize: 24,
  },
});
