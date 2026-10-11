# TEST RESULTS & EXECUTION LOG
## Campus Lost-and-Found Matcher

This document records the empirical test executions performed on the implemented prototype.

---

## 1. Test Execution Summary

- **Total Test Cases**: 14
- **Executed**: 14
- **Passed**: 14
- **Failed**: 0
- **Pending**: 0
- **Test Date**: 2026-10-11
- **Testing Engine**: Browser Automated QA + Manual DOM Inspection
- **Test Server**: `http://localhost:8080`

---

## 2. Detailed Execution Log

| Test ID | Module | Precondition | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Navigation & Routing | Local server running | All links load without 404s | All navigation links (Home, Browse, Matches, Report Lost, Report Found, My Activity, Admin) resolved with status 200. | **PASS** |
| **TC-02** | Report Lost - Validation | Clean browser state | Empty form blocked with alerts | Native and JS validation rejected empty title with "Please fill out this field." Form submission halted. | **PASS** |
| **TC-03** | Report Lost - Submission | Valid inputs entered | Item persisted in LocalStorage | Form validated inputs, generated unique ID (`rep-lost-*`), and persisted record to localStorage. | **PASS** |
| **TC-04** | Report Found - Submission | Valid inputs entered | Found item saved with safe location | Form saved found record with safe handover location (`Security Desk Gate 1`) without exposing private student numbers. | **PASS** |
| **TC-05** | LocalStorage Persistence | Item added to storage | Item persists across tab refresh | Seeded items and user additions retain state across page reloads without duplicates. | **PASS** |
| **TC-06** | Catalog Filtering & Search | Multiple items stored | Real-time filter returns exact matches | Typing "wallet" filtered catalog to 2 wallet cards. Category dropdown to "Electronics" filtered to earphones. | **PASS** |
| **TC-07** | Heuristic Matching | Seed records loaded | Seed wallet pair scores >= 85% | Evaluated Black WildHorn Leather Wallet pair (`rep-lost-101` vs `rep-found-201`) at **86% Match Score** (Cat: 35/35, Keywords: 16/30, Loc: 20/20, Date: 15/15). | **PASS** |
| **TC-08** | Match Disclaimer | Match page loaded | Heuristic disclaimer is prominent | Warning alert displayed: "Suggested match scores represent an algorithmic similarity index, not legal or definitive proof of ownership." | **PASS** |
| **TC-09** | Ownership Claim Workflow | Found item available | Claim created with hidden proof | Claim submitted with non-public proof ("Inside wallet is DSY Roll No slip, SBI ATM ending in 4102"). Hidden from public card. | **PASS** |
| **TC-10** | Admin Claim Moderation | Pending claim exists | Admin approve sets item to Claimed | Admin portal displays pending claim `clm-001`, shows non-public proof, and includes working Approve/Reject actions. | **PASS** |
| **TC-11** | User Activity Tracking | User reports exist | User can mark item as Recovered | `pages/my-reports.html` rendered user's reported items and submitted claims with working recovery toggle. | **PASS** |
| **TC-12** | Demo Data Reset | Custom records added | Restores clean initial seed data | "Reset Demo Dataset" action restored default 6 reports and 1 claim without console errors. | **PASS** |
| **TC-13** | Viewport Responsiveness | Tested at 375, 768, 1280px | No horizontal overflow; responsive nav | Window resized to 375x700: `.mobile-nav-toggle` visible and successfully toggled `.main-nav.open`. Cards reflowed with `hasHorizontalScroll = false`. | **PASS** |
| **TC-14** | Image Fallback System | Item without photo | SVG fallback renders cleanly | Validated category-specific SVG fallbacks (`fallback-wallet.svg`, `fallback-bottle.svg`, etc.) render cleanly. | **PASS** |

---

## 3. QA Conclusion
All 14 test cases passed successfully. The prototype fulfills all core functional, heuristic matching, privacy preservation, and responsive design requirements specified in the project requirements.
