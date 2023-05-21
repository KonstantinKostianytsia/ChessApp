import React from 'react';
import {ActivityIndicator, Text, View, ViewStyle} from 'react-native';

import CustomButton from 'components/atoms/CustomButton';
import {useTheme} from 'helpers /hooks/useTheme';
import {styles} from './styles';

export interface RefreshButtonProp {
  isRefreshing: boolean;
  onPressRefresh?: () => void;
  containerStyles?: ViewStyle;
}

const RefreshButton = (props: RefreshButtonProp) => {
  const theme = useTheme();
  return (
    <View style={props.containerStyles}>
      {props.isRefreshing ? (
        <ActivityIndicator />
      ) : (
        <CustomButton onPress={props.onPressRefresh}>
          <Text
            style={[
              styles.refreshIconStyle,
              {color: theme.colors.buttonBackground},
            ]}>
            ↻
          </Text>
        </CustomButton>
      )}
    </View>
  );
};

export default RefreshButton;
