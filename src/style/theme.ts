import {
  DefaultTheme as RNDefaultTheme,
  DarkTheme as RNDefaultDarkTheme,
  Theme as RNTheme,
} from '@react-navigation/native';
import {
  configureFonts,
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  useTheme,
} from 'react-native-paper';

import {darkColors, lightColors, md3colors, refColor} from './color';
import component from './component';
import fonts from './fonts';
import layout from './layout';
import metrics from './metrics';
import spacing from './spacing';

const customStyle = {
  component,
  fonts: configureFonts(fonts),
  layout,
  metrics,
  spacing,
};

export type CustomStyle = typeof customStyle;

export const RNLightTheme: RNTheme = {
  dark: false,
  colors: {
    ...RNDefaultTheme.colors,
    primary: lightColors.primary,
    background: lightColors.background,
    card: lightColors.surface,
  },
};

export const RNDarkTheme: RNTheme = {
  dark: true,
  colors: {
    ...RNDefaultDarkTheme.colors,
    primary: darkColors.primary,
    background: darkColors.background,
    card: darkColors.surface,
  },
};

export const RNPaperLightTheme = {
  ...PaperDefaultTheme,
  ...customStyle,
  md3colors: {
    ...md3colors,
    readoOnly: md3colors.readOnly.light,
  },
  refColor,
  colors: {
    ...lightColors,
  },
};

export const RNPaperDarkTheme = {
  ...PaperDarkTheme,
  ...customStyle,
  md3colors: {
    ...md3colors,
    readoOnly: md3colors.readOnly.dark,
  },
  refColor,
  colors: {
    ...darkColors,
  },
};

type AppTheme = typeof RNPaperLightTheme;

export const useAppTheme = () => useTheme<AppTheme>();
