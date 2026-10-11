# QUALITY ASSURANCE & TEST PLAN
## Campus Lost-and-Found Matcher

---

## 1. Test Strategy & Scope
This test plan defines the test suites, procedures, inputs, and expected outcomes to systematically validate the **Campus Lost-and-Found Matcher** prototype. The tests evaluate functional compliance, UI responsiveness, data integrity, security/privacy protection, and matching precision.

---

## 2. Test Case Specifications

| Test ID | Feature / Module | Test Description & Preconditions | Execution Steps | Expected Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Navigation & Routing | Verify all navbar links and footer actions resolve correctly from any page. | 1. Open home page.<br>2. Click every navbar link and page button. | Target page loads without broken 404 links or console errors. |
| **TC-02** | Report Lost Item - Validation | Check form validation for missing mandatory fields or invalid dates. | 1. Open `pages/report-lost.html`.<br>2. Submit empty form.<br>3. Select a future date. | Form rejects submission; displays inline validation alerts; preserves focus. |
| **TC-03** | Report Lost Item - Submission | Submit a valid lost item report with image preview. | 1. Fill valid title, category, location, date, and description.<br>2. Upload image file.<br>3. Click Submit. | Item saved in `localStorage`; success feedback shown; record visible in catalog. |
| **TC-04** | Report Found Item - Submission | Submit a valid found item report with safe custody location. | 1. Open `pages/report-found.html`.<br>2. Complete valid inputs including safe handover location.<br>3. Submit. | Record persisted; status initialized to "Open"; safe location recorded. |
| **TC-05** | LocalStorage Resilience | Verify data persistence across browser reloads. | 1. Create a custom item report.<br>2. Hard-refresh the browser tab.<br>3. Check catalog. | Newly added item remains intact without data loss or duplication. |
| **TC-06** | Catalog Filtering & Search | Verify multi-criteria filtering on real stored records. | 1. Open `pages/browse.html`.<br>2. Type "wallet" in search.<br>3. Filter by Category: "Wallets & Bags". | Only matching wallet cards display; non-matching records are excluded. |
| **TC-07** | Rule-Based Matching Precision | Verify 100-point matching on seeded Wallet pair. | 1. Open `pages/matches.html`.<br>2. Check match pair for lost black wallet vs found leather wallet. | Match score computes >= 85%; itemized breakdown shows Category (35), Keywords, Location, Date. |
| **TC-08** | Match Disclaimer Visibility | Ensure matching disclaimer is clearly visible. | 1. Inspect match cards on `pages/matches.html`. | Clear disclaimer visible stating score is heuristic, not legal proof. |
| **TC-09** | Ownership Claim Workflow | Submit a claim against an open found item. | 1. Navigate to found item details.<br>2. Fill claim form with non-public proof.<br>3. Submit claim. | Claim saved with status "Pending"; confirmation receipt shown; not visible on public card. |
| **TC-10** | Admin Claim Moderation | Admin approves and rejects submitted claims. | 1. Open `pages/admin.html`.<br>2. Click "Approve Claim" on pending claim.<br>3. Verify item status. | Claim status changes to "Approved"; item status updates to "Claimed". |
| **TC-11** | User Activity Tracking | Student reviews their reports and marks recovery. | 1. Open `pages/my-reports.html`.<br>2. Locate demo user item.<br>3. Click "Mark as Recovered". | Item status toggles to "Resolved"; reflected immediately in catalog and admin stats. |
| **TC-12** | Demo Data Reset | Reset modified database back to default seed. | 1. Mutate records.<br>2. Click "Reset Demo Data".<br>3. Confirm reset dialog. | Seed records restored cleanly without duplicated entries. |
| **TC-13** | Viewport Responsiveness | Check layouts on 375px (mobile), 768px (tablet), and 1280px (desktop). | 1. Resize browser or use DevTools device mode at 375px, 768px, and 1280px. | Navigation collapses cleanly to mobile toggle; cards reflow; zero horizontal scrolling. |
| **TC-14** | Image Fallback Rendering | Ensure broken or omitted image links display fallback visual. | 1. Open item without uploaded photo. | Elegant SVG placeholder card renders smoothly without broken image icons. |
