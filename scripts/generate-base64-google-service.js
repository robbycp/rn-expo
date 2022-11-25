const fs = require('fs')

// Generate base64 from google service file
const googleAndroid = fs.readFileSync('./google-services.json')
const googleAndroidBase64 = Buffer.from(googleAndroid).toString('base64')
console.log('googleAndroidBase64', googleAndroidBase64)
const googleIos = fs.readFileSync('./GoogleService-Info.plist')
const googleIosBase64 = Buffer.from(googleIos).toString('base64')
console.log('googleIosBase64', googleIosBase64)