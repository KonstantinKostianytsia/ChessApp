import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface BackgroundColorProps {
  backgroundColor: string;
  children: React.ReactElement;
  containerStyles?: ViewStyle;
}

const BackgroundColor = (props: BackgroundColorProps) => {
  return (
    <View
      style={[
        styles.mainContainer,
        props.containerStyles,
        {backgroundColor: props.backgroundColor},
      ]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
});

export default BackgroundColor;
