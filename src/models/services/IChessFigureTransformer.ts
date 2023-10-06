import {BoardWithChessFigureState} from 'models/boardModels/Board';

export type ChessFigureAbbrevition =
  | '.'
  | 'p'
  | 'P'
  | 'r'
  | 'R'
  | 'k'
  | 'K'
  | 'b'
  | 'B'
  | 'q'
  | 'Q'
  | 'k'
  | 'K';
export type ChessTransformerValue = Array<string>;

export interface IChessFigureTransformer {
  trasformeStringsToChessBoardState(
    str: ChessTransformerValue,
  ): BoardWithChessFigureState;
  convertChessBoardStateToString(
    chessBoardState: BoardWithChessFigureState,
  ): ChessTransformerValue;
}
