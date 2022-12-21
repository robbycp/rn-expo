import OneSignal from 'react-native-onesignal';
import Constants from "expo-constants";

export const initOneSignal = () => {
  OneSignal.setAppId(Constants.expoConfig?.extra?.ONE_SIGNAL_ID);
}