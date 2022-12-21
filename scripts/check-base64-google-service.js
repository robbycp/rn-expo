require('dotenv').config()
const fs = require('fs')

const isDev = process.env.ENVIRONMENT === 'dev'

// Generate google service file
const googleIosValue = Buffer.from(
  isDev
    ? process.env.FIREBASE_GOOGLE_SERVICE_IOS_BASE64_DEV
    : process.env.FIREBASE_GOOGLE_SERVICE_IOS_BASE64,
  'base64'
)
const googleAndroidValue = Buffer.from(
  isDev
    ? process.env.FIREBASE_GOOGLE_SERVICE_ANDROID_BASE64_DEV
    : process.env.FIREBASE_GOOGLE_SERVICE_ANDROID_BASE64,
  'base64'
)
// Checking value
fs.writeFileSync('./google-services.result.json', googleAndroidValue)
fs.writeFileSync('./GoogleService-Info.result.plist', googleIosValue)