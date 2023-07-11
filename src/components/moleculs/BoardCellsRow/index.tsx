import {
  BOARD_CELLS_PADDINGS,
  COLUMNS_CAPTIONS,
  ROW_CAPTIONS,
} from 'constants/BoardConstants';
import React from 'react';
import {View} from 'react-native';
import {getRowCaptionStyles, styles} from './styles';
import {useTheme} from 'helpers/hooks/useTheme';
import BoardCaption from 'components/atoms/BoardCaption';
import {BoardState, CellColor} from 'models/boardModels/Board';
import {
  convertColumnIndexToColumn,
  convertRowIndexToRow,
  getCellColor,
} from 'helpers/boardHelpers';
import {Row} from 'models/boardModels/Row';
import {Column} from 'models/boardModels/Column';
import BoardCell from '../BoardCell';

export interface BoardCellsRowProps {
  rowIndex: number;
  boardState?: BoardState;
  onPressCell: (row: Row, column: Column) => void;
}

const BoardCellsRow = (props: BoardCellsRowProps) => {
  const theme = useTheme();

  const renderCell = (rowIndex: number, columnIndex: number) => {
    const cellColor = getCellColor(rowIndex, columnIndex);
    const cellState =
      props.boardState && props.boardState.length > 0
        ? props.boardState[rowIndex][columnIndex]
        : undefined;
    return (
      <BoardCell
        cellState={cellState}
        onPressCell={() => {
          const row = convertRowIndexToRow(rowIndex);
          const column = convertColumnIndexToColumn(columnIndex);
          props.onPressCell(row, column);
        }}
        color={
          cellColor === CellColor.White
            ? theme.colors.white
            : theme.colors.black
        }
      />
    );
  };

  const renderRowCaption = (isRight: boolean = false) => {
    const rowCaption = ROW_CAPTIONS[ROW_CAPTIONS.length - props.rowIndex - 1];
    return (
      <BoardCaption
        caption={rowCaption.toString()}
        styles={getRowCaptionStyles(
          theme.colors.textColor,
          BOARD_CELLS_PADDINGS,
          isRight,
        )}
      />
    );
  };

  return (
    <View style={styles.boardRowContainer}>
      {renderRowCaption()}
      <View style={styles.cellsWraper}>
        {COLUMNS_CAPTIONS.map((_, index) => renderCell(props.rowIndex, index))}
      </View>
      {renderRowCaption(true)}
    </View>
  );
};

export default BoardCellsRow;
