import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      'projects/ui-core/vitest.config.ts',
      'projects/ui-charts/vitest.config.ts',
    ],
  },
});