import React from 'react';
import {Pressable, PressableProps} from 'react-native';

export interface CustomButtonProps extends PressableProps {}

const CustomButton = (props: CustomButtonProps) => {
  return <Pressable {...props}>{props.children}</Pressable>;
};

export default CustomButton;
