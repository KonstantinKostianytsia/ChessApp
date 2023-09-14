import {RANGE_ERROR} from 'constants/ErrorConstants';
import {IRange} from 'models/helpers/utils/IRange';

export const findValueInRanges = (ranges: Array<IRange>, value: number) => {
  for (let i = 0; i < ranges.length; ++i) {
    if (ranges[i].minValue <= value && ranges[i].maxValue >= value) {
      return ranges[i];
    }
  }
  throw Error(RANGE_ERROR);
};
