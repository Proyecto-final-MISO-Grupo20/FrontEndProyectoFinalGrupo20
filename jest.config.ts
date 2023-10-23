import { getJestProjects } from '@nx/jest';

export default {
  projects: getJestProjects(),
  transformIgnorePatterns: 'node_modules/',
  preset: 'ts-jest',
};
