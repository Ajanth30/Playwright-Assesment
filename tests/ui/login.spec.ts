import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

const VALID_USER = 'John Doe';
const VALID_PASSWORD = 'ThisIsNotAPassword';

test.describe('CURA Healthcare - Login', () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.openLogin();
  });

  test('@smoke @ui positive login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithRetry(VALID_USER, VALID_PASSWORD);

    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    await expect(page).toHaveURL(/#appointment|profile\.php#profile/);
  });

  test('@ui negative login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(VALID_USER, 'WrongPassword!');

    await expect(
      page.getByText('Login failed', { exact: false }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).not.toBeVisible();
  });

  test('@ui negative login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginButton.click();

    await expect(page.getByRole('link', { name: 'Logout' })).not.toBeVisible();
    await expect(page.locator('#txt-username')).toBeVisible();
  });
});
