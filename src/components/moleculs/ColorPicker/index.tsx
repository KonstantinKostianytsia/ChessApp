import React from 'react';
import {ColorPicker, fromHsv} from 'react-native-color-picker';

export interface CustomColorPickerProps {
  onColorChange?: (color: string) => void;
  onColorChangeComplete?: (color: string) => void;
}

const CustomColorPicker = (props: CustomColorPickerProps) => {
  return (
    <ColorPicker
      style={{flex: 1}}
      onColorChange={color => {
        props.onColorChange && props.onColorChange(fromHsv(color));
      }}
      onColorSelected={color =>
        props.onColorChangeComplete && props.onColorChangeComplete(color)
      }
      hideSliders={true}
    />
  );
};

export default CustomColorPicker;
