import {IMove} from 'models/common/IMove';

export const movesAreEqual = (move: IMove, anotherMove: IMove) => {
  return (
    move.finishPos.column === anotherMove.finishPos.column &&
    move.finishPos.row === anotherMove.finishPos.row &&
    move.startPos.column === anotherMove.startPos.column &&
    move.startPos.row === anotherMove.startPos.row
  );
};
