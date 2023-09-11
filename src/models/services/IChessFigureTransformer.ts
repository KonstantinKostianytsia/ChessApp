import {BoardWithChessFigureState} from 'models/boardModels/Board';

export type ChessTransformerValue = Array<string>;

export interface IChessFigureTransformer {
  trasformeStringsToChessBoardState(
    str: ChessTransformerValue,
  ): BoardWithChessFigureState;
  convertChessBoardStateToString(
    chessBoardState: BoardWithChessFigureState,
  ): ChessTransformerValue;
}
