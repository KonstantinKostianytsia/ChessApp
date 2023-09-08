import React from 'react';

import Board, {BoardProps} from 'components/organizms/Board';
import {BoardWithChessFigureState} from 'models/boardModels/Board';

export interface ChessBoardProps extends BoardProps {
  boardState: BoardWithChessFigureState;
}

const ChessBoard = (props: ChessBoardProps) => {
  const renderFigures = () => {
    /// TODO
  };
  return (
    <>
      <Board {...props} />
      {renderFigures()}
    </>
  );
};

export default ChessBoard;
