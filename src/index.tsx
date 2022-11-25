import React from 'react';
import * as Sentry from 'sentry-expo';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as StoreProvider, useDispatch, useSelector} from 'react-redux';
import {
  Provider as PaperProvider,
  Snackbar,
  useTheme,
} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {StatusBar, useColorScheme} from 'react-native';
import {useReduxDevToolsExtension} from '@react-navigation/devtools';
import {QueryClient, QueryClientProvider} from 'react-query';

import {initOneSignal} from '~/services/notificationOneSignal'
import {CustomErrorBoundary} from '~/utils/errorHandler';
import RootNavigator from '~/navigation/RootNavigator';
import {navigationRef} from '~/navigation/navigator';
import configureStore from '~/store';
import {RNDarkTheme, RNLightTheme, darkTheme, lightTheme} from '~/style/theme';
import {routingInstrumentation} from '~/utils/errorHandler';
import {fetchRemoteConfig} from '~/services/firebaseRemoteConfig';
import {initialAnalytics, logScreen} from '~/services/firebaseAnalytics';
import {setInAppMessaging} from '~/services/firebaseInAppMessaging';
import {appNavigationReady} from '~/store/slices/app';
import {getSnackbarState, snackbarHide} from '~/store/slices/snackbar';
import linking from '~/navigation/linking';
import '~/translations';

const {persistor, store} = configureStore();

initOneSignal();

setInAppMessaging(true);

fetchRemoteConfig();

initialAnalytics();

const queryClient = new QueryClient();

const AppSnackbar = () => {
  const dispatch = useDispatch();
  const scheme = useColorScheme();
  const theme = useTheme();
  const routeNameRef = React.useRef<string | undefined>('');
  const snackbar = useSelector(getSnackbarState);
  const onDismissSnackBar = () => dispatch(snackbarHide());

  let backgroundColor = null;
  if (snackbar.type === 'error') {
    backgroundColor = theme.colors.error;
  } else if (snackbar.type === 'success') {
    backgroundColor = theme.colors.custom.green400;
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer
        linking={linking}
        theme={scheme === 'dark' ? RNDarkTheme : RNLightTheme}
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.getCurrentRoute()?.name;
          routingInstrumentation.registerNavigationContainer(navigationRef);
          dispatch(appNavigationReady());
        }}
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName) {
            logScreen(currentRouteName);
          }
          routeNameRef.current = currentRouteName;
        }}>
        <StatusBar barStyle="dark-content" />
        <RootNavigator />
        <Snackbar
          visible={snackbar.isVisible}
          onDismiss={onDismissSnackBar}
          duration={snackbar.duration}
          style={backgroundColor ? {backgroundColor} : {}}
          action={{
            label: snackbar.textButton,
            onPress: onDismissSnackBar,
          }}>
          {snackbar.message}
        </Snackbar>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const App = () => {
  useReduxDevToolsExtension(navigationRef);
  const scheme = useColorScheme();
  return (
    <CustomErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <StoreProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
              <AppSnackbar />
            </PaperProvider>
          </PersistGate>
        </StoreProvider>
      </QueryClientProvider>
    </CustomErrorBoundary>
  );
};

export default Sentry.Native.wrap(App);
