import React from 'react';
import {View} from 'react-native';

import Labels from 'components/atoms/Labels';
import {styles} from './styles';
import {convertTimeInSecondsForHours} from 'helpers/utils/timeUtils';

export interface TimerProps {
  timeInSeconds: number;
}

const Timer = (props: TimerProps) => {
  const timeObject = convertTimeInSecondsForHours(props.timeInSeconds);
  const seconds = timeObject.seconds.toString().padStart(2, '0');
  const minutes = timeObject.minutes.toString().padStart(2, '0');
  const hours = timeObject.hours.toString().padStart(2, '0');
  return (
    <View style={styles.timerContainer}>
      {timeObject.hours > 0 && (
        <Labels.NormalText>{hours} : </Labels.NormalText>
      )}
      <Labels.NormalText>{minutes} : </Labels.NormalText>
      <Labels.NormalText>{seconds}</Labels.NormalText>
    </View>
  );
};

export default Timer;
