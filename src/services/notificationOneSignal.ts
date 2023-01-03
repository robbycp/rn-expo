import Constants from 'expo-constants';
import OneSignal from 'react-native-onesignal';

export const initOneSignal = () => {
  OneSignal.setAppId(Constants.expoConfig?.extra?.ONE_SIGNAL_ID);
};
