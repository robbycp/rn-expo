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
