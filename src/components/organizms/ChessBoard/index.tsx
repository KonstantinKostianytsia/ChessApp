import React from 'react';
import {View} from 'react-native';

import Board, {BoardProps} from 'components/organizms/Board';
import {BoardWithChessFigureState} from 'models/boardModels/Board';
import styles, {getFigureContainerStyles} from './styles';
import ChessFigureComponent from 'components/moleculs/ChessFigureComponent';
import {DEFAULT_BOARD_SIZE} from 'constants/BoardConstants';

const CELL_PADDING = 5;

export interface ChessBoardProps extends BoardProps {
  boardState: BoardWithChessFigureState;
}

const ChessBoard = (props: ChessBoardProps) => {
  const cellSize = props.boardSize / DEFAULT_BOARD_SIZE;
  const figureSize = cellSize - 2 * CELL_PADDING;

  const renderFigures = () => {
    return (
      <View style={styles.figuresContainer}>
        {props.boardState.map((rowData, rowIndex) => {
          return (
            <View key={rowIndex}>
              {rowData.map((cellData, columnIndex) => {
                if (cellData?.cellChessFigure) {
                  const leftOffset = columnIndex * cellSize + CELL_PADDING;
                  const topOffset = rowIndex * cellSize + CELL_PADDING;
                  return (
                    <View
                      key={`${rowIndex}_${columnIndex}`}
                      style={getFigureContainerStyles(leftOffset, topOffset)}>
                      <ChessFigureComponent
                        size={figureSize}
                        figure={cellData.cellChessFigure}
                      />
                    </View>
                  );
                }
              })}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <Board {...props} />
      {renderFigures()}
    </>
  );
};

export default ChessBoard;
