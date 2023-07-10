import {
  CHARACTER_TO_SEPARATE_COMMANDS,
  CHARACTER_TO_SEPARATE_FIELDS,
} from 'constants/CommandsConstants';
import {
  converColumnToColummnIndex,
  converRowToRowIndex,
  convertColumnIndexToColumn,
  convertRowIndexToRow,
} from 'helpers/boardHelpers';
import {CellDataType, UpdateCellState} from 'models/boardModels/Board';
import {
  CommandFlag,
  IBluetoothCommandsService,
} from 'models/services/IBluetoothCommandsService';

export class BluetoothCommandsService implements IBluetoothCommandsService {
  private convertCellDataToString = (cellData: CellDataType): string => {
    return `${cellData.cellRGBColor}_${converRowToRowIndex(
      cellData.row,
    )}${CHARACTER_TO_SEPARATE_FIELDS}${converColumnToColummnIndex(
      cellData.column,
    )}`;
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

  private splitStringByCommands = (commandString: string) => {
    return commandString.split(CHARACTER_TO_SEPARATE_COMMANDS);
  };

  private splitCommandByFields = (commandString: string) => {
    return commandString.split(CHARACTER_TO_SEPARATE_FIELDS);
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
          returnCommandString += CHARACTER_TO_SEPARATE_COMMANDS;
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

  public parseBoardFigureState = (
    boardStateStr: string,
  ): Array<UpdateCellState> => {
    const result: Array<UpdateCellState> = [];
    const commandsArray = this.splitStringByCommands(boardStateStr);
    for (const command of commandsArray) {
      const commandFields = this.splitCommandByFields(command);
      const updateCellStateValue: UpdateCellState = {
        cellCoords: {
          row: convertRowIndexToRow(parseInt(commandFields[0])),
          column: convertColumnIndexToColumn(parseInt(commandFields[1])),
        },
        cellState: {
          cellValue: parseInt(commandFields[2]),
        },
      };
      result.push(updateCellStateValue);
    }

    return result;
  };
}
