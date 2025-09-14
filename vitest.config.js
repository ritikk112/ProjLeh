// vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',       // use browser-like DOM for testing
    globals: true,              // allow global test functions like describe/it
    setupFiles: './src/tests/setupTests.js', // run this before tests
    include: ['src/**/*.test.{js,jsx,ts,tsx}', 'src/tests/**/*.test.{js,jsx}','src/tests/**/*.spec.{js,jsx}','src/tests/**/*.test.jsx','src/tests/**/*.test.js'],
  },
})
