import React from 'react';
import {View, Text} from 'react-native';

import {Column} from 'models/boardModels/Column';
import {Row} from 'models/boardModels/Row';
import {
  getCellsContainerStyles,
  getColumnsCaptionContainerStyles,
  getRowCaptionStyles,
  styles,
} from './styles';
import {useTheme} from 'helpers /hooks/useTheme';
import {BOARD_CELLS_PADDINGS, COLUMNS_CAPTIONS} from 'constants/BoardConstants';
import {ROW_CAPTIONS} from 'constants/BoardConstants';
import BoardCell from 'components/moleculs/BoardCell';
import {
  convertColumnIndexToColumn,
  convertRowIndexToRow,
  getCellColor,
} from 'helpers /boardHelpers';
import {CellColor} from 'models/boardModels/Board';
import {BoardValidator} from 'helpers /validator/BoardValidator';

export interface BoardProps {
  onPressCell: (row: Row, column: Column) => void;
}

const Board = (props: BoardProps) => {
  const theme = useTheme();

  const renderBoard = () => {
    ///
    const renderColumnsCaptions = (isTop: boolean = false) => {
      const renderCaption = (caption: string) => {
        return <Text style={{color: theme.colors.textColor}}>{caption}</Text>;
      };
      return (
        <View style={getColumnsCaptionContainerStyles(isTop)}>
          {COLUMNS_CAPTIONS.map(renderCaption)}
        </View>
      );
    };

    const renderBoardCells = () => {
      ///
      const renderBoardRows = (rowIndex: number) => {
        ///
        const renderCell = (row: number, column: number) => {
          ///
          const color = getCellColor(row, column);
          const onPressCell = () => {
            const boardValidator = new BoardValidator(rowIndex, column);
            if (boardValidator.validate()) {
              const convertedToRow = convertRowIndexToRow(rowIndex);
              const convertedToColumn = convertColumnIndexToColumn(column);
              props.onPressCell(convertedToRow, convertedToColumn);
            } else {
              throw new Error('VALIDATION ERROR');
            }
          };
          return (
            <BoardCell
              onPressCell={onPressCell}
              color={
                color === CellColor.White
                  ? theme.colors.white
                  : theme.colors.black
              }
            />
          );
        };
        const renderRowCaptions = (isRight: boolean = false) => {
          const rowCaption = ROW_CAPTIONS[ROW_CAPTIONS.length - rowIndex - 1];
          return (
            <Text
              style={getRowCaptionStyles(
                theme.colors.textColor,
                BOARD_CELLS_PADDINGS,
                isRight,
              )}>
              {rowCaption}
            </Text>
          );
        };
        return (
          <View style={styles.boardRowContainer}>
            {renderRowCaptions()}
            <View style={styles.cellsWraper}>
              {COLUMNS_CAPTIONS.map((_, index) => renderCell(rowIndex, index))}
            </View>
            {renderRowCaptions(true)}
          </View>
        );
      };

      return (
        <View style={getCellsContainerStyles(BOARD_CELLS_PADDINGS)}>
          {ROW_CAPTIONS.map((_, index) => {
            return renderBoardRows(index);
          })}
        </View>
      );
    };
    return (
      <>
        {renderColumnsCaptions(true)}
        {renderBoardCells()}
        {renderColumnsCaptions(false)}
      </>
    );
  };
  return (
    <View
      style={[
        styles.mainBoardContainer,
        {
          paddingHorizontal: BOARD_CELLS_PADDINGS,
          paddingVertical: BOARD_CELLS_PADDINGS,
          borderColor: theme.colors.borderColor,
          backgroundColor: theme.colors.white,
        },
      ]}>
      {renderBoard()}
    </View>
  );
};

export default Board;
