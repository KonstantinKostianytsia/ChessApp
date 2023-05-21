import CustomButton, {CustomButtonProps} from 'components/atoms/CustomButton';
import {DEFAULT_BUTTON_HEIGHT} from 'constants/CommonConstants';
import React from 'react';
import {StyleSheet} from 'react-native';

interface FilledButtonProps extends CustomButtonProps {
  backgroundColor: string;
}

const FilledButton = (props: FilledButtonProps) => {
  return (
    <CustomButton
      {...props}
      style={[
        styles.containerStyles,
        {
          backgroundColor: props.backgroundColor,
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

export default FilledButton;
