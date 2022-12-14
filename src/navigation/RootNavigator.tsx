import {TransitionPresets, createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';

import Header from '~/components/basic/Header/Header';
import ScreenCollapsibleBackground from '~/screens/CollapsibleBackground';
import ScreenCollapsibleDefault from '~/screens/CollapsibleDefault';
import ScreenCollapsibleSticky from '~/screens/CollapsibleSticky';
import ScreenCollapsibleSubHeader from '~/screens/CollapsibleSubHeader';
import ScreenFetchApi from '~/screens/FetchApi';
import ScreenFlatListImage from '~/screens/FlatListImage';
import ScreenForm from '~/screens/Form';
import ScreenHome from '~/screens/Home';
import ScreenModalPrivacy from '~/screens/ModalPrivacy';
import ScreenSplash from '~/screens/Splash';
import ScreenTermsCondition from '~/screens/T&C';
import ScreenTabExample from '~/screens/TabExample';
import ScreenWebviewGoogle from '~/screens/WebviewGoogle';
import type {RootStackParamList} from '~/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const HeaderRoute = ({route}: StackHeaderProps) => {
  return <Header title={route.name} />;
};
const HeaderModal = ({route}: StackHeaderProps) => {
  return <Header title={route.name} withBackButton={Platform.OS === 'android'} />;
};

const RootNavigator: React.FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Group
        screenOptions={{
          ...(Platform.OS === 'android'
            ? TransitionPresets.FadeFromBottomAndroid
            : TransitionPresets.DefaultTransition),
          header: HeaderRoute,
        }}>
        <Stack.Screen name="Collapsible Background" component={ScreenCollapsibleBackground} />
        <Stack.Screen name="Collapsible Default" component={ScreenCollapsibleDefault} />
        <Stack.Screen name="Collapsible Sticky" component={ScreenCollapsibleSticky} />
        <Stack.Screen name="Collapsible Subheader" component={ScreenCollapsibleSubHeader} />
        <Stack.Screen name="Fetch Api" component={ScreenFetchApi} />
        <Stack.Screen name="FlatList Image" component={ScreenFlatListImage} />
        <Stack.Screen name="Form" component={ScreenForm} />
        <Stack.Screen name="Home" component={ScreenHome} options={{headerShown: false}} />
        <Stack.Screen name="Splash" component={ScreenSplash} options={{headerShown: false}} />
        <Stack.Screen name="Tabs" component={ScreenTabExample} />
        <Stack.Screen name="Terms Condition" component={ScreenTermsCondition} />
        <Stack.Screen name="Webview Google" component={ScreenWebviewGoogle} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          header: HeaderModal,
        }}>
        <Stack.Screen name="Modal Privacy" component={ScreenModalPrivacy} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigator;
