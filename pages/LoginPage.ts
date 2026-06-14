import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('#txt-username');
    this.passwordInput = page.locator('#txt-password');
    this.loginButton = page.locator('#btn-login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithRetry(username: string, password: string, attempts = 2) {
    let lastError: unknown;
    for (let i = 0; i < attempts; i++) {
      try {
        await this.login(username, password);
        return;
      } catch (error) {
        lastError = error;
        await this.page.waitForTimeout(500);
      }
    }
    throw lastError;
  }
}
