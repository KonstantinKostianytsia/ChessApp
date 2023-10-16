import {BoardWithChessFigureState} from 'models/boardModels/Board';
import {IValidator} from 'models/common/IValidator';

export interface IChessBoardValidator extends IValidator {
  setNewState(newState: BoardWithChessFigureState): void;
  setPrevState(prevState: BoardWithChessFigureState): void;
}
