import React from 'react';

import {useTheme} from 'helpers/hooks/useTheme';
import Labels from 'components/atoms/Labels';
import {StyleProp, TextStyle} from 'react-native';

export interface BoardCaptionProps {
  caption: string;
  styles?: StyleProp<TextStyle>;
}

const BoardCaption = (props: BoardCaptionProps) => {
  const theme = useTheme();
  return (
    <Labels.NormalText style={[{color: theme.colors.textColor}, props.styles]}>
      {props.caption}
    </Labels.NormalText>
  );
};

export default BoardCaption;
