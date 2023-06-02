import {CellDataType} from 'models/boardModels/Board';

export interface IBluetoothCommandsService {
  /*
   *   Reset flag will clear all board and will set colors that you have passed
   */
  convertCellState: (
    cellState: CellDataType[] | CellDataType,
    flags?: CommandFlag[],
  ) => string;
}

export type CommandFlag = 'reset';
