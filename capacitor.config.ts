import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'group20-frontend',
  webDir: 'dist/group20-frontend',
  bundledWebRuntime: false, // Modify as needed
  server: {
    androidScheme: 'http',
    allowNavigation: [],
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
