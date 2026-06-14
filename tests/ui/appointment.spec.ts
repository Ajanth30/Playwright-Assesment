import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { AppointmentPage } from '../../pages/AppointmentPage';

const VALID_USER = 'John Doe';
const VALID_PASSWORD = 'ThisIsNotAPassword';

test.describe('CURA Healthcare - Make Appointment', () => {
  test('@smoke @ui book appointment after successful login', async ({ page }) => {
    const home = new HomePage(page);
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

    await home.goto();
    await home.goToMakeAppointment();
    await loginPage.loginWithRetry(VALID_USER, VALID_PASSWORD);
    await home.waitForAppointmentForm();

    await appointmentPage.fillAndSubmit();

    await expect(page.getByText('Hongkong CURA Healthcare Center').first()).toBeVisible();
  });
});
