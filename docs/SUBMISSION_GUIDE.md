# Step-by-Step Submission Guide – Screenshots & Videos

**Student name:** _[Fill in your name]_

This guide tells you **exactly** what to capture, **how** to capture it, and **what to name** each file. Follow the steps in order.

---

## Before you start

### Step 0.1 – Create your submission folders

Inside your project (or on Desktop), create:

```
submission/
├── screenshots/
├── videos/
└── reports/
```

### Step 0.2 – Fill in your documents

Open each file in `docs/` and add **your name** and **date**:

1. `ASSESSMENT_SUBMISSION_INDEX.md`
2. `TEST_CASES.md`
3. `REST_CONCEPTS.md`
4. `POSTMAN_MANUAL_EXPLORATION.md`
5. `RECORD_AND_PLAYBACK_EVALUATION.md`

### Step 0.3 – Export documents to PDF (optional but recommended)

In VS Code: install "Markdown PDF" extension, or copy content to Word and Save As PDF.

Save as:
- `submission/01_Test_Cases.pdf`
- `submission/02_REST_Concepts.pdf`
- `submission/03_Postman_Exploration.pdf`
- `submission/04_Record_Playback.pdf`
- `submission/05_Submission_Index.pdf`

---

# PART 1 – SCREENSHOTS (15 required + 3 optional)

Use **Windows Snipping Tool** (`Win + Shift + S`) or **Snipping Tool app** → save as PNG.

---

## Section A – Project setup & code structure (3 screenshots)

### Screenshot A1 – Project folder in VS Code

| Item | Detail |
|------|--------|
| **File name** | `screenshots/A1_vscode_project_structure.png` |
| **Steps** | 1. Open VS Code 2. Open folder `Playwright Assesment` 3. Expand folders: `pages`, `tests/ui`, `tests/api`, `tests/e2e`, `utils`, `fixtures`, `docs` 4. Take screenshot of Explorer sidebar |
| **Must show** | Full folder tree with POM and test files visible |
| **Why** | Proves project structure and POM design |

---

### Screenshot A2 – Environment configuration

| Item | Detail |
|------|--------|
| **File name** | `screenshots/A2_env_example.png` |
| **Steps** | 1. Open `.env.example` in editor 2. Screenshot showing BASE_URL, CURA_BASE_URL, API credentials |
| **Must show** | All 4 environment variables |
| **Why** | Session 2 – environment variables requirement |

---

### Screenshot A3 – Playwright config

| Item | Detail |
|------|--------|
| **File name** | `screenshots/A3_playwright_config.png` |
| **Steps** | 1. Open `playwright.config.ts` 2. Scroll to show: `workers`, `retries`, `reporter`, `screenshot`, `video`, `projects` 3. Screenshot |
| **Must show** | At least workers, retries, and screenshot/video settings |
| **Why** | Session 4 & 5 – configuration evidence |

---

## Section B – Test execution in terminal (4 screenshots)

### Screenshot B1 – Install and setup (one-time)

| Item | Detail |
|------|--------|
| **File name** | `screenshots/B1_npm_install.png` |
| **Steps** | 1. Open terminal in project folder 2. Run `npm install` 3. Screenshot when finished |
| **Must show** | Command and successful completion |

---

### Screenshot B2 – Full test run (MOST IMPORTANT)

| Item | Detail |
|------|--------|
| **File name** | `screenshots/B2_all_tests_passed.png` |
| **Steps** | 1. Open terminal 2. Run: `npm test` 3. Wait until finished 4. Screenshot the last lines showing **`20 passed`** |
| **Must show** | `20 passed` and total time |
| **Why** | Main proof all automation works |

**Exact command:**
```bash
cd "c:\Users\AjanthanVignaraja\Downloads\New folder\Playwright Assesment"
npm test
```

---

### Screenshot B3 – Smoke tests only

| Item | Detail |
|------|--------|
| **File name** | `screenshots/B3_smoke_tests.png` |
| **Steps** | 1. Run: `npm run test:smoke` 2. Screenshot results |
| **Must show** | Passed smoke tests with `@smoke` tag |

---

### Screenshot B4 – Separate UI and API runs

| Item | Detail |
|------|--------|
| **File name** | `screenshots/B4_ui_and_api_runs.png` |
| **Steps** | 1. Run `npm run test:ui` – screenshot 2. Run `npm run test:api` – screenshot **OR** combine both in one terminal scroll screenshot |
| **Alternative** | Two files: `B4a_ui_tests.png` and `B4b_api_tests.png` |

---

## Section C – HTML report (4 screenshots)

### Screenshot C1 – Generate the report

| Item | Detail |
|------|--------|
| **Steps** | 1. Run `npm test` (if not already done) 2. Run `npm run report` 3. Browser opens with HTML report |

---

### Screenshot C2 – Report overview

| Item | Detail |
|------|--------|
| **File name** | `screenshots/C2_html_report_overview.png` |
| **Steps** | 1. On report home page 2. Screenshot showing: total tests, passed count, duration, list of spec files |
| **Must show** | All green / all passed |

---

### Screenshot C3 – UI test detail in report

| Item | Detail |
|------|--------|
| **File name** | `screenshots/C3_html_report_ui_test.png` |
| **Steps** | 1. Click on `login.spec.ts` or `appointment.spec.ts` 2. Open one passed test 3. Screenshot showing test steps/timeline |
| **Must show** | Test name and passed status |

---

### Screenshot C4 – API test detail in report

| Item | Detail |
|------|--------|
| **File name** | `screenshots/C4_html_report_api_test.png` |
| **Steps** | 1. Click on `users.api.spec.ts` 2. Open GET user or auth login test 3. Screenshot |
| **Must show** | API test name and passed status |

---

### Optional – Zip HTML report

Copy entire `playwright-report` folder to `submission/reports/playwright-report.zip`

---

## Section D – Postman manual API (8 screenshots)

> Do these **yourself** in Postman. Follow `docs/POSTMAN_MANUAL_EXPLORATION.md` for request details.

### Screenshot D0 – OpenAPI import

| Item | Detail |
|------|--------|
| **File name** | `screenshots/D0_postman_collection.png` |
| **Steps** | 1. Go to https://fakestoreapi.com/docs 2. Import into Postman 3. Screenshot collection/endpoints in sidebar |

---

### Screenshot D1 – GET user

| Item | Detail |
|------|--------|
| **File name** | `screenshots/D1_postman_get_user.png` |
| **URL** | `GET https://fakestoreapi.com/users/1` |
| **Must show** | Status **200**, JSON with `id` and `email` |

---

### Screenshot D2 – POST valid user

| Item | Detail |
|------|--------|
| **File name** | `screenshots/D2_postman_post_valid.png` |
| **URL** | `POST https://fakestoreapi.com/users` |
| **Body** | Valid JSON from `POSTMAN_MANUAL_EXPLORATION.md` |
| **Must show** | Status **201**, response `id` |

---

### Screenshot D3 – POST invalid/minimal body

| Item | Detail |
|------|--------|
| **File name** | `screenshots/D3_postman_post_invalid.png` |
| **Body** | `{ "username": "only_username" }` |
| **Must show** | Status code you received (likely 201 on FakeStore) |

---

### Screenshot D4 – GET invalid id

| Item | Detail |
|------|--------|
| **File name** | `screenshots/D4_postman_get_invalid_id.png` |
| **URL** | `GET https://fakestoreapi.com/users/abc` |
| **Must show** | Status **400**, error message |

---

### Screenshot D5 – Login success

| Item | Detail |
|------|--------|
| **File name** | `screenshots/D5_postman_login_success.png` |
| **URL** | `POST https://fakestoreapi.com/auth/login` |
| **Body** | `{ "username": "johnd", "password": "m38rmF$" }` |
| **Must show** | Status **201**, `token` in body |

---

### Screenshot D6 – Login failure

| Item | Detail |
|------|--------|
| **File name** | `screenshots/D6_postman_login_fail.png` |
| **Body** | Wrong password |
| **Must show** | Status **401** |

---

### Screenshot D7 – DELETE user

| Item | Detail |
|------|--------|
| **File name** | `screenshots/D7_postman_delete_user.png` |
| **URL** | `DELETE https://fakestoreapi.com/users/{id}` |
| **Must show** | Status **200**, deleted `id` |

---

## Section E – CURA UI manual evidence (2 screenshots)

### Screenshot E1 – Successful login in browser

| Item | Detail |
|------|--------|
| **File name** | `screenshots/E1_cura_login_success.png` |
| **Steps** | 1. Open https://katalon-demo-cura.herokuapp.com/profile.php#login 2. Login: John Doe / ThisIsNotAPassword 3. Screenshot showing **Logout** link visible |
| **Alternative** | Run `npm run test:headed -- tests/ui/login.spec.ts` and screenshot browser |

---

### Screenshot E2 – Appointment confirmation

| Item | Detail |
|------|--------|
| **File name** | `screenshots/E2_cura_appointment_confirmed.png` |
| **Steps** | 1. Complete appointment flow manually OR run headed test 2. Screenshot **Appointment Confirmation** page |
| **Command for headed test** | `npx playwright test tests/ui/appointment.spec.ts --headed` |

---

## Section F – Codegen & POM (2 screenshots)

### Screenshot F1 – Playwright codegen

| Item | Detail |
|------|--------|
| **File name** | `screenshots/F1_playwright_codegen.png` |
| **Steps** | 1. Run: `npx playwright codegen https://katalon-demo-cura.herokuapp.com` 2. Perform a few clicks (login page) 3. Screenshot Inspector + generated code panel |

---

### Screenshot F2 – Page Object Model files

| Item | Detail |
|------|--------|
| **File name** | `screenshots/F2_page_object_model.png` |
| **Steps** | 1. Open `pages/LoginPage.ts` and `pages/AppointmentPage.ts` in split editor 2. Screenshot |
| **Must show** | Class-based page objects with locators and methods |

---

## Section G – GitHub & CI/CD (2 screenshots)

### Screenshot G1 – GitHub repository

| Item | Detail |
|------|--------|
| **File name** | `screenshots/G1_github_repo.png` |
| **Steps** | 1. Push project to GitHub 2. Screenshot repo page showing folders: `tests`, `pages`, `docs`, `.github` |
| **Must show** | Repo URL in browser address bar |

---

### Screenshot G2 – GitHub Actions passed

| Item | Detail |
|------|--------|
| **File name** | `screenshots/G2_github_actions_passed.png` |
| **Steps** | 1. Go to repo → **Actions** tab 2. Open latest workflow run 3. Screenshot green checkmark / passed job |
| **Note** | Only possible after you push to GitHub |

---

## Section H – Optional failure artifacts (1–2 screenshots)

Only if you want to show screenshot/video-on-failure config:

1. Temporarily break one assertion in a test
2. Run that single test: `npx playwright test tests/ui/login.spec.ts --grep "invalid password"`
3. Screenshot `test-results/.../test-failed-1.png`
4. Fix the test again

| File name | `screenshots/H1_failure_screenshot.png` |

---

# PART 2 – VIDEOS (4 required)

Use **Xbox Game Bar** (`Win + G` → Record) or **Snipping Tool → Record**.

Save all videos to `submission/videos/`.

**Recommended length:** 1–3 minutes each. **Speak briefly** or add text overlay explaining what you are doing.

---

## Video 1 – Full test execution + HTML report

| Item | Detail |
|------|--------|
| **File name** | `videos/01_full_test_run_and_report.mp4` |
| **Length** | 2–3 minutes |

**Step-by-step script:**

1. **Start recording**
2. Show VS Code with project open (5 sec)
3. Open terminal, type and run:
   ```bash
   npm test
   ```
4. **Wait** until all tests finish — viewer must see `20 passed`
5. Run:
   ```bash
   npm run report
   ```
6. **Scroll** through HTML report: overview → one UI test → one API test
7. **Stop recording**

---

## Video 2 – CURA UI appointment flow (headed)

| Item | Detail |
|------|--------|
| **File name** | `videos/02_cura_appointment_headed.mp4` |
| **Length** | 1–2 minutes |

**Step-by-step script:**

1. **Start recording**
2. In terminal run:
   ```bash
   npx playwright test tests/ui/appointment.spec.ts --headed
   ```
3. Viewer should see browser: homepage → login → appointment form → confirmation page
4. **Stop recording** when test completes

---

## Video 3 – Postman API exploration

| Item | Detail |
|------|--------|
| **File name** | `videos/03_postman_api_requests.mp4` |
| **Length** | 2–3 minutes |

**Step-by-step script:**

1. **Start recording** with Postman open
2. Execute **GET** `/users/1` — show response
3. Execute **POST** `/users` with valid JSON — show 201
4. Execute **POST** `/auth/login` — show token
5. Execute **DELETE** `/users/{id}` — show 200
6. **Stop recording**

---

## Video 4 – Playwright UI mode OR codegen

| Item | Detail |
|------|--------|
| **File name** | `videos/04_playwright_ui_or_codegen.mp4` |
| **Length** | 1–2 minutes |

**Option A – UI mode:**
```bash
npm run test:ui-mode
```
Run one test from the Playwright UI window.

**Option B – Codegen:**
```bash
npx playwright codegen https://katalon-demo-cura.herokuapp.com
```
Click through login page while code generates.

---

## Optional Video 5 – E2E test explanation

| Item | Detail |
|------|--------|
| **File name** | `videos/05_e2e_ui_plus_api.mp4` |
| **Steps** | 1. Open `tests/e2e/cura-e2e.spec.ts` in VS Code 2. Briefly explain API call + UI flow 3. Run: `npm run test:e2e` 4. Show passing result |

---

# PART 3 – REPORTS TO ATTACH

| # | Item | How | Save to |
|---|------|-----|---------|
| 1 | HTML report | After `npm test`, zip folder `playwright-report/` | `submission/reports/playwright-report.zip` |
| 2 | JSON results | Copy `test-results/results.json` | `submission/reports/results.json` |
| 3 | GitHub repo link | Text file with URL | `submission/github_repo_url.txt` |

---

# PART 4 – FINAL SUBMISSION CHECKLIST

Print this and tick each box:

### Documents
- [ ] `ASSESSMENT_SUBMISSION_INDEX.md` – name, date, GitHub URL filled
- [ ] `TEST_CASES.md` exported to PDF
- [ ] `REST_CONCEPTS.md` exported to PDF
- [ ] `POSTMAN_MANUAL_EXPLORATION.md` exported to PDF
- [ ] `RECORD_AND_PLAYBACK_EVALUATION.md` exported to PDF (+ personal reflection written)

### Screenshots (minimum 15)
- [ ] A1 – VS Code project structure
- [ ] A2 – .env.example
- [ ] A3 – playwright.config.ts
- [ ] B2 – **20 passed** in terminal
- [ ] B3 – smoke tests
- [ ] C2 – HTML report overview
- [ ] C3 – UI test in report
- [ ] C4 – API test in report
- [ ] D0–D7 – Postman screenshots (8 images)
- [ ] E2 – Appointment confirmation
- [ ] F1 – Codegen
- [ ] G1 – GitHub repo
- [ ] G2 – GitHub Actions passed

### Videos (minimum 4)
- [ ] 01 – Full test run + report
- [ ] 02 – Headed appointment test
- [ ] 03 – Postman API
- [ ] 04 – UI mode or codegen

### Code & CI
- [ ] Code pushed to GitHub
- [ ] GitHub Actions workflow green
- [ ] `.env` NOT committed (only `.env.example`)

---

# Quick reference – all commands

```bash
# Go to project
cd "c:\Users\AjanthanVignaraja\Downloads\New folder\Playwright Assesment"

# Run all tests
npm test

# Open HTML report
npm run report

# Headed UI test (for video/screenshot)
npx playwright test tests/ui/appointment.spec.ts --headed

# Playwright UI mode (for video)
npm run test:ui-mode

# Codegen (for screenshot/video)
npx playwright codegen https://katalon-demo-cura.herokuapp.com

# Smoke tests only
npm run test:smoke
```

---

**Need help?** All document templates are in the `docs/` folder of your project. Fill in your name, take screenshots/videos using this guide, export PDFs, and upload everything together with your GitHub link.
