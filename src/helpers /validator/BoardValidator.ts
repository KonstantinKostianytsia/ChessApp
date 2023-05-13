import {IValidator} from 'models/common/IValidator';

const ROW_INDEX_RANGE_ERROR = 'Row index is not valid should be in range [0,7]';
const COLUMN_INDEX_RANGE_ERROR =
  'Column index is not valid should be in range [0,7]';

export class BoardValidator implements IValidator {
  private rowIndex: number = -1;
  private columnIndex: number = -1;

  private errorList: Array<string> = [];

  constructor(rowIndex: number, columnIndex: number) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
  }

  validate = () => {
    /// column index and row index should not be bigger than 7 and less than 0
    if (this.rowIndex < 0 && this.rowIndex > 7) {
      this.errorList.push(ROW_INDEX_RANGE_ERROR);
      return false;
    }
    if (this.columnIndex < 0 && this.columnIndex > 7) {
      this.errorList.push(COLUMN_INDEX_RANGE_ERROR);
      return false;
    }

    return true;
  };

  getErrors = () => {
    return this.errorList;
  };
}
