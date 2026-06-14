import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './api-client';

export type AuthTokenResponse = {
  token: string;
};

export async function loginAndGetToken(
  request: APIRequestContext,
  username: string,
  password: string,
): Promise<string> {
  const client = new ApiClient(request);
  const response = await client.post('/auth/login', { username, password });

  if (!response.ok()) {
    throw new Error(
      `Login failed with status ${response.status()}: ${await response.text()}`,
    );
  }

  const body = await ApiClient.parseJson<AuthTokenResponse>(response);
  if (!body.token) {
    throw new Error('Login response did not include a token');
  }
  return body.token;
}
