# Assessment Submission Index

**Student name:** _[Fill in your name]_  
**Student ID:** _[Fill in]_  
**Course / Assessment:** Test Automation Assessment 1 – Playwright  
**Submission date:** _[Fill in date]_  
**GitHub repository:** _[Paste your repo URL here]_

---

## Documents included in this submission

| # | Document | File in project | Format to submit |
|---|----------|-----------------|------------------|
| 1 | Test cases (UI + API) | `docs/TEST_CASES.md` | PDF or Word export |
| 2 | REST concepts | `docs/REST_CONCEPTS.md` | PDF or Word export |
| 3 | Postman manual exploration | `docs/POSTMAN_MANUAL_EXPLORATION.md` | PDF + Postman screenshots |
| 4 | Record & Playback evaluation | `docs/RECORD_AND_PLAYBACK_EVALUATION.md` | PDF |
| 5 | Project README | `README.md` | Included in GitHub repo |
| 6 | Screenshot & video guide | `docs/SUBMISSION_GUIDE.md` | For your reference |

---

## Screenshots folder (you create this)

Create folder: `submission/screenshots/` and add all files listed in `SUBMISSION_GUIDE.md`.

**Minimum screenshot count:** 15 images

---

## Videos folder (you create this)

Create folder: `submission/videos/` and add recordings listed in `SUBMISSION_GUIDE.md`.

**Minimum video count:** 3 screen recordings

---

## Reports folder (you create this)

| Item | How to generate |
|------|-----------------|
| HTML report | Run `npm test` then `npm run report` → zip `playwright-report/` folder |
| JSON results | File: `test-results/results.json` after `npm test` |

---

## Code deliverables (GitHub)

| Item | Location |
|------|----------|
| Playwright tests | `tests/ui/`, `tests/api/`, `tests/e2e/` |
| Page Object Model | `pages/` |
| API helpers | `utils/` |
| Fixtures | `fixtures/`, `tests/fixtures/` |
| Configuration | `playwright.config.ts`, `.env.example` |
| CI/CD | `.github/workflows/playwright.yml` |

---

## Declaration

I confirm that:
- [ ] I ran all tests locally and they passed
- [ ] I completed Postman manual exploration with my own screenshots
- [ ] I recorded the required videos
- [ ] I pushed code to GitHub and CI ran successfully
- [ ] All documents have my name and date filled in

**Signature:** _________________________  
**Date:** _________________________
