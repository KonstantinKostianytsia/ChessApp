export interface IFindBestWayParams {
  thinkingTime?: number;
  depth?: number;
}

export interface IChessServiceCommandFormatter {
  commandToSetCurrentPosition(currentPositionFen: string): string;
  commandToFindBestWay(params: IFindBestWayParams): string;
}
