import { Locator, Page, expect } from '@playwright/test';

export class HomePage {
  readonly makeAppointmentButton: Locator;
  readonly appointmentFacility: Locator;

  constructor(private readonly page: Page) {
    this.makeAppointmentButton = page.locator('#btn-make-appointment');
    this.appointmentFacility = page.locator('#combo_facility');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openLogin() {
    await this.page.goto('/profile.php#login');
    await this.page.waitForURL(/profile\.php#login/);
  }

  async goToMakeAppointment() {
    await this.makeAppointmentButton.click();
    await this.page.waitForURL(/profile\.php#login|#appointment/);
  }

  async waitForAppointmentForm() {
    await expect(this.appointmentFacility).toBeVisible({ timeout: 20_000 });
  }
}
