import {BoardWithChessFigureState} from 'models/boardModels/Board';
import {IValidator} from 'models/common/IValidator';

export interface IChessBoardValidator extends IValidator {
  setCords(
    prevState: BoardWithChessFigureState,
    newState: BoardWithChessFigureState,
  ): void;
}
