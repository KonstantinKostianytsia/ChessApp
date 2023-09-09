import React from 'react';

import CustomColorPicker, {
  CustomColorPickerProps,
} from 'components/moleculs/ColorPicker';
import {
  ModalWithHeader,
  ModalWithHeaderProp,
} from 'components/moleculs/ModalWithHeader';

type ExtendType = Omit<
  CustomColorPickerProps & ModalWithHeaderProp,
  'children'
>;

export interface ColorPickerModalProps extends ExtendType {}

/// Static height is requeired by react-native-color-picker
const ColorPickerModal = (props: ColorPickerModalProps) => {
  return (
    <ModalWithHeader contentStyles={{height: 500}} {...props}>
      <CustomColorPicker
        onColorChange={props.onColorChange}
        onColorChangeComplete={props.onColorChangeComplete}
      />
    </ModalWithHeader>
  );
};

export default ColorPickerModal;
