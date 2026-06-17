import { test, expect } from '../fixtures/merged-fixtures';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { AppointmentPage } from '../../pages/AppointmentPage';
import { ApiClient } from '../../utils/api-client';

const VALID_USER = 'John Doe';
const VALID_PASSWORD = 'ThisIsNotAPassword';

test.describe('E2E - UI flow with API validation', () => {
  test('@smoke @e2e login, book appointment, verify API user exists', async ({
    page,
    request,
  }) => {
    // Use jsonplaceholder — a stable public stub — so the smoke test is not
    // coupled to fakestoreapi.com uptime.
    const apiUser = await ApiClient.parseJson<{ id: number }>(
      await request.get('https://jsonplaceholder.typicode.com/users/1'),
    );
    expect(apiUser.id).toBe(1);

    const home = new HomePage(page);
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

    await home.goto();
    await home.goToMakeAppointment();
    await loginPage.loginWithRetry(VALID_USER, VALID_PASSWORD);
    await home.waitForAppointmentForm();
    await appointmentPage.fillAndSubmit({
      comment: `E2E assessment - API user ${apiUser.id} verified`,
    });

    await expect(appointmentPage.confirmationHeading).toBeVisible();
  });

  test('@e2e corner case - invalid appointment date shows validation', async ({
    page,
  }) => {
    const home = new HomePage(page);
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

    await home.goto();
    await home.goToMakeAppointment();
    await loginPage.loginWithRetry(VALID_USER, VALID_PASSWORD);
    await home.waitForAppointmentForm();
    await appointmentPage.fillAndSubmit({ visitDate: 'invalid-date' }, false);

    await expect(appointmentPage.confirmationHeading).not.toBeVisible();
    await expect(appointmentPage.bookAppointmentButton).toBeVisible();
  });
});
