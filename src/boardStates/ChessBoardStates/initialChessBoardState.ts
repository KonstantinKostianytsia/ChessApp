import {ChessTransformerValue} from 'models/services/IChessFigureTransformer';

export const initialChessBoardState: ChessTransformerValue = [
  'rnbqkbnr',
  'pppppppp',
  '........',
  '........',
  '........',
  '........',
  'PPPPPPPP',
  'RNBQKBNR',
];

export const emptyChessBoardState: ChessTransformerValue = [
  '........',
  '........',
  '........',
  '........',
  '........',
  '........',
  '........',
  '........',
];

export const testChessBoardState: ChessTransformerValue = [
  '........',
  '........',
  '........',
  '........',
  '........',
  '........',
  '.......P',
  '........',
];

export const testCheckmate: ChessTransformerValue = [
  '....k...',
  '....p...',
  '........',
  '........',
  '........',
  '........',
  '....P...',
  '....K...',
];
