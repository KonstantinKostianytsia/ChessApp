import React from 'react';
import {View, Text} from 'react-native';

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
  const renderCell = () => {
    return (
      <View style={getBoardLEDColorStyles(props.cellState?.cellRGBColor)}>
        <Text>{props.cellState?.cellValue}</Text>
      </View>
    );
  };
  return (
    <CustomButton
      onPress={props.onPressCell}
      style={getBoardCellMainContainerStyles(props.color, props.size)}>
      {renderCell()}
    </CustomButton>
  );
};

export default BoardCell;
