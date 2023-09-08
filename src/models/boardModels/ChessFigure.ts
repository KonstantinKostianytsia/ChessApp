export enum ChessFigureColor {
  Black = 'Black',
  White = 'White',
}

export enum ChessFigureType {
  King = 'King',
  Queen = 'Queen',
  Rook = 'Rook',
  Bishop = 'Bishop',
  Knight = 'Knight',
  Pawn = 'Pawn',
}

export class ChessFigure {
  color: ChessFigureColor;
  figureType: ChessFigureType;

  constructor(color: ChessFigureColor, figureType: ChessFigureType) {
    this.color = color;
    this.figureType = figureType;
  }
}
