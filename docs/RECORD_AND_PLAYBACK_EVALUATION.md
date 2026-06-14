# Record & Playback Evaluation – Session 4

**Student name:** _[Fill in your name]_  
**Date:** _[Fill in date]_

---

## 1. What is Record & Playback?

Playwright **Codegen** (`npx playwright codegen <url>`) records your browser actions and generates test code automatically. This is useful for learning and for quickly capturing a first draft of a test.

**Command used:**
```bash
npx playwright codegen https://katalon-demo-cura.herokuapp.com
```

---

## 2. Pros of Record & Playback

| # | Advantage | Explanation |
|---|-----------|-------------|
| 1 | **Fast to start** | No need to write selectors manually for the first script |
| 2 | **Discovers locators** | Shows which elements Playwright can interact with |
| 3 | **Good for exploration** | Helps understand page flow before designing POM |
| 4 | **Lower learning curve** | Beginners see working code immediately |
| 5 | **Useful for demos** | Quick proof that a flow is automatable |

---

## 3. Cons of Record & Playback

| # | Disadvantage | Explanation |
|---|--------------|-------------|
| 1 | **Brittle selectors** | May capture long CSS/XPath that break on UI changes |
| 2 | **No abstraction** | Same steps repeated in every test |
| 3 | **Hard to maintain** | Large scripts become difficult to update |
| 4 | **Poor readability** | Generated code is verbose and not intention-revealing |
| 5 | **Missing best practices** | No waits, retries, or data-driven design by default |
| 6 | **Strict mode issues** | May click wrong element when multiple matches exist (e.g. two "Login" links) |

---

## 4. Example: Recorded vs refactored

### Before (typical recorded style – simplified example)

```typescript
test('recorded login', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.locator('#txt-username').fill('John Doe');
  await page.locator('#txt-password').fill('ThisIsNotAPassword');
  await page.locator('#btn-login').click();
  // ... more inline steps for appointment ...
});
```

### After (refactored with POM – this project)

```typescript
test('login and book appointment', async ({ page }) => {
  const home = new HomePage(page);
  const loginPage = new LoginPage(page);
  const appointmentPage = new AppointmentPage(page);

  await home.goto();
  await home.goToMakeAppointment();
  await loginPage.loginWithRetry('John Doe', 'ThisIsNotAPassword');
  await home.waitForAppointmentForm();
  await appointmentPage.fillAndSubmit();
});
```

**Improvements:**
- Selectors live in `pages/` — change once, fix everywhere
- `loginWithRetry()` adds basic stability
- `fillAndSubmit()` handles datepicker calendar interaction
- Tests read like business steps, not UI clicks

---

## 5. Error handling added in POM

| Location | Technique | Purpose |
|----------|-----------|---------|
| `LoginPage.loginWithRetry()` | Retry login up to 2 times | Handle flaky clicks |
| `HomePage.openLogin()` | Direct navigation to `/profile.php#login` | Avoid hidden menu link issues |
| `AppointmentPage.pickVisitDateFromCalendar()` | Click calendar day cell | Datepicker does not accept plain `.fill()` |
| `playwright.config.ts` | `retries: 1`, `screenshot: 'only-on-failure'` | Stability and debugging |

---

## 6. XPath practice (relative expressions)

| XPath | Used for |
|-------|----------|
| `//a[@id='btn-make-appointment']` | Make Appointment button |
| `//a[@id='menu-toggle']` | Mobile menu toggle |
| `td.day:not(.old):not(.new)` | Datepicker day cells (CSS in project) |

---

## 7. Personal reflection (fill in after you use codegen)

_[Write 3–5 sentences in your own words about what you learned from recording vs writing POM tests.]_

**Example starter:**  
_"When I used codegen, the script worked for a simple login but failed when the Login link was outside the viewport. After moving logic into page objects and navigating directly to the login URL, tests became more stable and easier to read."_

---

## 8. Screenshot / video evidence for this section

| File name | What to capture |
|-----------|-----------------|
| `screenshots/codegen_recording.png` | Playwright Inspector / codegen window while recording |
| `screenshots/pom_folder_structure.png` | VS Code showing `pages/` folder |
| `videos/04_codegen_demo.mp4` | Short screen recording of codegen session (30–60 sec) |
