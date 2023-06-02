import React from 'react';
import {View} from 'react-native';

import CustomButton from 'components/atoms/CustomButton';
import {
  getBoardCellMainContainerStyles,
  getBoardLEDColorStyles,
} from './styles';
import {CellStateType} from 'models/boardModels/Board';

export interface BoardCellProps {
  color: string;
  onPressCell?: () => void;
  size?: number;
  cellState?: CellStateType;
}

const BoardCell = (props: BoardCellProps) => {
  const renderCellLEDColor = (LEDColor: string) => {
    return <View style={getBoardLEDColorStyles(LEDColor)} />;
  };
  return (
    <CustomButton
      onPress={props.onPressCell}
      style={getBoardCellMainContainerStyles(props.color, props.size)}>
      {props.cellState?.cellRGBColor &&
        renderCellLEDColor(props.cellState.cellRGBColor)}
    </CustomButton>
  );
};

export default BoardCell;
