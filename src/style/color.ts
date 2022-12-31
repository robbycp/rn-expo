import {MD2Colors as Colors, MD3DarkTheme as DarkTheme, DefaultTheme} from 'react-native-paper';

export const customColors = {
  amber50: Colors.amber50,
  amber100: Colors.amber100,
  amber200: Colors.amber200,
  amber300: Colors.amber300,
  amber400: Colors.amber400,
  amber500: Colors.amber500,
  amber600: Colors.amber600,
  amber700: Colors.amber700,
  amber800: Colors.amber800,
  amber900: Colors.amber900,
  black: Colors.black,
  blue50: Colors.blue50,
  blue100: Colors.blue100,
  blue200: Colors.blue200,
  blue300: Colors.blue300,
  blue400: Colors.blue400,
  blue500: Colors.blue500,
  blue600: Colors.blue600,
  blue700: Colors.blue700,
  blue800: Colors.blue800,
  blue900: Colors.blue900,
  blueGrey50: Colors.blueGrey50,
  blueGrey100: Colors.blueGrey100,
  blueGrey200: Colors.blueGrey200,
  blueGrey300: Colors.blueGrey300,
  blueGrey400: Colors.blueGrey400,
  blueGrey500: Colors.blueGrey500,
  blueGrey600: Colors.blueGrey600,
  blueGrey700: Colors.blueGrey700,
  blueGrey800: Colors.blueGrey800,
  blueGrey900: Colors.blueGrey900,
  brown50: Colors.brown50,
  brown100: Colors.brown100,
  brown200: Colors.brown200,
  brown300: Colors.brown300,
  brown400: Colors.brown400,
  brown500: Colors.brown500,
  brown600: Colors.brown600,
  brown700: Colors.brown700,
  brown800: Colors.brown800,
  brown900: Colors.brown900,
  green50: Colors.green50,
  green100: Colors.green100,
  green200: Colors.green200,
  green300: Colors.green300,
  green400: Colors.green400,
  green500: Colors.green500,
  green600: Colors.green600,
  green700: Colors.green700,
  green800: Colors.green800,
  green900: Colors.green900,
  grey50: Colors.grey50,
  grey100: Colors.grey100,
  grey200: Colors.grey200,
  grey300: Colors.grey300,
  grey400: Colors.grey400,
  grey500: Colors.grey500,
  grey600: Colors.grey600,
  grey700: Colors.grey700,
  grey800: Colors.grey800,
  grey900: Colors.grey900,
  orange50: Colors.orange50,
  orange100: Colors.orange100,
  orange200: Colors.orange200,
  orange300: Colors.orange300,
  orange400: Colors.orange400,
  orange500: Colors.orange500,
  orange600: Colors.orange600,
  orange700: Colors.orange700,
  orange800: Colors.orange800,
  orange900: Colors.orange900,
  purple50: Colors.purple50,
  purple100: Colors.purple100,
  purple200: Colors.purple200,
  purple300: Colors.purple300,
  purple400: Colors.purple400,
  purple500: Colors.purple500,
  purple600: Colors.purple600,
  purple700: Colors.purple700,
  purple800: Colors.purple800,
  purple900: Colors.purple900,
  red50: Colors.red50,
  red100: Colors.red100,
  red200: Colors.red200,
  red300: Colors.red300,
  red400: Colors.red400,
  red500: Colors.red500,
  red600: Colors.red600,
  red700: Colors.red700,
  red800: Colors.red800,
  red900: Colors.red900,
  white: Colors.white,
  yellow50: Colors.yellow50,
  yellow100: Colors.yellow100,
  yellow200: Colors.yellow200,
  yellow300: Colors.yellow300,
  yellow400: Colors.yellow400,
  yellow500: Colors.yellow500,
  yellow600: Colors.yellow600,
  yellow700: Colors.yellow700,
  yellow800: Colors.yellow800,
  yellow900: Colors.yellow900,
};

/**
 * Ask designer
 * backdrop: '',
  background: '',
  disabled: '',
  error: '',
  notification: '',
  onSurface: '',
  placeholder: '',
  primary: '',
  surface: '',
  text: '',
 */
const primaryColor = {
  primary: Colors.blueA700,
  accent: Colors.yellow700,
};
export const lightColors = {
  ...DefaultTheme.colors,
  custom: {
    ...customColors,
  },
  ...primaryColor,
};
export const darkColors = {
  ...DarkTheme.colors,
  custom: {
    ...customColors,
  },
  ...primaryColor,
  background: Colors.grey900,
  surface: Colors.grey800,
};

export type CustomColor = typeof customColors;
