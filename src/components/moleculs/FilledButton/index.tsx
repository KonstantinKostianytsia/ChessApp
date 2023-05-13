import CustomButton, {CustomButtonProps} from 'components/atoms/CustomButton';
import React from 'react';
import {StyleSheet} from 'react-native/types';

interface FilledButtonProps extends CustomButtonProps {
  backgroundColor: string;
}

const FilledButton = (props: FilledButtonProps) => {
  return (
    <CustomButton
      style={[styles.containerStyles, {backgroundColor: props.backgroundColor}]}
      {...props}>
      {props.children}
    </CustomButton>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    width: '100%',
  },
});

export default FilledButton;
