module.exports = {
  expo: {
    name: "rn-expo-template",
    slug: "rn-expo-template",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/images/favicon.png"
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
    plugins: [
      "sentry-expo",
      [
        "expo-tracking-transparency",
        {
          userTrackingPermission: "This identifier will be used to deliver personalized ads to you."
        }
      ],
      [
        "expo-notifications",
        {
          "icon": "./local/assets/notification-icon.png",
          "color": "#ffffff",
          "sounds": [
            "./local/assets/notification-sound.wav",
            "./local/assets/notification-sound-other.wav"
          ]
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "e8b6021c-59c3-46e6-a436-f4afd8aab48e",
      },
      // # Configuration
      API_URL: process.env.API_URL,
      ENVIRONMENT: process.env.ENVIRONMENT,
      WITH_APP_VERSION_CHECK: process.env.WITH_APP_VERSION_CHECK,
  
      // # Storybook
      LOAD_STORYBOOK: process.env.LOAD_STORYBOOK,
  
      // ## Third Party Apps
      // # Admob
      ADMOB_ID_ANDROID: process.env.ADMOB_ID_ANDROID,
      ADMOB_ID_IOS: process.env.ADMOB_ID_IOS,
      // # Firebase
      FIREBASE_REMOTE_CONFIG_CACHE_TIME: process.env.FIREBASE_REMOTE_CONFIG_CACHE_TIME,
      // # Google Signin
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_REVERSED_CLIENT_ID: process.env.GOOGLE_REVERSED_CLIENT_ID,
      // # OneSignal
      ONE_SIGNAL_ID: process.env.ONE_SIGNAL_ID,
      // # Sentry
      SENTRY_ORG: process.env.SENTRY_ORG,
      SENTRY_PROJECT: process.env.SENTRY_PROJECT,
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    }
  }
}
