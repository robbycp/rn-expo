# rn-expo

nx template and create react native apps template

# Guide

## Generate Base64 google service

1. Add your google services in root directory
2. Run this and copy the Base64 value to .env

```bash
node ./scripts/generate-base64-google-service.js
```

3. Run this to check if your env is generating the correct google service JSON

```bash
node ./check-base64-google-service.js
```
