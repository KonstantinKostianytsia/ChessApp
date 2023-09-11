import {DEFAULT_BOARD_SIZE} from 'constants/BoardConstants';
import {
  BoardWithChessFigureState,
  CellWithChessFigureStateType,
} from 'models/boardModels/Board';
import {
  ChessFigure,
  ChessFigureColor,
  ChessFigureType,
} from 'models/boardModels/ChessFigure';
import {
  ChessTransformerValue,
  IChessFigureTransformer,
} from 'models/services/IChessFigureTransformer';

/// Check letters for chess figures here https://blog.chesshouse.com/wp-content/uploads/2017/03/how-to-chess-notation-pieces.jpg
/// lower case letters is 'black' and upper case is 'white'
export class ChessFigureTransformer implements IChessFigureTransformer {
  private mapSymbolToChessFigure(symbol: string): ChessFigure | undefined {
    switch (symbol) {
      case 'k':
        return new ChessFigure(ChessFigureColor.Black, ChessFigureType.King);
      case 'q':
        return new ChessFigure(ChessFigureColor.Black, ChessFigureType.Queen);
      case 'n':
        return new ChessFigure(ChessFigureColor.Black, ChessFigureType.Knight);
      case 'b':
        return new ChessFigure(ChessFigureColor.Black, ChessFigureType.Bishop);
      case 'r':
        return new ChessFigure(ChessFigureColor.Black, ChessFigureType.Rook);
      case 'p':
        return new ChessFigure(ChessFigureColor.Black, ChessFigureType.Pawn);

      case 'K':
        return new ChessFigure(ChessFigureColor.White, ChessFigureType.King);
      case 'Q':
        return new ChessFigure(ChessFigureColor.White, ChessFigureType.Queen);
      case 'N':
        return new ChessFigure(ChessFigureColor.White, ChessFigureType.Knight);
      case 'B':
        return new ChessFigure(ChessFigureColor.White, ChessFigureType.Bishop);
      case 'R':
        return new ChessFigure(ChessFigureColor.White, ChessFigureType.Rook);
      case 'P':
        return new ChessFigure(ChessFigureColor.White, ChessFigureType.Pawn);
      case '.':
      default:
        return undefined;
    }
  }

  private mapChessFigureToSymbol(
    chessBoardState?: CellWithChessFigureStateType,
  ): string {
    if (chessBoardState?.cellChessFigure) {
      let symbol = '.';
      switch (chessBoardState.cellChessFigure.figureType) {
        case ChessFigureType.Bishop:
          symbol = 'b';
          break;
        case ChessFigureType.King:
          symbol = 'k';
          break;
        case ChessFigureType.Knight:
          symbol = 'n';
          break;
        case ChessFigureType.Pawn:
          symbol = 'p';
          break;
        case ChessFigureType.Queen:
          symbol = 'q';
          break;
        case ChessFigureType.Rook:
          symbol = 'r';
          break;
      }
      return chessBoardState.cellChessFigure.color === ChessFigureColor.White
        ? symbol.toUpperCase()
        : symbol;
    } else {
      return '.';
    }
  }
  trasformeStringsToChessBoardState(
    str: ChessTransformerValue,
  ): BoardWithChessFigureState {
    const boardCopy: BoardWithChessFigureState = [];
    for (let row = 0; row < DEFAULT_BOARD_SIZE; ++row) {
      boardCopy.push([]);
      for (let column = 0; column < DEFAULT_BOARD_SIZE; ++column) {
        boardCopy[row].push(undefined);
      }
    }
    for (let row = 0; row < str.length; ++row) {
      const rowData = str[row];
      for (let i = 0; i < rowData.length; ++i) {
        const symbol = rowData[i];
        boardCopy[row][i] = {
          cellChessFigure: this.mapSymbolToChessFigure(symbol),
        };
      }
    }
    return boardCopy;
  }

  convertChessBoardStateToString(
    chessBoardState: BoardWithChessFigureState,
  ): ChessTransformerValue {
    let convertedDataString: ChessTransformerValue = [];
    for (let row = 0; row < chessBoardState.length; ++row) {
      let dataString = '';
      for (let column = 0; column < chessBoardState[row].length; ++column) {
        const item = chessBoardState[row][column];
        dataString += this.mapChessFigureToSymbol(item);
      }
      convertedDataString.push(dataString);
    }
    return convertedDataString;
  }
}
