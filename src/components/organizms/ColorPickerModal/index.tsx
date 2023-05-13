import React from 'react';

import CustomModal, {CustomModalProps} from 'components/atoms/CustomModal';
import CustomColorPicker, {
  CustomColorPickerProps,
} from 'components/moleculs/ColorPicker';

type ExtendType = Omit<CustomColorPickerProps & CustomModalProps, 'children'>;

export interface ColorPickerModalProps extends ExtendType {}

const ColorPickerModal = (props: ColorPickerModalProps) => {
  return (
    <CustomModal animationType={props.animationType} visible={props.visible}>
      <CustomColorPicker
        onColorChange={props.onColorChange}
        onColorChangeComplete={props.onColorChangeComplete}
      />
    </CustomModal>
  );
};

export default ColorPickerModal;
