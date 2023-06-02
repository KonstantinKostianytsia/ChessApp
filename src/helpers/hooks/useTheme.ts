import {useContext} from 'react';

import {IColors} from 'models/styles/IColors';
import {IImages} from 'models/styles/IImages';
import {getImages, ThemeContext, getColors} from 'styles';

interface IUseTheme {
  images: IImages;
  colors: IColors;
}

export const useTheme = (): IUseTheme => {
  const {themeMode} = useContext(ThemeContext);

  const images = getImages(themeMode);
  const colors = getColors(themeMode);

  return {
    images,
    colors,
  };
};
