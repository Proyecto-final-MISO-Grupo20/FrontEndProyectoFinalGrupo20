import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'group20-frontend',
  webDir: 'dist/group20-frontend',
  server: {
    androidScheme: 'https',
    allowNavigation: [],
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
