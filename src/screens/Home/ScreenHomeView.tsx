import * as Application from 'expo-application';
import Constants from 'expo-constants';
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {Button, Divider, List, Subheading, Switch, Text, Title, useTheme} from 'react-native-paper';
import * as Sentry from 'sentry-expo';

import ClipboardHome from './ClipboardHome';
import HTMLHome from './HTMLHome';
import LanguageOption from './LanguageOption';
import NetworkRead from './NetworkRead';
import {ListFeature, ScreenHomeViewProps} from './ScreenHomeTypes';
import Signin from './Signin';
import SnackbarHome from './SnackbarHome';

import LoadingOverlay from '~/components/basic/Loading/LoadingOverlay';
import VersionApp from '~/components/custom/VersionApp';
import metrics from '~/style/metrics';
import i18n from '~/translations';

type ListItemLeftProps = React.ComponentProps<typeof List.Item>['left'];
const marginVideoPlayer = 16;

const getLeftItem =
  ({position, item}: {position: number; item: ListFeature}): ListItemLeftProps =>
  props =>
    <List.Icon key={`${position}-${item.title}-${item.icon}-icon`} {...props} icon={item.icon} />;

const styles = StyleSheet.create({
  divider: {height: 3},
  videoPlayer: {
    margin: marginVideoPlayer,
    width: metrics.deviceWidth,
  },
});

declare const global: {HermesInternal: null | object};

const ScreenHomeView = ({
  handleShareMessage,
  handleSendWhatsapp,
  isShowFocus,
  listFeatures,
  navigation,
  textFirebaseConfig,
  setisShowFocus,
}: ScreenHomeViewProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLoadingOverlay, setIsLoadingOverlay] = React.useState(false);

  const handleLoadingOverlay = () => {
    setIsLoadingOverlay(true);
    setTimeout(() => {
      setIsLoadingOverlay(false);
    }, 2000);
  };

  const theme = useTheme();

  const usingHermes = !!global.HermesInternal;
  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <LoadingOverlay isVisible={isLoadingOverlay} />
        <View style={[theme.spacing.m16, theme.spacing.p0]}>
          <Title>{i18n.t('home.functionalFeatures')}</Title>
          <Subheading>{i18n.t('home.version')}</Subheading>
          <Text>{Application.nativeApplicationVersion}</Text>
          <Subheading>{i18n.t('home.config')}</Subheading>
          <Text testID="environmentValue">{Constants.expoConfig?.extra?.ENVIRONMENT}</Text>
          <Subheading>{i18n.t('home.firebaseRemoteConfig')}</Subheading>
          <Text>
            {i18n.t('home.firebaseRemoteConfig')} : {textFirebaseConfig.value}
          </Text>
          <Subheading>Hermes</Subheading>
          <Text>{usingHermes ? 'True' : 'False'}</Text>
          <Subheading>{i18n.t('home.shareLink')}</Subheading>
          <Button onPress={handleShareMessage}>{i18n.t('home.shareButton')}</Button>
          <Subheading>{i18n.t('home.authentication')}</Subheading>
          <Signin />
          <Subheading>Render HTML</Subheading>
          <HTMLHome />
          <Subheading>{i18n.t('home.networkRead')}</Subheading>
          <NetworkRead />
          <Subheading>Clipboard</Subheading>
          <ClipboardHome />
          <Subheading>{i18n.t('home.modalPrivacy')}</Subheading>
          <Button onPress={() => navigation.navigate('Modal Privacy')}>
            {i18n.t('home.privacy')}
          </Button>
          <Subheading>{i18n.t('common.loading')} Overlay</Subheading>
          <Button onPress={handleLoadingOverlay}>{i18n.t('common.loading')}</Button>
          <Subheading>Snackbar</Subheading>
          <SnackbarHome />
          <Subheading>Whatsapp</Subheading>
          <Button onPress={handleSendWhatsapp}>{i18n.t('home.whatsappButton')}</Button>
          <Subheading>{i18n.t('home.selectLanguage')}</Subheading>
          <LanguageOption />
          <Subheading>{i18n.t('home.functionalFocus')}</Subheading>
          <Switch value={isShowFocus} onValueChange={() => setisShowFocus(!isShowFocus)} />
          <Subheading>Bismillah OTA versi 2 wina cantik</Subheading>
          <Subheading>{i18n.t('home.performance')}</Subheading>
          <Subheading>{i18n.t('home.error')}</Subheading>
          <Button
            onPress={() => {
              throw new Error('My first Sentry error!');
            }}>
            {i18n.t('home.errorSendJS')}
          </Button>
          <Button
            onPress={() => {
              Sentry.Native.nativeCrash();
            }}>
            {i18n.t('home.errorSendNative')}
          </Button>
          <Title>{i18n.t('home.otherFeature')}</Title>
        </View>
        <View>
          {listFeatures.map((item, position) => (
            <View key={`${position}-${item.title}-${item.icon}-title`}>
              <List.Item
                title={item.title}
                onPress={item.onPress}
                left={getLeftItem({position, item})}
              />
              <Divider key={`${position}-${item.title}-divider`} style={[styles.divider]} />
            </View>
          ))}
        </View>
        <VersionApp />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenHomeView;
