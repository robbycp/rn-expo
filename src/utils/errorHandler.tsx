import {FontAwesome} from '@expo/vector-icons';
import type {FallbackRender} from '@sentry/react';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import React from 'react';
import {Alert, AlertButton, AlertOptions, StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import * as Sentry from 'sentry-expo';

import {removeAsyncStorage} from './asyncStorage';

import {persistConfig} from '~/store';
import i18n from '~/translations';

export const routingInstrumentation = new Sentry.Native.ReactNavigationInstrumentation();

Sentry.init({
  dsn: Constants.expoConfig?.extra?.SENTRY_DSN,
  debug: __DEV__,
  environment: Constants.expoConfig?.extra?.ENVIRONMENT,
  tracesSampleRate: Constants.expoConfig?.extra?.ENVIRONMENT === 'production' ? 0.2 : 1.0,
  enableInExpoDevelopment: true,
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
});

interface ShowAlertInput {
  data: {
    title: string;
    message: string;
    options?: AlertOptions;
  };
  actions: AlertButton[];
}

const restartActions = [
  {
    text: 'Restart',
    onPress: async () => {
      await Updates.reloadAsync();
    },
  },
];

export function showAlert(data: ShowAlertInput['data'], actions: ShowAlertInput['actions']) {
  Alert.alert(data.title, data.message, actions, data.options);
}

export const showAlertRestart = () => {
  showAlert(
    {
      title: i18n.t('errorMessage.fatal.title'),
      message: i18n.t('errorMessage.fatal.message'),
    },
    restartActions,
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    padding: 8,
    flex: 1,
  },
  content: {
    padding: 8,
    flex: 1,
  },
  textInfoIcon: {width: '100%'},
  title: {fontSize: 32},
  description: {marginVertical: 10, lineHeight: 23, fontWeight: '500'},
  buttonRestart: {
    marginVertical: 15,
  },
});

const FallbackComponentError: FallbackRender = ({error}) => {
  const handleBackToSignIn = async () => {
    await removeAsyncStorage(persistConfig.key);
    await Updates.reloadAsync();
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.textInfoIcon}>
            <FontAwesome name="info-circle" size={60} />
          </Text>
          <Text style={styles.title}>Oops, Something Went Wrong</Text>
          <Text style={styles.description}>
            The app ran into a problem and could not continue. We apologise for any inconvenience
            this has caused! Press the button below to restart the app and sign back in. Please
            contact us if this issue persists.
          </Text>
          <Text>{error.name}</Text>
          <Text>{error.message}</Text>
          <Button onPress={() => handleBackToSignIn()} style={styles.buttonRestart}>
            Restart
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
export const CustomErrorBoundary = ({children}: {children: React.ReactNode}) => (
  <Sentry.Native.ErrorBoundary fallback={FallbackComponentError}>
    {children}
  </Sentry.Native.ErrorBoundary>
);
