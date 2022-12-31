import dotenv from 'dotenv';
import {ExpoConfig} from '@expo/config-types';
import {appVersion, androidVersionCode, runtimeVersion} from './version.json';
dotenv.config();

enum Environment {
  dev = 'dev',
  staging = 'staging',
  preProduction = 'pre-production',
  production = 'production',
}

const environment = (process.env.ENVIRONMENT as Environment) || 'dev';
const appName = 'RN Expo';
const suffixVersion =
  environment !== Environment.production ? `-${environment}` : '';

const defaultConfig: Omit<ExpoConfig, 'name'> = {
  description: 'RN Expo app boilerplate',
  slug: 'rn-expo-template',
  version: `${appVersion}${suffixVersion}`,
  orientation: 'portrait',
  icon: './src/assets/images/app-icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    url: process.env.EAS_UPDATE_URL,
    fallbackToCacheTimeout: 0,
  },
  runtimeVersion,
  assetBundlePatterns: ['**/*'],
  ios: {
    googleServicesFile: './GoogleService-Info.plist',
    supportsTablet: true,
    buildNumber: appVersion,
  },
  android: {
    googleServicesFile: './google-services.json',
    adaptiveIcon: {
      foregroundImage: './src/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    versionCode: androidVersionCode,
  },
  web: {
    favicon: './src/assets/images/logo.png',
  },
  jsEngine: 'hermes',
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          enableProguardInReleaseBuilds: true,
        },
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
    'sentry-expo',
    [
      'expo-tracking-transparency',
      {
        userTrackingPermission:
          'This identifier will be used to deliver personalized ads to you.',
      },
    ],
    [
      'onesignal-expo-plugin',
      {
        mode: 'development',
      },
    ],
    '@react-native-firebase/app',
    '@react-native-firebase/perf',
    '@react-native-firebase/crashlytics',
    '@react-native-firebase/auth',
    '@react-native-google-signin/google-signin',
  ],
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
      },
    ],
  },
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
    // # Configuration
    API_URL: process.env.API_URL,
    ENVIRONMENT: environment,

    // # Storybook
    LOAD_STORYBOOK: process.env.LOAD_STORYBOOK,

    // ## Third Party Apps
    // # Firebase
    FIREBASE_REMOTE_CONFIG_CACHE_TIME:
      process.env.FIREBASE_REMOTE_CONFIG_CACHE_TIME,
    // # Sentry
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  },
};
const devConfig: Omit<ExpoConfig, 'slug'> = {
  name: `${appName} (DEV)`,
  ios: {
    bundleIdentifier: process.env.IOS_BUNDLE_IDENTIFIER_DEV,
  },
  scheme: 'rnexpodev',
  android: {
    package: process.env.ANDROID_PACKAGE_DEV,
  },
  extra: {
    ONE_SIGNAL_ID: process.env.ONE_SIGNAL_ID_DEV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID_DEV,
    GOOGLE_REVERSED_CLIENT_ID: process.env.GOOGLE_REVERSED_CLIENT_ID_DEV,
  },
};
const stagingConfig: Omit<ExpoConfig, 'slug'> = {
  ...devConfig,
  name: `${appName} Staging`,
};
const prodConfig: Omit<ExpoConfig, 'slug'> = {
  name: appName,
  scheme: 'rnexpo',
  ios: {
    bundleIdentifier: process.env.IOS_BUNDLE_IDENTIFIER,
  },
  android: {
    package: process.env.ANDROID_PACKAGE,
  },
  extra: {
    ONE_SIGNAL_ID: process.env.ONE_SIGNAL_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_REVERSED_CLIENT_ID: process.env.GOOGLE_REVERSED_CLIENT_ID,
  },
};
const preProdConfig: Omit<ExpoConfig, 'slug'> = {
  ...prodConfig,
  name: `${appName} PreProd`,
};

const configs = {
  [Environment.dev]: devConfig,
  [Environment.staging]: stagingConfig,
  [Environment.preProduction]: preProdConfig,
  [Environment.production]: prodConfig,
};
const selectedConfig = configs[environment];

module.exports = {
  expo: {
    ...defaultConfig,
    ...selectedConfig,
    ios: {
      ...defaultConfig.ios,
      ...selectedConfig.ios,
    },
    android: {
      ...defaultConfig.android,
      ...selectedConfig.android,
    },
    extra: {
      ...defaultConfig.extra,
      ...selectedConfig.extra,
    },
  },
};
