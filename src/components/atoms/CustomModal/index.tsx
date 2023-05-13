import React from 'react';
import {Modal} from 'react-native';

export type CustomModalAnimationTypes = 'fade';

export interface CustomModalProps {
  children: React.ReactElement;
  visible: boolean;
  animationType?: CustomModalAnimationTypes;
}

const CustomModal = (props: CustomModalProps) => {
  return (
    <Modal
      visible={props.visible}
      animationType={props.animationType || 'fade'}>
      {props.children}
    </Modal>
  );
};

export default CustomModal;
