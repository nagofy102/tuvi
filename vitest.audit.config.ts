import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['scripts/tech-audit.test.ts'],
    testTimeout: 1_800_000,
    hookTimeout: 1_800_000,
    fileParallelism: false,
  },
});
