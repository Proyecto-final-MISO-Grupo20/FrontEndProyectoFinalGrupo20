import { defineConfig } from 'cypress';

export default defineConfig({
  // e2e: nxE2EPreset(__filename, { cypressDir: 'cypress' }),
  e2e: {
    baseUrl: 'http://0.0.0.0:4200',
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
});
