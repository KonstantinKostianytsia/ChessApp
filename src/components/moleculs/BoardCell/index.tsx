import CustomButton from 'components/atoms/CustomButton';
import React from 'react';
import {getBoardCellMainContainerStyles} from './styles';

export interface BoardCellProps {
  color: string;
  onPressCell?: () => void;
  size?: number;
}

const BoardCell = (props: BoardCellProps) => {
  return (
    <CustomButton
      onPress={props.onPressCell}
      style={getBoardCellMainContainerStyles(props.color, props.size)}
    />
  );
};

export default BoardCell;
