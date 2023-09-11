import React from 'react';
import {View} from 'react-native';

import {ChessFigure} from 'models/boardModels/ChessFigure';
import CustomImage from 'components/atoms/CustomImage';
import {getImageOfChessFigure} from 'helpers/ChessFiguresHelpers';
import {useTheme} from 'helpers/hooks/useTheme';

export interface ChessFigureComponentProps {
  figure: ChessFigure;
  size: number;
}

const ChessFigureComponent = (props: ChessFigureComponentProps) => {
  const theme = useTheme();
  const renderFigureImage = () => {
    return (
      <CustomImage
        style={{height: props.size, width: props.size}}
        source={getImageOfChessFigure(theme, props.figure)}
      />
    );
  };
  return <View>{renderFigureImage()}</View>;
};

export default ChessFigureComponent;
