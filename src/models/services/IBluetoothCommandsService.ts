import {CellDataType, UpdateCellState} from 'models/boardModels/Board';

export interface IBluetoothCommandsService {
  /*
   *   Reset flag will clear all board and will set colors that you have passed
   */
  convertCellState: (
    cellState: CellDataType[] | CellDataType,
    flags?: CommandFlag[],
  ) => string;
  parseBoardFigureState: (boardStateStr: string) => Array<UpdateCellState>;
}

export type CommandFlag = 'reset';
