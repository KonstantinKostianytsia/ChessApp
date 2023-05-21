import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export interface DeviderProp {
  height: number;
  color: string;
}

const Devide = (props: DeviderProp) => {
  return (
    <View
      style={[
        {
          height: props.height,
          backgroundColor: props.color,
        },
        styles.deviderStyles,
      ]}
    />
  );
};

export default Devide;
