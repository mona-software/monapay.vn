import { defineConfig, devices } from "@playwright/test";

const BASE_URL = (process.env.BASE_URL || "http://localhost:4321").replace(/\/+$/, "");
const useLocal = /localhost|127\.0\.0\.1/.test(BASE_URL);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results",
  use: { baseURL: BASE_URL, trace: "on-first-retry", screenshot: "only-on-failure" },
  // Test cục bộ: tự build + astro preview phục vụ dist. Trỏ BASE_URL=https://monapay.vn để test bản live.
  webServer: useLocal
    ? { command: "npm run build && npm run preview", url: BASE_URL, reuseExistingServer: true, timeout: 120_000 }
    : undefined,
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
