#!/bin/bash

pnpm build
npx cap init
npx cap add android
npx cap copy
cd android
./gradlew bundleRelease

