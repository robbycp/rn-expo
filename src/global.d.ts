import type {CustomColor} from './style/color';
import type {CustomStyle} from './style/theme';

declare global {
  type HermesInternal = null | object;
  interface window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }

  interface RemoteConfigValue {
    source: string;
    value: string | boolean | number;
  }
  namespace ReactNativePaper {
    interface ThemeColors {
      custom: CustomColor;
    }

    interface Theme extends CustomStyle {}
  }
}

export {};
