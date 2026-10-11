# CHANGELOG: CAMPUS LOST-AND-FOUND MATCHER

This document maintains a strict, chronological audit log of all project changes, enhancements, and fixes.

---

## Change Log Entries

### [CHG-002] - 2026-10-11
- **Affected Module / File**: Prototype Frontend Core (`index.html`, `pages/*`, `css/*`, `js/*`, `assets/*`)
- **What Changed**: Implemented all 8 required views, vanilla JavaScript business logic, 100-point rule-based matching engine, local storage layer, responsive design system, and fallback visual assets. Performed automated browser QA and mobile viewport testing.
- **Why It Changed**: Completing Stages 2 through 8 of the project master prompt.
- **Files Added / Modified**:
  - `index.html` (Home Dashboard with live stats, recent feeds, search bar, how it works)
  - `pages/report-lost.html` (Validated lost item intake form with image preview)
  - `pages/report-found.html` (Found item intake with safe handover location and privacy shield)
  - `pages/browse.html` (Search catalog with live keyword, category, location, and status filters)
  - `pages/matches.html` (Transparent 100-pt rule-based matcher with score breakdown and heuristic advisory)
  - `pages/item-details.html` (Item details inspector and non-public ownership claim request form)
  - `pages/my-reports.html` (Student personal activity dashboard with recovery toggle)
  - `pages/admin.html` (Moderation console with KPI statistics, claims review, and report status management)
  - `css/styles.css` (Collegiate navy design system, form inputs, buttons, badges, tables)
  - `css/responsive.css` (Mobile-first breakpoints for 320px–430px, 768px, and 1024px+)
  - `js/storage.js` (LocalStorage schema, Indian campus seed data, data reset tool)
  - `js/matching.js` (Heuristic engine: Category 35 pts, Keywords 30 pts, Location 20 pts, Date 15 pts)
  - `js/reports.js` (Form validation, FileReader DataURL conversion, catalog rendering)
  - `js/claims.js` (Claims submission and personal activity management)
  - `js/admin.js` (Admin moderation and stats aggregation)
  - `js/app.js` (Mobile drawer navigation, active link highlighting, notifications, helpers)
  - `assets/icons/logo.svg` (Brand icon)
  - `assets/images/fallback-*.svg` (Category visual fallback placeholders)
  - `docs/TEST_RESULTS.md` (Updated with 14 verified PASS records)
  - `docs/IMPLEMENTATION_LOG.md` (Updated with TSK-002)
- **Verification Status**: Verified via live browser session and automated script tests at desktop and mobile (375x700) viewports. All 14 test cases marked PASS.
- **Known Issues**: None within the agreed academic prototype scope.

---

### [CHG-001] - 2026-10-11
- **Affected Module / File**: Project Inception & Academic Documentation Suite (`docs/*`)
- **What Changed**: Initialized complete Software Prototyping repository structure and baseline academic documents including `README.md`, `PROJECT_OVERVIEW.md`, `AEIOU_FRAMEWORK.md`, `REQUIREMENTS_SPECIFICATION.md`, `PROJECT_DEVELOPMENT_CANVAS.md`, `UML_DIAGRAMS.md`, `UI_UX_DESIGN.md`, `IMPLEMENTATION_LOG.md`, `CHANGELOG.md`, `TEST_PLAN.md`, `TEST_RESULTS.md`, `KNOWN_LIMITATIONS.md`, `FINAL_REPORT_DRAFT.md`, and `PRESENTATION_OUTLINE.md`.
- **Why It Changed**: Mandatory compliance with academic project standards and initial planning requirements before writing application code.
- **Files Added**: 
  - `docs/README.md`
  - `docs/PROJECT_OVERVIEW.md`
  - `docs/AEIOU_FRAMEWORK.md`
  - `docs/REQUIREMENTS_SPECIFICATION.md`
  - `docs/PROJECT_DEVELOPMENT_CANVAS.md`
  - `docs/UML_DIAGRAMS.md`
  - `docs/UI_UX_DESIGN.md`
  - `docs/IMPLEMENTATION_LOG.md`
  - `docs/CHANGELOG.md`
  - `docs/TEST_PLAN.md`
  - `docs/TEST_RESULTS.md`
  - `docs/KNOWN_LIMITATIONS.md`
  - `docs/FINAL_REPORT_DRAFT.md`
  - `docs/PRESENTATION_OUTLINE.md`
- **Verification Status**: Verified document structure, valid Mermaid notation, and alignment with course practical deliverables.
- **Known Issues**: None at this phase.
