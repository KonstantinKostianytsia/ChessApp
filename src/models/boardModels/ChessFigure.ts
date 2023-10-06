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

  equals(anotherChessFigure?: ChessFigure): boolean {
    /// if you can call this method. It means that it is instance of ChessFigure
    /// instance of ChessFigure is not equal undefined
    if (anotherChessFigure === undefined) {
      return false;
    }
    return (
      this.color === anotherChessFigure.color &&
      this.figureType === anotherChessFigure.figureType
    );
  }
}
