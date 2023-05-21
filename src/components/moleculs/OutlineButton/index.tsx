import React from 'react';
import {StyleSheet} from 'react-native';

import CustomButton, {CustomButtonProps} from 'components/atoms/CustomButton';
import {
  DEFAULT_BUTTON_BORDER_WIDTH,
  DEFAULT_BUTTON_HEIGHT,
} from 'constants/CommonConstants';

export interface OutlineButtonProps extends CustomButtonProps {
  color?: string;
  borderWidth?: number;
}

const OutlineButton = (props: OutlineButtonProps) => {
  return (
    <CustomButton
      {...props}
      style={[
        styles.containerStyles,
        {
          borderColor: props.color,
          borderWidth: props.borderWidth || DEFAULT_BUTTON_BORDER_WIDTH,
        },
        props.style,
      ]}>
      {props.children}
    </CustomButton>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    width: '100%',
    height: DEFAULT_BUTTON_HEIGHT,
  },
});

export default OutlineButton;
