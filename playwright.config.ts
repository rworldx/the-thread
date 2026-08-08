import { defineConfig, devices } from "@playwright/test";

/**
 * Runs against the PRODUCTION build, not the dev server — the 320px floor has
 * to hold in what actually ships, and dev-only helpers must not influence it.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
  },

  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],

  webServer: {
    command: "npx next start --port 3100",
    url: "http://127.0.0.1:3100",
    /**
     * NEVER reuse, not even locally.
     *
     * The default `!process.env.CI` bit us: a long-running `next start` from an
     * earlier build was reused, so the suite measured output that no longer
     * existed and reported two alternation failures against a layout that was
     * actually correct. A test run that silently grades a stale build is worse
     * than a slow one — the whole point of these is to be trustworthy about
     * what shipped.
     */
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
