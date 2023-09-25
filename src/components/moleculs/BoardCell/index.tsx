import React from 'react';
import {View, Text} from 'react-native';

import CustomButton from 'components/atoms/CustomButton';
import {
  getBoardCellMainContainerStyles,
  getBoardCellTextColor,
  getBoardLEDColorStyles,
} from './styles';
import {CellStateType} from 'models/boardModels/Board';
import {useTheme} from 'helpers/hooks/useTheme';

export interface BoardCellProps {
  color: string;
  onPressCell?: () => void;
  size?: number;
  cellState?: CellStateType;
}

const BoardCell = (props: BoardCellProps) => {
  const theme = useTheme();
  const renderCell = () => {
    const textColor =
      props.color === theme.colors.white || props.cellState?.cellRGBColor
        ? theme.colors.black
        : theme.colors.white;
    return (
      <View style={getBoardLEDColorStyles(props.cellState?.cellRGBColor)}>
        <Text style={getBoardCellTextColor(textColor)}>
          {props.cellState?.cellValue}
        </Text>
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
