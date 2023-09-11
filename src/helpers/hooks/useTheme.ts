import {useContext} from 'react';

import {IColors} from 'models/styles/IColors';
import {IImages} from 'models/styles/IImages';
import {getImages, ThemeContext, getColors, getSpaceSystem} from 'styles';
import {ISpacingSystem} from 'models/styles/ISpacingSystem';

export interface IUseTheme {
  images: IImages;
  colors: IColors;
  spacingSystem: ISpacingSystem;
}

export const useTheme = (): IUseTheme => {
  const {themeMode} = useContext(ThemeContext);

  const images = getImages(themeMode);
  const colors = getColors(themeMode);
  const spacingSystem = getSpaceSystem();

  return {
    images,
    colors,
    spacingSystem,
  };
};
