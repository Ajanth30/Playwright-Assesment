# Playwright Test Automation Assessment

UI, API, and E2E automation for the training assessment using Playwright (TypeScript).

## Prerequisites

- Node.js LTS
- VS Code (recommended) with Playwright Test extension

## Setup

```bash
cd "Playwright Assesment"
npm install
npx playwright install chromium
cp .env.example .env   # if .env is missing
```

## Run tests

```bash
npm test                 # all projects
npm run test:ui          # CURA UI only
npm run test:api         # FakeStore API only
npm run test:e2e         # E2E (runs API project first due to dependency)
npm run test:smoke       # @smoke tagged tests
npm run test:ui-mode     # Playwright UI mode
npm run report           # open HTML report
```

## Project structure

```
pages/           Page Object Model (CURA)
utils/           API client & auth helpers
fixtures/        JSON test data
tests/ui/        Login & appointment tests
tests/api/       REST API tests
tests/e2e/       UI + API combined flows
tests/fixtures/  Merged Playwright fixtures
docs/            Test case documentation
```

## Configuration

- `playwright.config.ts` – workers, retries, screenshots, video, reporters, projects
- `.env` – `BASE_URL`, `CURA_BASE_URL`, API credentials

## CI/CD

GitHub Actions workflow: `.github/workflows/playwright.yml` (runs on push/PR to main/master).
