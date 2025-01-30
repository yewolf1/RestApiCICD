import { defineConfig } from "playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  retries: 1,
  webServer: {
    command: "npm start",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
  },
  reporter: [["list"], ["json", { outputFile: "test-results.json" }]],
});
