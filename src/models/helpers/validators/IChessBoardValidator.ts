import {BoardWithChessFigureState} from 'models/boardModels/Board';
import {IValidator} from 'models/common/IValidator';

export interface IChessBoardValidator extends IValidator {
  setNewState(
    prevState: BoardWithChessFigureState,
    newState: BoardWithChessFigureState,
  ): boolean;
}
