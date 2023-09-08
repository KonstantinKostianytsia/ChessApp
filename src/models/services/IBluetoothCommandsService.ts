import {CellDataType, UpdateCellState} from 'models/boardModels/Board';

/// Communication with the microcontroller is needed for:
/// 1. Getting sensors values - parseBoardFigureState
/// 2. Changing cells colors - converCellState
/// So such service should not handle figures parsing because it is mobile responsibility only
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
