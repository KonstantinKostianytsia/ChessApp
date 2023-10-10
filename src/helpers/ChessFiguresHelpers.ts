import {
  ChessFigure,
  ChessFigureColor,
  ChessFigureType,
} from 'models/boardModels/ChessFigure';
import {IUseTheme} from './hooks/useTheme';
import {ImageSourcePropType} from 'react-native';
import {
  BoardWithChessFigureState,
  CellWithChessFigureStateType,
  UpdateCellState,
} from 'models/boardModels/Board';
import {DEFAULT_BOARD_SIZE} from 'constants/BoardConstants';
import {
  converColumnToColummnIndex,
  converRowToRowIndex,
  getBoardDeepCopy,
} from './boardHelpers';
import {
  CHESS_BOARD_CELL_NORMAL_VALUE,
  CHESS_FIGURE_TRESHHOLD,
} from 'constants/ChessFiguresConstants';
import {IChessMove} from 'models/services/IChessBoardAnalyzer';

export const getImageOfChessFigure = (
  theme: IUseTheme,
  figure: ChessFigure,
): ImageSourcePropType => {
  if (figure.color === ChessFigureColor.Black) {
    switch (figure.figureType) {
      case ChessFigureType.Bishop:
        return theme.images.blackBighop;
      case ChessFigureType.King:
        return theme.images.blackKing;
      case ChessFigureType.Knight:
        return theme.images.blackKnight;
      case ChessFigureType.Pawn:
        return theme.images.blackPawn;
      case ChessFigureType.Queen:
        return theme.images.blackQueen;
      case ChessFigureType.Rook:
        return theme.images.blackRook;
    }
  } else {
    switch (figure.figureType) {
      case ChessFigureType.Bishop:
        return theme.images.whiteBishop;
      case ChessFigureType.King:
        return theme.images.whiteKing;
      case ChessFigureType.Knight:
        return theme.images.whiteKnight;
      case ChessFigureType.Pawn:
        return theme.images.whitePawn;
      case ChessFigureType.Queen:
        return theme.images.whiteQueen;
      case ChessFigureType.Rook:
        return theme.images.whiteRook;
    }
  }
};

export const transformUpdateCellStateToChessBoardState = (
  updateCellState: UpdateCellState[],
): BoardWithChessFigureState => {
  const boardCopy: BoardWithChessFigureState = [];
  for (let row = 0; row < DEFAULT_BOARD_SIZE; ++row) {
    boardCopy.push([]);
    for (let column = 0; column < DEFAULT_BOARD_SIZE; ++column) {
      boardCopy[row].push(undefined);
    }
  }

  for (let item of updateCellState) {
    const rowIndex = converRowToRowIndex(item.cellCoords.row);
    const columnIndex = converColumnToColummnIndex(item.cellCoords.column);
    const cellState: CellWithChessFigureStateType = {
      ...item.cellState,
      cellChessFigure: item.cellState.cellValue
        ? convertESPCellValueToChessFigure(item.cellState.cellValue)
        : undefined,
    };

    boardCopy[rowIndex][columnIndex] = cellState;
  }

  return boardCopy;
};

export const convertESPCellValueToChessFigure = (
  cellValue: number,
): ChessFigure | undefined => {
  const divergenceFromAverage = cellValue - CHESS_BOARD_CELL_NORMAL_VALUE;
  if (Math.abs(divergenceFromAverage) < CHESS_FIGURE_TRESHHOLD) {
    return undefined;
  }
  const figureColor =
    divergenceFromAverage > 0 ? ChessFigureColor.White : ChessFigureColor.Black;
  return new ChessFigure(figureColor, ChessFigureType.Unknown);
};

export const getNewChessBoardStateFromPreviousAndMove = (
  prevState: BoardWithChessFigureState,
  lastMove: IChessMove,
): BoardWithChessFigureState => {
  const prevStateCopy = getBoardDeepCopy(prevState);
  const startPosRowIndex = converRowToRowIndex(lastMove.startPos.row);
  const startPosColumnIndex = converColumnToColummnIndex(
    lastMove.startPos.column,
  );
  const finishPosRowIndex = converRowToRowIndex(lastMove.finishPos.row);
  const finishPosColumnIndex = converColumnToColummnIndex(
    lastMove.finishPos.column,
  );

  prevStateCopy[startPosRowIndex][startPosColumnIndex] = undefined;
  prevStateCopy[finishPosRowIndex][finishPosColumnIndex] = {
    cellChessFigure: lastMove.chessFigure,
  };

  return prevStateCopy;
};
