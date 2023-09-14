import {BoardWithChessFigureState} from 'models/boardModels/Board';
import {IChessBoardValidator} from 'models/helpers/validators/IChessBoardValidator';

export class ChessBoardValidator implements IChessBoardValidator {
  private prevState: BoardWithChessFigureState = [];
  private newState: BoardWithChessFigureState = [];
  private errorList: Array<string> = [];

  setCords(
    prevState: BoardWithChessFigureState,
    newState: BoardWithChessFigureState,
  ) {
    this.prevState = prevState;
    this.newState = newState;
  }

  validate() {
    /// validate amount of figures
    /// validate colors of figures
    /// validate move
    return true;
  }

  getErrors() {
    return this.errorList;
  }
}
