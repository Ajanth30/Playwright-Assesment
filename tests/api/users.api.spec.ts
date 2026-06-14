import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api-client';
import { loginAndGetToken } from '../../utils/auth';

test.describe('FakeStore API - Users CRUD', () => {
  test('@smoke @api GET user by id returns 200 and expected fields', async ({
    request,
  }) => {
    const client = new ApiClient(request);
    const response = await client.get('/users/1');

    expect(response.status()).toBe(200);
    const body = await ApiClient.parseJson<{
      id: number;
      email: string;
      username: string;
    }>(response);
    expect(body.id).toBe(1);
    expect(body.email).toBeTruthy();
    expect(body.username).toBeTruthy();
  });

  test('@api GET out-of-range user id returns 200 with null body (mock API)', async ({
    request,
  }) => {
    const client = new ApiClient(request);
    const response = await client.get('/users/999999');
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text.trim()).toBe('null');
  });

  test('@api GET invalid user id format returns 400', async ({ request }) => {
    const client = new ApiClient(request);
    const response = await client.get('/users/abc');
    expect(response.status()).toBe(400);
    const body = await ApiClient.parseJson<{ status: string }>(response);
    expect(body.status).toBe('error');
  });

  test('@api POST create user returns 201 with new id (mock API)', async ({
    request,
  }) => {
    const client = new ApiClient(request);
    const payload = {
      email: `playwright.${Date.now()}@example.com`,
      username: `pw_user_${Date.now()}`,
      password: 'TestPass123',
      name: { firstname: 'Play', lastname: 'Wright' },
    };

    const response = await client.post('/users', payload);
    expect(response.status()).toBe(201);
    const body = await ApiClient.parseJson<{ id: number }>(response);
    expect(body.id).toBeGreaterThan(0);
  });

  test('@api POST minimal body still accepted by mock API', async ({ request }) => {
    const client = new ApiClient(request);
    const response = await client.post('/users', { username: 'only_username' });
    expect(response.status()).toBe(201);
  });

  test('@api PUT update existing user', async ({ request }) => {
    const client = new ApiClient(request);
    const response = await client.put('/users/1', {
      email: 'updated@example.com',
      username: 'updated_user',
    });
    expect(response.status()).toBe(200);
    const body = await ApiClient.parseJson<{ email: string }>(response);
    expect(body.email).toBe('updated@example.com');
  });

  test('@api DELETE user returns deleted id', async ({ request }) => {
    const client = new ApiClient(request);
    const userId = 1;

    const getResponse = await client.get(`/users/${userId}`);
    expect(getResponse.status()).toBe(200);

    const deleteResponse = await client.delete(`/users/${userId}`);
    expect(deleteResponse.status()).toBe(200);
    const deleted = await ApiClient.parseJson<{ id: number } | null>(
      deleteResponse,
    );
    expect(deleted).not.toBeNull();
    expect(deleted!.id).toBe(userId);
  });

  test('@api authentication login returns bearer token', async ({ request }) => {
    const username = process.env.API_USERNAME ?? 'johnd';
    const password = process.env.API_PASSWORD ?? 'm38rmF$';
    const token = await loginAndGetToken(request, username, password);
    expect(token.length).toBeGreaterThan(10);
  });

  test('@api login with invalid credentials returns 401', async ({ request }) => {
    const client = new ApiClient(request);
    const response = await client.post('/auth/login', {
      username: 'johnd',
      password: 'not-the-password',
    });
    expect(response.status()).toBe(401);
  });

  test('@api authenticated request uses Authorization header', async ({
    request,
  }) => {
    const username = process.env.API_USERNAME ?? 'johnd';
    const password = process.env.API_PASSWORD ?? 'm38rmF$';
    const token = await loginAndGetToken(request, username, password);
    const client = new ApiClient(request, token);

    const response = await client.get('/users/1');
    expect(response.ok()).toBeTruthy();
  });
});
