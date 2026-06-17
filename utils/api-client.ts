import { APIRequestContext, APIResponse } from '@playwright/test';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly authToken?: string,
  ) {}

  private headers(extra?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...extra,
    };
    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }
    return headers;
  }

  async get(path: string, options?: { headers?: Record<string, string> }) {
    return this.request.get(path, { headers: this.headers(options?.headers) });
  }

  async post(
    path: string,
    data?: unknown,
    options?: { headers?: Record<string, string> },
  ) {
    return this.request.post(path, {
      headers: this.headers(options?.headers),
      data,
    });
  }

  async put(
    path: string,
    data?: unknown,
    options?: { headers?: Record<string, string> },
  ) {
    return this.request.put(path, {
      headers: this.headers(options?.headers),
      data,
    });
  }

  async patch(
    path: string,
    data?: unknown,
    options?: { headers?: Record<string, string> },
  ) {
    return this.request.patch(path, {
      headers: this.headers(options?.headers),
      data,
    });
  }

  async delete(path: string, options?: { headers?: Record<string, string> }) {
    return this.request.delete(path, {
      headers: this.headers(options?.headers),
    });
  }

  static async parseJson<T>(response: APIResponse): Promise<T> {
    const contentType = response.headers()['content-type'] ?? '';
    if (contentType && !contentType.includes('json')) {
      const body = await response.text();
      throw new Error(
        `Expected JSON but received Content-Type: "${contentType}". ` +
          `Status: ${response.status()}. Body starts with: ${body.slice(0, 300)}`,
      );
    }
    return response.json() as Promise<T>;
  }
}
