require('dotenv').config()

const isDev = process.env.ENVIRONMENT !== 'production'
const appName = 'RN Expo'

const defaultConfig = {
  slug: "rn-expo-template",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./src/assets/images/logo.png",
  scheme: "rnexpotemplate",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./src/assets/images/logo.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  updates: {
    url: process.env.EAS_UPDATE_URL,
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    googleServicesFile: './GoogleService-Info.plist',
    supportsTablet: true
  },
  android: {
    googleServicesFile: './google-services.json',
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/logo.png",
      backgroundColor: "#ffffff"
    }
  },
  web: {
    favicon: "./src/assets/images/logo.png"
  },
  plugins: [
    "sentry-expo",
    [
      "expo-tracking-transparency",
      {
        userTrackingPermission: "This identifier will be used to deliver personalized ads to you."
      }
    ],
    [
      "onesignal-expo-plugin",
      {
        "mode": "development",
      }
    ],
    "@react-native-firebase/app",
    "@react-native-firebase/perf",
    "@react-native-firebase/crashlytics",
    "@react-native-firebase/auth",
    "@react-native-google-signin/google-signin",
  ],
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_AUTH_TOKEN,
        }
      }
    ]
  },
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
    // # Configuration
    API_URL: process.env.API_URL,
    ENVIRONMENT: process.env.ENVIRONMENT,

    // # Storybook
    LOAD_STORYBOOK: process.env.LOAD_STORYBOOK,

    // ## Third Party Apps
    // # Firebase
    FIREBASE_REMOTE_CONFIG_CACHE_TIME: process.env.FIREBASE_REMOTE_CONFIG_CACHE_TIME,
    // # Sentry
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  }
}
const devConfig = {
  name: `${appName} (DEV)`,
  ios: {
    bundleIdentifier: process.env.IOS_BUNDLE_IDENTIFIER_DEV,
  },
  android: {
    package: process.env.ANDROID_PACKAGE_DEV,
  },
  client: [
    {
      api_key: [
        {
          current_key: process.env.GOOGLE_CLIENT_ID_DEV,
        }
      ],
    }
  ],
  extra: {
    ONE_SIGNAL_ID: process.env.ONE_SIGNAL_ID_DEV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID_DEV,
    GOOGLE_REVERSED_CLIENT_ID: process.env.GOOGLE_REVERSED_CLIENT_ID_DEV,
  },
}
const prodConfig = {
  name: appName,
  ios: {
    bundleIdentifier: process.env.IOS_BUNDLE_IDENTIFIER,
  },
  android: {
    package: process.env.ANDROID_PACKAGE,
  },
  client: [
    {
      api_key: [
        {
          current_key: process.env.GOOGLE_CLIENT_ID,
        }
      ],
    }
  ],
  extra: {
    ONE_SIGNAL_ID: process.env.ONE_SIGNAL_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_REVERSED_CLIENT_ID: process.env.GOOGLE_REVERSED_CLIENT_ID,
  },
}

module.exports = isDev ? {
  expo: {
    ...defaultConfig,
    ...devConfig,
    ios: {
      ...defaultConfig.ios,
      ...devConfig.ios,
    },
    android: {
      ...defaultConfig.android,
      ...devConfig.android,
    },
    client: [
      ...devConfig.client,
    ],
    extra: {
      ...defaultConfig.extra,
      ...devConfig.extra,
    },
  }
} : {
  expo: {
    ...defaultConfig,
    ...prodConfig,
    ios: {
      ...defaultConfig.ios,
      ...prodConfig.ios,
    },
    android: {
      ...defaultConfig.android,
      ...prodConfig.android,
    },
    client: [
      ...prodConfig.client,
    ],
    extra: {
      ...defaultConfig.extra,
      ...prodConfig.extra,
    },
  }
}
