export enum FigureColor {
  Black = 'Black',
  White = 'White',
}

export enum FigureType {
  King = 'King',
  Queen = 'Queen',
  Rook = 'Rook',
  Bishop = 'Bishop',
  Knight = 'Knight',
  Pawn = 'Pawn',
}

export class Figure {
  color: FigureColor;
  figureType: FigureType;

  constructor(color: FigureColor, figureType: FigureType) {
    this.color = color;
    this.figureType = figureType;
  }
}
