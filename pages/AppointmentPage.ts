import { Locator, Page, expect } from '@playwright/test';

export class AppointmentPage {
  readonly facilitySelect: Locator;
  readonly readmissionCheckbox: Locator;
  readonly medicareProgram: Locator;
  readonly visitDateInput: Locator;
  readonly commentInput: Locator;
  readonly bookAppointmentButton: Locator;
  readonly confirmationHeading: Locator;
  readonly calendarDayCells: Locator;

  constructor(private readonly page: Page) {
    this.facilitySelect = page.locator('#combo_facility');
    this.readmissionCheckbox = page.locator('#chk_hospotal_readmission');
    this.medicareProgram = page.locator('#radio_program_medicare');
    this.visitDateInput = page.locator('#txt_visit_date');
    this.commentInput = page.locator('#txt_comment');
    this.bookAppointmentButton = page.locator('#btn-book-appointment');
    this.confirmationHeading = page.getByRole('heading', {
      name: /Appointment Confirm/i,
    });
    this.calendarDayCells = page.locator('td.day:not(.old):not(.new)');
  }

  async pickVisitDateFromCalendar() {
    await this.visitDateInput.click();
    await this.calendarDayCells.first().click();
  }

  async fillAndSubmit(
    options?: {
      facility?: string;
      visitDate?: string;
      comment?: string;
    },
    expectSuccess = true,
  ) {
    const facility = options?.facility ?? 'Hongkong CURA Healthcare Center';
    const comment = options?.comment ?? 'Playwright assessment appointment';

    await this.facilitySelect.selectOption({ label: facility });
    await this.readmissionCheckbox.check({ force: true });
    await this.medicareProgram.check({ force: true });

    if (options?.visitDate) {
      await this.visitDateInput.fill(options.visitDate);
    } else {
      await this.pickVisitDateFromCalendar();
    }

    await this.commentInput.fill(comment);
    await this.bookAppointmentButton.click();
    if (expectSuccess) {
      await expect(this.page).toHaveURL(/appointment\.php#summary/, {
        timeout: 20_000,
      });
      await expect(this.confirmationHeading).toBeVisible();
    }
  }
}
