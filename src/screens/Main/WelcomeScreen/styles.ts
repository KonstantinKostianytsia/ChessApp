import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  backgroundStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  contentContainer: {flex: 1, justifyContent: 'space-between', width: '100%'},
  buttonStyles: {
    width: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainerStyles: {width: '100%'},
  availableDevicesContentContainer: {
    height: 300,
    borderRadius: 20,
  },
  availableDevicesListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  availableDevicesButton: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  devicesButtonRightIcon: {
    fontSize: 24,
  },
});
