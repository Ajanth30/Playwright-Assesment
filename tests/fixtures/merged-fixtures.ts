import { test as base, request as playwrightRequest } from '@playwright/test';
import { ApiClient } from '../../utils/api-client';
import { loginAndGetToken } from '../../utils/auth';

// E2E_API_BASE_URL lets the e2e project use a stable API (jsonplaceholder)
// without affecting the dedicated API tests which still point at fakestoreapi
// via BASE_URL in playwright.config.ts.
const apiBaseUrl =
  process.env.E2E_API_BASE_URL ??
  process.env.BASE_URL ??
  'https://jsonplaceholder.typicode.com';

type MergedFixtures = {
  apiContext: import('@playwright/test').APIRequestContext;
  apiClient: ApiClient;
  authToken: string;
  authenticatedClient: ApiClient;
};

export const test = base.extend<MergedFixtures>({
  apiContext: async ({}, use) => {
    const context = await playwrightRequest.newContext({ baseURL: apiBaseUrl });
    await use(context);
    await context.dispose();
  },

  authToken: async ({ apiContext }, use) => {
    const username = process.env.API_USERNAME ?? 'johnd';
    const password = process.env.API_PASSWORD ?? 'm38rmF$';
    const token = await loginAndGetToken(apiContext, username, password);
    await use(token);
  },

  apiClient: async ({ apiContext }, use) => {
    await use(new ApiClient(apiContext));
  },

  authenticatedClient: async ({ apiContext, authToken }, use) => {
    await use(new ApiClient(apiContext, authToken));
  },
});

export { expect } from '@playwright/test';
