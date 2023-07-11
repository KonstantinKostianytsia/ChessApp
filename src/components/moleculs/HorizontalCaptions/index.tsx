import React from 'react';
import {View} from 'react-native';

import BoardCaption from 'components/atoms/BoardCaption';
import {getColumnsCaptionContainerStyles} from './styles';

export interface HorizontalCaptionsProps {
  captions: Array<string>;
  isTop: boolean;
}

const HorizontalCaptions = (props: HorizontalCaptionsProps) => {
  return (
    <View style={getColumnsCaptionContainerStyles(props.isTop)}>
      {props.captions.map(item => (
        <BoardCaption caption={item} />
      ))}
    </View>
  );
};

export default HorizontalCaptions;
