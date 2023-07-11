import React from 'react';
import {View} from 'react-native';

import {Column} from 'models/boardModels/Column';
import {Row} from 'models/boardModels/Row';
import {getBoardMainContainer, getCellsContainerStyles} from './styles';
import {useTheme} from 'helpers/hooks/useTheme';
import {BOARD_CELLS_PADDINGS, COLUMNS_CAPTIONS} from 'constants/BoardConstants';
import {ROW_CAPTIONS} from 'constants/BoardConstants';
import {BoardState} from 'models/boardModels/Board';
import HorizontalCaptions from 'components/moleculs/HorizontalCaptions';
import BoardCellsRow from 'components/moleculs/BoardCellsRow';

export interface BoardProps {
  onPressCell: (row: Row, column: Column) => void;
  boardState?: BoardState;
}

const Board = (props: BoardProps) => {
  const theme = useTheme();

  const renderBoardCells = () => {
    return (
      <View style={getCellsContainerStyles(BOARD_CELLS_PADDINGS)}>
        {ROW_CAPTIONS.map((_, index) => {
          return (
            <BoardCellsRow
              boardState={props.boardState}
              onPressCell={props.onPressCell}
              rowIndex={index}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={getBoardMainContainer(
        BOARD_CELLS_PADDINGS,
        theme.colors.borderColor,
        theme.colors.white,
      )}>
      <HorizontalCaptions isTop={true} captions={COLUMNS_CAPTIONS} />
      {renderBoardCells()}
      <HorizontalCaptions isTop={false} captions={COLUMNS_CAPTIONS} />
    </View>
  );
};

export default Board;
