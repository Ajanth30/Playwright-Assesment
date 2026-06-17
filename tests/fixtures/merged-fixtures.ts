import { test as base, request as playwrightRequest } from '@playwright/test';
import { ApiClient } from '../../utils/api-client';
import { loginAndGetToken } from '../../utils/auth';

const apiBaseUrl = process.env.BASE_URL ?? 'https://fakestoreapi.com';

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
