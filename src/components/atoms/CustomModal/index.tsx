import React from 'react';
import Modal from 'react-native-modal';
import {ViewStyle, View} from 'react-native';
import {useTheme} from 'helpers/hooks/useTheme';
import {styles} from './styles';

export type CustomModalAnimationTypes = 'fade';

export interface CustomModalProps {
  children: React.ReactElement;
  visible: boolean;
  animationType?: CustomModalAnimationTypes;
  contentStyles?: ViewStyle;
}

const CustomModal = (props: CustomModalProps) => {
  const theme = useTheme();
  const mapAnimationType = () => {
    switch (props.animationType) {
      case 'fade':
        return 'fadeIn';
    }
  };
  return (
    <Modal
      coverScreen={false}
      isVisible={props.visible}
      animationIn={mapAnimationType()}
      animationOut={mapAnimationType()}>
      <View
        style={[
          props.contentStyles,
          {backgroundColor: theme.colors.viewBackgroundColor},
          styles.contentDefaultStyle,
        ]}>
        {props.children}
      </View>
    </Modal>
  );
};

export default CustomModal;
