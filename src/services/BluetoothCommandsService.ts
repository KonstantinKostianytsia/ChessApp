import {
  converColumnToColummnIndex,
  converRowToRowIndex,
} from 'helpers/boardHelpers';
import {CellDataType} from 'models/boardModels/Board';
import {
  CommandFlag,
  IBluetoothCommandsService,
} from 'models/services/IBluetoothCommandsService';

export class BluetoothCommandsService implements IBluetoothCommandsService {
  private convertCellDataToString = (cellData: CellDataType): string => {
    return `${cellData.cellRGBColor}_${converRowToRowIndex(
      cellData.row,
    )}_${converColumnToColummnIndex(cellData.column)}`;
  };

  private convertCommandFlagToString = (flag: CommandFlag) => {
    switch (flag) {
      case 'reset':
        return 'r';
    }
  };

  private addFlags = (commandString: string, flags: CommandFlag[]): void => {
    let flagsString = '%';
    flags.forEach(flag => {
      flagsString += this.convertCommandFlagToString(flag);
    });
    commandString += flagsString;
  };

  public convertCellState = (
    cellState: CellDataType | CellDataType[],
    flags?: CommandFlag[],
  ) => {
    let returnCommandString = '';
    if (Array.isArray(cellState)) {
      cellState.map((item, index) => {
        const isTheLast = index === cellState.length - 1;
        returnCommandString += this.convertCellDataToString(item);
        if (!isTheLast) {
          returnCommandString += ';';
        }
      });
    } else {
      returnCommandString += this.convertCellDataToString(cellState);
    }

    if (flags && flags.length > 0) {
      this.addFlags(returnCommandString, flags);
    }

    return returnCommandString;
  };
}
