import {BoardWithChessFigureState} from 'models/boardModels/Board';
import {IChessBoardValidator} from 'models/helpers/validators/IChessBoardValidator';

export class ChessBoardValidator implements IChessBoardValidator {
  private _prevState: BoardWithChessFigureState = [];
  private _newState: BoardWithChessFigureState = [];
  private _errorList: Array<string> = [];

  setNewState(newState: BoardWithChessFigureState) {
    this._newState = newState;
  }

  setPrevState(prevState: BoardWithChessFigureState): void {
    this._prevState = prevState;
  }

  validate() {
    if (this._newState.length === 0) {
      this.addNewError('New state is empty');
      return false;
    }
    if (!this.validateAmountAndColorsOfFigures()) {
      return false;
    }
    return true;
  }

  getErrors() {
    return this._errorList;
  }

  private addNewError(errorMessage: string) {
    this._errorList.push(errorMessage);
  }

  private validateAmountAndColorsOfFigures(): boolean {
    return true;
  }
}
