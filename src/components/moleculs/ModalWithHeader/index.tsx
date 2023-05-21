import React, {ReactElement} from 'react';
import {View, Text} from 'react-native';

import CustomModal, {CustomModalProps} from 'components/atoms/CustomModal';
import {styles} from './styles';
import CustomButton from 'components/atoms/CustomButton';
import {useTheme} from 'helpers /hooks/useTheme';
import Devide from 'components/atoms/Devider';

export interface ModalWithHeaderProp extends CustomModalProps {
  onPressCancel: () => void;
  renderRightComponent?: () => ReactElement;
  onPressRightComponent?: () => void;
}

export const ModalWithHeader = (props: ModalWithHeaderProp) => {
  const theme = useTheme();
  const renderModalHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <CustomButton onPress={props.onPressCancel}>
          <Text
            style={[
              {color: theme.colors.buttonBackground},
              styles.closeButtonStyles,
            ]}>
            ✕
          </Text>
        </CustomButton>
        {props.renderRightComponent && (
          <CustomButton onPress={props.onPressRightComponent}>
            {props.renderRightComponent()}
          </CustomButton>
        )}
      </View>
    );
  };

  return (
    <CustomModal {...props}>
      <>
        {renderModalHeader()}
        <Devide height={1} color={theme.colors.buttonBackground} />
        {props.children}
      </>
    </CustomModal>
  );
};
