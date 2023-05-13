import {createContext} from 'react';

import {IImages} from 'models/styles/IImages';
import {ThemeMode} from 'models/styles/themeMode';
import {lightImages} from './images';
import {IColors} from 'models/styles/IColors';
import {lightColors} from './colors';
import {IThemeContext} from 'models/styles/IThemeContext';

export const getImages = (themeMode: ThemeMode): IImages => {
  switch (themeMode) {
    case ThemeMode.LIGHT:
      return lightImages;
  }
};

export const getColors = (themeMode: ThemeMode): IColors => {
  switch (themeMode) {
    case ThemeMode.LIGHT:
      return lightColors;
  }
};

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);
export const ThemeProvider = ThemeContext.Provider;

export const themeContext: IThemeContext = {
  themeMode: ThemeMode.LIGHT,
};
