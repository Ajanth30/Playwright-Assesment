import { test, expect } from '../fixtures/merged-fixtures';
import { ApiClient } from '../../utils/api-client';
import positiveData from '../../fixtures/users-positive.json';
import negativeData from '../../fixtures/users-negative.json';

for (const row of positiveData) {
  test(`@api data-driven create user - ${row.id}`, async ({ apiClient }) => {
    const uniquePayload = {
      ...row.payload,
      email: `dd.${Date.now()}@example.com`,
      username: `dd_user_${Date.now()}`,
    };

    const response = await apiClient.post('/users', uniquePayload);
    expect(response.status()).toBe(201);
    const body = await ApiClient.parseJson<{ id: number }>(response);
    expect(body.id).toBeGreaterThan(0);
  });
}

for (const row of negativeData) {
  test(`@api data-driven negative - ${row.id}`, async ({ apiClient, request }) => {
    if (row.method === 'GET') {
      const response = await apiClient.get(row.path!);
      expect(response.status()).toBe(row.expectedStatus);
      return;
    }

    if (row.method === 'LOGIN') {
      const response = await request.post('/auth/login', {
        data: { username: row.username, password: row.password },
        headers: { 'Content-Type': 'application/json' },
      });
      expect(response.status()).toBe(row.expectedStatus);
    }
  });
}

test('@api data-driven with auth fixture', async ({ authenticatedClient }) => {
  const response = await authenticatedClient.get('/users/2');
  expect(response.status()).toBe(200);
});
