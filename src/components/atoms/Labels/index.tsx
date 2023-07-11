import React, {PropsWithChildren} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {styles} from './styles';
import {FontSize} from 'constants/Labels';

export interface CustomTextProps {
  style: StyleProp<TextStyle>;
}

type CommonTextProps = PropsWithChildren<CustomTextProps>;

const getLabelsStyle = (fontSize: FontSize, lineHeight: number) => {
  return {
    fontSize,
    lineHeight,
  };
};

const NormalText = (props: CommonTextProps) => {
  return (
    <Text
      style={[
        styles.commonLabelStyles,
        props.style,
        getLabelsStyle(FontSize.NORMAL, 20),
      ]}>
      {props.children}
    </Text>
  );
};

const MediumText = (props: CommonTextProps) => {
  return (
    <Text
      style={[
        styles.commonLabelStyles,
        props.style,
        getLabelsStyle(FontSize.MEDIUM, 22),
      ]}>
      {props.children}
    </Text>
  );
};

export default {
  NormalText,
  MediumText,
};
