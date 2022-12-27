# rn-expo

NX template and create react native apps template

# Guide

## Versioning

There are four types of build.

- dev: should be built for development using expo-dev-client. So you don't need AndroidStudio or XCode to develop.
- staging: should be built for distribution to all stakeholders. This build is using development env.
- pre-production: should be built for distribution to all stakeholders for checking before uploading to production using production env.
- production: build to be distributed in the app store.

## Generate Base64 google service

1. Add your google services to the root directory
2. Run this and copy the Base64 value to .env

```bash
node ./scripts/generate-base64-google-service.js
```

3. Run this to check if your env is generating the correct google service JSON

```bash
node ./check-base64-google-service.js
```

## Build

1. [Follow](https://docs.expo.dev/build/setup/) this to install eas.
2. Run this in terminal based on environment

```
npm run build:android:dev
npm run build:android:staging
npm run build:android:pre-production
npm run build:android:production
```

## Debugging

### Android

Install adb and run in terminal

```
adb logcat --pid=$(adb shell pidof -s com.example.app)
```

#### Connect over AP mobile [source](https://android.stackexchange.com/a/200342)

1. Connect mobile with USB
2. Run this on terminal

```
adb tcpip 5555
```

3. If using a mobile hotspot, the IP address of the device would be 192.168.43.1 by default.
4. In PC run this. You can disconnect your usb to mobile device

```
adb connect 192.168.43.1:5555
```
