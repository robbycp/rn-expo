# rn-expo

NX template and create react native apps template

# Getting Started

## Set Icon

Follow [this guide](https://docs.expo.dev/guides/app-icons/), use figma template to store app icon, adaptive icon, and splash icon.

# Guide

## Development

There are four types of build.

- dev: should be built for development using expo-dev-client. So you don't need AndroidStudio or XCode to develop.
- staging: should be built for distribution to all stakeholders. This build is using development env.
- pre-production: should be built for distribution to all stakeholders for checking before uploading to production using production env.
- production: build to be distributed in the app store.

### Flow (recommendation)

Version control is based on version.json appVersion and nativeVersion. When we're about to start a new development flow, create a new `/release` branch with an upgraded patch appVersion of version.json. Then create a new branch `/feature` from
a branch `/release` and start development. When development in `/feature` is done and merged to branch `/release`, when about to merge to branch `/main`, adjust version.json appVersion to correct major, minor, or patch version. When a native configuration is changed, add nativeVersion in version.json. In summary

1. Create branch `/release` from `/main`
2. Add patch version in version.json
3. Create branch `/feature` from `/release`
4. Start development in branch `/feature`
5. Merge to branch `/release`
6. If there is another feature just create a branch from `/release` without adjusting version.json
7. Create a pull request from branch `/release` to `/main`
8. Adjust the version in version.json if needed (patch, minor, major).
9. Merge to branch `/main`

### Versioning

We use version.json to control all versions.

- appVersion: version used for apps. It complies with semantic versioning.
- runtimeVersion: version used to be matched when we use the EAS update
- androidVersionCode: version used for android versionCode
  Here are some cases on how to modify all the versions
- We develop a new feature without having to install a new package or change native code. So we only upgrade `appVersion` and `androidVersionCode`
- We develop a new feature that adds a new package or changes native code. So we upgrade `appVersion`, `androidVersionCode`, and `runtimeVersion`

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
2. Run this in your terminal based on the environment you choose

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
4. In PC run this. You can disconnect your USB from your mobile device

```
adb connect 192.168.43.1:5555
```
