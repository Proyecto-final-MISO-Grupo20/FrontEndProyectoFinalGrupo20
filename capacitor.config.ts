import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.group20.app',
  appName: 'group20-frontend',
  webDir: 'dist/group20-frontend',
  server: {
    androidScheme: 'https',
  },
};

export default config;
