# UI / UX DESIGN SPECIFICATION
## Campus Lost-and-Found Matcher

This document details the interface architecture, design tokens, responsive layout rules, and per-page interaction design for the **Campus Lost-and-Found Matcher**.

---

## 1. Global Design System & Aesthetic Principles

### 1.1 Color Palette (Navy, Slate, & Campus Accent Tokens)
- **Primary Navy (`--color-primary`)**: `#0f2b48` — Deep collegiate navy providing authority and high contrast.
- **Primary Vibrant (`--color-primary-light`)**: `#1d4ed8` — Refined cobalt for interactive links and primary buttons.
- **Accent Teal / Cyan (`--color-accent`)**: `#0284c7` — Soft highlight for badges and active pills.
- **Success Forest (`--color-success`)**: `#059669` — Positive status indicators and approved claim badges.
- **Warning Amber (`--color-warning`)**: `#d97706` — Pending reviews and medium-match scores.
- **Danger Crimson (`--color-danger`)**: `#dc2626` — Rejected claims, deletion actions, and validation errors.
- **Neutral Backgrounds**:
  - Main Canvas (`--bg-body`): `#f8fafc` (Ultra-light slate)
  - Card Canvas (`--bg-card`): `#ffffff` (Pure white)
  - Subtle Muted (`--bg-subtle`): `#f1f5f9` (Light slate grey)
- **Neutral Typography**:
  - Headings & Primary Text (`--text-main`): `#0f172a` (Slate 900)
  - Body Text (`--text-muted`): `#475569` (Slate 600)
  - Subtle Labels (`--text-subtle`): `#94a3b8` (Slate 400)
- **Borders & Shadows**:
  - Border Line (`--border-color`): `#e2e8f0`
  - Subtle Card Elevation (`--shadow-sm`): `0 1px 3px rgba(15, 23, 42, 0.08)`
  - Hover Card Elevation (`--shadow-md`): `0 4px 14px rgba(15, 23, 42, 0.12)`

### 1.2 Typography & Spacing
- **Font Stack**: System native font stack `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` for rapid rendering without external web font latency.
- **Hierarchy**:
  - `h1`: 1.875rem (30px) on mobile, 2.25rem (36px) on desktop; font-weight: 700.
  - `h2`: 1.5rem (24px); font-weight: 600.
  - `h3`: 1.125rem (18px); font-weight: 600.
  - Body: 1rem (16px); line-height: 1.5; font-weight: 400.
  - Small / Badges: 0.8125rem (13px); font-weight: 500.

### 1.3 Layout & Responsive Breakpoints
- **Mobile (< 768px)**: 1-column layouts, hamburger toggle navigation, touch-friendly target size (minimum 44px height), full-width forms.
- **Tablet (768px – 1023px)**: 2-column card grid, inline navigation bar, compact multi-filter bar.
- **Desktop (>= 1024px)**: 3-column card grid, sidebar filters on catalog, side-by-side comparison cards on matching page, maximum content container width `1200px`.

---

## 2. Per-Page Specifications

### Page 1: Home / Dashboard (`index.html`)
- **Purpose**: Welcomes visitors, explains how the campus matching works, offers immediate actions to report or browse, and features live recent activity.
- **Target User**: Students or staff who just lost or discovered an item, or curious community members.
- **Main Components**:
  - Global Header & Navigation (Logo, links, role pill, mobile drawer toggle).
  - Hero Section (Problem pitch, "Report Lost Item" & "Report Found Item" CTA buttons).
  - Quick Search Bar (Direct entry to filter catalog).
  - Statistics Strip (Live counts of Total Reports, Recovered Items, Active Matches).
  - Recent Reports Carousel/Grid (Toggleable between "Recently Lost" and "Recently Found").
  - "How It Works" 3-Step Infographic (Report -> Algorithmic Match -> Verified Handover).
  - Global Footer with disclaimer and demo reset button.
- **Actions**: One-click jump to reporting forms, instant search keyword forwarding to browse page.
- **Responsive Behavior**: Hero stacks vertically on mobile; cards reflow from 1-column (phone) to 3-column (desktop).

### Page 2: Report Lost Item (`pages/report-lost.html`)
- **Purpose**: Allows a student to log an item they misplaced on campus.
- **Target User**: Student / Loser.
- **Main Components**:
  - Breadcrumb navigation.
  - Form Fields: Item Title, Category Dropdown, Description, Campus Location Dropdown, Date Lost Picker, Optional Identifying Characteristics, Optional Photo Upload with instant thumbnail preview.
  - Live Validation Hints and Submit Button.
- **Validation**: Title (min 3 chars), Category required, Location required, Date required (cannot be future date), Description (min 10 chars).
- **Feedback**: Accessible inline alert upon submission and redirect or link to view generated report.

### Page 3: Report Found Item (`pages/report-found.html`)
- **Purpose**: Allows any campus citizen to log an item found and disclose safe custody location.
- **Target User**: Student / Finder, Staff Custodian.
- **Main Components**:
  - Privacy Reminder Banner ("Do not disclose your private mobile number; use campus security or reception for handovers").
  - Form Fields: Item Title, Category, Description, Location Found, Date Found, Safe Handover Spot (e.g. Security Cabin Gate 1, Central Library Desk), Photo Upload.
  - Validation: Equivalent to Lost form.
- **Responsive Behavior**: Fits cleanly within mobile viewport without horizontal cut-off.

### Page 4: Browse Lost and Found Items (`pages/browse.html`)
- **Purpose**: Searchable, filterable campus directory of all active and resolved reports.
- **Target User**: Any campus member seeking to check whether their item was turned in.
- **Main Components**:
  - Multi-Criteria Filter Bar:
    - Search Keyword input with clear button.
    - Report Type Pills: All | Lost | Found.
    - Category Select: All Categories, Electronics, Wallets, Keys, etc.
    - Location Select: All Locations, Canteen, Library, etc.
    - Status Filter: All | Open | Claimed | Resolved.
  - Active Filter Tags and "Reset Filters" action.
  - Catalog Grid with responsive Item Cards (Image thumbnail with fallback, Type pill, Title, Location, Date, Status badge, "View Details" button).
  - Empty State Illustration & Prompt when no items match criteria.

### Page 5: Possible Matches (`pages/matches.html`)
- **Purpose**: Runs and visualizes the 100-point rule-based matching engine comparing Lost reports against Found reports.
- **Target User**: Students checking if a found item matches what they lost.
- **Main Components**:
  - Filter by Lost Item selector (allows user to isolate matches for a specific lost item).
  - Match Candidate Cards:
    - Side-by-side comparative card (Lost Item vs. Found Item).
    - Match Score Gauge / Badge with color coding:
      - High Match (75–100 pts): Green.
      - Moderate Match (50–74 pts): Amber.
      - Low Match (< 50 pts): Slate/Muted.
    - Itemized Reason Breakdown:
      - Category Match: 35/35
      - Description Keywords Overlap: e.g. 24/30 (highlights matched tokens)
      - Campus Location Similarity: e.g. 20/20
      - Date Proximity: e.g. 12/15
    - Explicit Disclaimer: "Notice: Match scores represent algorithmic similarity heuristics, not definitive ownership."
    - "Inspect & Submit Claim" Action Button.

### Page 6: Item Details & Claim Request (`pages/item-details.html`)
- **Purpose**: Displays full public information about a specific report and enables users to submit an ownership claim.
- **Target User**: Claimant.
- **Main Components**:
  - Two-Column Layout (Desktop) / Stacked Layout (Mobile).
  - Left Column: Item Image (with fallback SVG), Badges (Lost/Found, Category, Status), Description, Campus Location, Date, Custody Spot.
  - Right Column:
    - Claim Submission Form (if item is 'Found' and status is 'Open'):
      - Claimant Name & Roll Number.
      - Reason / Story ("Why do you believe this is yours?").
      - Non-Public Proof of Ownership ("Specify details not visible in photo: interior cards, wallpaper, engraving, scratch location").
      - Submit Claim button with privacy guarantee.
    - If already claimed or resolved, displays current status banner.

### Page 7: My Reports and Claims (`pages/my-reports.html`)
- **Purpose**: Personal student dashboard to monitor reports logged by the demo user and claims filed.
- **Target User**: Active student user (`usr-student-01`).
- **Main Components**:
  - User Identity Header (Name, Roll No, Demo Role).
  - Tab 1: "My Reported Items" (Table/Card list with status badges and "Mark as Recovered" toggle).
  - Tab 2: "My Submitted Claims" (List of claims filed against found items, showing status: Pending, Approved, or Rejected).

### Page 8: Admin Dashboard (`pages/admin.html`)
- **Purpose**: Prototype moderation portal for campus security or authorities.
- **Target User**: Campus Administrator / Security Officer.
- **Main Components**:
  - Admin Role Disclaimer Banner ("Academic Prototype Demo Admin Interface").
  - Stat KPI Metric Cards: Total Reports, Open Lost, Open Found, Pending Claims, Resolved Items.
  - Section 1: "Pending Ownership Claims" Table:
    - Displays Found Item Title, Claimant Name, Non-Public Proof Provided, Submission Date.
    - Action Buttons: "Approve Claim" (sets item to Claimed) and "Reject Claim" (records rejection reason).
  - Section 2: "All Campus Reports" Table:
    - Quick search and filter.
    - Action to "Mark Resolved" or "Delete Demo Record".
  - Section 3: System Utilities ("Reset to Default Seed Data").
