import {
  ChessFigure,
  ChessFigureColor,
  ChessFigureType,
} from 'models/boardModels/ChessFigure';
import {IUseTheme} from './hooks/useTheme';
import {ImageSourcePropType} from 'react-native';

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
