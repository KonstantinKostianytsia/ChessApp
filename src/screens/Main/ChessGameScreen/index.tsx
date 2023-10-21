import React, {useEffect, useRef} from 'react';
import {Dimensions, View} from 'react-native';
import {Observer} from 'mobx-react';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';

import ChessBoard from 'components/organizms/ChessBoard';
import BackgroundColor from 'components/atoms/BackgroundColor';
import {
  useBluetoothDevicesStore,
  useChessEngineStore,
  useChessGameStore,
} from 'helpers/hooks/useStore';
import styles from './styles';
import {useTheme} from 'helpers/hooks/useTheme';
import {BOARD_CELLS_PADDINGS} from 'constants/BoardConstants';
import {Row} from 'models/boardModels/Row';
import {Column} from 'models/boardModels/Column';
import {IBluetoothCommandsService} from 'models/services/IBluetoothCommandsService';
import {BluetoothCommandsService} from 'services/BluetoothCommandsService';
import {CellDataType} from 'models/boardModels/Board';
import {ChessMoveError} from 'models/errors/ChessMoveError';
import {usePrevious} from 'helpers/hooks/usePrevious';
import {autorun} from 'mobx';
import {IChessMove} from 'models/services/IChessBoardAnalyzer';
import {ChessFigureColor} from 'models/boardModels/ChessFigure';
import Labels from 'components/atoms/Labels';

const dimensions = Dimensions.get('window');

const BOARD_MARGIN_HORIZONTAL = 20;
const BOARD_SIZE = dimensions.width - BOARD_MARGIN_HORIZONTAL;

const ChessGameScreen = () => {
  useKeepAwake();

  const chessGameStore = useChessGameStore();
  const bluetoothStore = useBluetoothDevicesStore();
  const chessEngineStore = useChessEngineStore();
  const theme = useTheme();

  const prevShownError = useRef<IChessMove | null>(null);

  const bluetoothMessageFormatter: IBluetoothCommandsService =
    new BluetoothCommandsService();

  useEffect(() => {
    try {
      const removeListener = bluetoothStore.setOnBoardStateMessage(
        updateCellsState => {
          try {
            chessGameStore.onNewBoardStateMessage(updateCellsState);
          } catch (err) {
            handleError(err);
          }
        },
      );

      return () => {
        removeListener.remove();
      };
    } catch (err) {
      console.warn(err);
    }
  }, []);

  useEffect(() => {
    chessEngineStore
      .setChessEngineListener(move => {
        changeCellsColor([
          {
            ...move.startPos,
            cellRGBColor: theme.colors.cellValidStateColor,
          },
          {
            ...move.finishPos,
            cellRGBColor: theme.colors.cellHintStateColor,
          },
        ]);
      })
      .then(removeListener => {
        return () => {
          chessEngineStore.shutdownEngine();
          removeListener.remove();
        };
      });
  }, []);

  useEffect(() => {
    const disposer = autorun(() => {
      if (chessGameStore.whoseTurn === ChessFigureColor.Black) {
        chessEngineStore.findBestMove(chessGameStore.getCurrentFenState());
      } else {
        if (chessEngineStore.lastBestMove) {
          changeCellsColor([
            {
              ...chessEngineStore.lastBestMove.startPos,
              cellRGBColor: undefined,
            },
            {
              ...chessEngineStore.lastBestMove.finishPos,
              cellRGBColor: undefined,
            },
          ]);
        }
      }
    });
    return disposer;
  }, []);

  /// Disables error cells
  useEffect(() => {
    const disposer = autorun(() => {
      if (chessGameStore.shownErrorMoves === null && prevShownError.current) {
        changeCellsColor([
          {
            ...prevShownError.current?.startPos,
            cellRGBColor: undefined,
          },
          {
            ...prevShownError.current?.finishPos,
            cellRGBColor: undefined,
          },
        ]);
      }
      prevShownError.current = chessGameStore.shownErrorMoves;
    });
    return disposer;
  }, []);

  const handleError = (err: unknown) => {
    if (err instanceof ChessMoveError) {
      changeCellsColor([
        {
          ...err.wrongMove.startPos,
          cellRGBColor: theme.colors.cellValidStateColor,
        },
        {
          ...err.wrongMove.finishPos,
          cellRGBColor: theme.colors.cellErrorStateColor,
        },
      ]);
      chessGameStore.setErrorMove(err.wrongMove);
    }
  };

  const changeCellsColor = (cellData: CellDataType[]) => {
    bluetoothStore.sendMessageToConnectedDevice(
      bluetoothMessageFormatter.convertCellState(cellData),
    );
  };

  const renderBoard = () => {
    const onPressCell = (row: Row, column: Column) => {
      console.log('TEST');
    };
    return (
      <ChessBoard
        boardSize={BOARD_SIZE - 2 * BOARD_CELLS_PADDINGS}
        onPressCell={onPressCell}
        boardState={chessGameStore.chessBoardState}
      />
    );
  };

  return (
    <Observer>
      {() => (
        <BackgroundColor
          containerStyles={styles.backgroundStyles}
          backgroundColor={theme.colors.lightGrey}>
          <>
            {chessEngineStore.isFindingBestWay && (
              <Labels.MediumText>
                The Engine searching for best move
              </Labels.MediumText>
            )}
            <View
              style={{
                height: BOARD_SIZE,
                width: BOARD_SIZE,
              }}>
              {renderBoard()}
            </View>
          </>
        </BackgroundColor>
      )}
    </Observer>
  );
};

export default ChessGameScreen;
