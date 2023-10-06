import {BoardWithChessFigureState} from 'models/boardModels/Board';
import {IChessBoardValidator} from 'models/helpers/validators/IChessBoardValidator';
import {IChessBoardAnalyzer} from 'models/services/IChessBoardAnalyzer';

export class ChessBoardValidator implements IChessBoardValidator {
  private prevState: BoardWithChessFigureState = [];
  private newState: BoardWithChessFigureState = [];
  private errorList: Array<string> = [];

  private _chessBoardAnalyzer: IChessBoardAnalyzer;

  constructor(chessBoardAnalyzer: IChessBoardAnalyzer) {
    this._chessBoardAnalyzer = chessBoardAnalyzer;
  }

  private addNewError(errorMessage: string) {
    this.errorList.push(errorMessage);
  }

  setNewState(
    prevState: BoardWithChessFigureState,
    newState: BoardWithChessFigureState,
  ) {
    const isStateChanged = this._chessBoardAnalyzer.isStateChanged(
      prevState,
      newState,
    );
    if (isStateChanged) {
      this.prevState = prevState;
      this.newState = newState;
      return true;
    }
    return false;
  }

  validate() {
    if (this.newState.length === 0) {
      this.addNewError('New state is empty');
      return false;
    }
    /// validate amount of figures
    /// validate colors of figures
    /// validate move
    return true;
  }

  getErrors() {
    return this.errorList;
  }
}
