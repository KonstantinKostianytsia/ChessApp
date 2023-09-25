import {RANGE_ERROR} from 'constants/ErrorConstants';
import {ITimeObject} from 'models/helpers/utils/ITimeObject';

export const convertTimeInSecondsForHours = (
  timeInSeconds: number,
): ITimeObject => {
  if (timeInSeconds < 0) {
    throw new Error(RANGE_ERROR);
  }
  let time = timeInSeconds;
  const seconds = time % 60;
  time -= seconds;
  const minutes = (time / 60) % 60;
  time -= minutes * 60;
  const hours = time / 3600;
  return {
    seconds,
    minutes,
    hours,
  };
};
