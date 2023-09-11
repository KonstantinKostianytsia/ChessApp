import React from 'react';
import {Image, ImageProps} from 'react-native';

export interface CustomImageProps extends ImageProps {}

const CustomImage = (props: CustomImageProps) => {
  return <Image resizeMode="contain" {...props} />;
};

export default CustomImage;
