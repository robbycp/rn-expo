import {useReduxDevToolsExtension} from '@react-navigation/devtools';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Provider as PaperProvider, Snackbar, useTheme} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider as StoreProvider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import * as Sentry from 'sentry-expo';

import RootNavigator from '~/navigation/RootNavigator';
import linking from '~/navigation/linking';
import {navigationRef} from '~/navigation/navigator';
import {initialAnalytics, logScreen} from '~/services/firebaseAnalytics';
import {setInAppMessaging} from '~/services/firebaseInAppMessaging';
import {fetchRemoteConfig} from '~/services/firebaseRemoteConfig';
import {initOneSignal} from '~/services/notificationOneSignal';
import configureStore from '~/store';
import {appNavigationReady, appStartCheck} from '~/store/slices/app';
import {getSnackbarState, snackbarHide} from '~/store/slices/snackbar';
import {RNDarkTheme, RNLightTheme, darkTheme, lightTheme} from '~/style/theme';
import {routingInstrumentation, CustomErrorBoundary} from '~/utils/errorHandler';
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
    <NavigationContainer
      linking={linking}
      theme={scheme === 'dark' ? RNDarkTheme : RNLightTheme}
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
        routingInstrumentation.registerNavigationContainer(navigationRef);
        dispatch(appNavigationReady());
        dispatch(appStartCheck());
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
