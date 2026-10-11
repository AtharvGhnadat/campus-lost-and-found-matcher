# Campus Lost-and-Found Matcher

An interactive, responsive web prototype designed for college campus communities (students, faculty, and administrative staff) to report lost or found items, discover algorithmic matches, and verify ownership claims transparently.

Developed as a coursework project for **Software Prototyping (SP)** at MIT Academy of Engineering (MITAOE) / Savitribai Phule Pune University (SPPU) curriculum.

---

## 🚀 Key Features

1. **Dual Reporting Portals**: Dedicated, validated forms for reporting Lost items and Found items with location tagging and image preview.
2. **Interactive Search & Filter**: Real-time filtering across categories, campus zones (Canteen, Central Library, Lab 3, etc.), date ranges, and report types.
3. **Transparent Heuristic Matcher**: A 100-point transparent rule-based algorithm:
   - Category Match (35 pts)
   - Description Keyword Overlap (30 pts)
   - Location Similarity (20 pts)
   - Date Proximity (15 pts)
   - *Clear disclaimer: Match scores represent heuristic similarity, not legal proof of ownership.*
4. **Ownership Claim Verification**: Non-public verification details submission workflow to safeguard sensitive identifying marks.
5. **My Activity Dashboard**: Track self-reported lost/found items and submitted claims with resolution status.
6. **Administrator Dashboard**: Review submitted reports, approve/reject ownership claims, resolve cases, and restore default demo data.
7. **Zero-Backend Client Architecture**: Built using pure HTML5, CSS3, and modern Vanilla JavaScript with resilient `localStorage` state management.

---

## 📂 Project Structure

```text
campus-lost-and-found/
├── index.html                   # Home page & campus dashboard
├── pages/
│   ├── report-lost.html         # Report lost item form
│   ├── report-found.html        # Report found item form
│   ├── browse.html              # Browse & filter all campus reports
│   ├── matches.html             # Algorithmic match finder & score breakdown
│   ├── item-details.html        # Detailed report view & claim submission
│   ├── my-reports.html          # User dashboard (reports & claims tracking)
│   └── admin.html               # Prototype admin management portal
├── css/
│   ├── styles.css               # Core design tokens, layout & components
│   └── responsive.css           # Mobile-first breakpoints (320px - 1440px+)
├── js/
│   ├── storage.js               # LocalStorage schema, seed records & reset
│   ├── reports.js               # Report CRUD and query helpers
│   ├── matching.js              # 100-point rule-based matching engine
│   ├── claims.js                # Claim submission and verification logic
│   ├── admin.js                 # Admin moderation actions & statistics
│   └── app.js                   # Navigation, global notifications & common UI
├── assets/
│   ├── images/                  # Demo item visuals & fallback placeholders
│   └── icons/                   # Lightweight SVG symbols
├── docs/                        # Comprehensive academic documentation
│   ├── README.md
│   ├── PROJECT_OVERVIEW.md
│   ├── AEIOU_FRAMEWORK.md
│   ├── REQUIREMENTS_SPECIFICATION.md
│   ├── PROJECT_DEVELOPMENT_CANVAS.md
│   ├── UML_DIAGRAMS.md
│   ├── UI_UX_DESIGN.md
│   ├── IMPLEMENTATION_LOG.md
│   ├── CHANGELOG.md
│   ├── TEST_PLAN.md
│   ├── TEST_RESULTS.md
│   ├── KNOWN_LIMITATIONS.md
│   ├── FINAL_REPORT_DRAFT.md
│   └── PRESENTATION_OUTLINE.md
└── .gitignore
```

---

## 🛠️ Technology Stack

- **Structure**: Semantic HTML5 with accessibility attributes (`aria-*`, form labels, semantic landmarks).
- **Styling**: Vanilla CSS3 (Custom CSS Variables, Flexbox, CSS Grid, mobile-first media queries).
- **Behavior**: Pure Vanilla JavaScript (ES6+ Modules/Classes, LocalStorage API, FileReader API).
- **Dependencies**: Zero external framework dependencies (No React, Tailwind, Bootstrap, or npm backends required).

---

## 💻 Running the Prototype Locally

Because this project uses vanilla HTML, CSS, and JS, you can run it using any simple local static server or directly in the browser:

### Option 1: Using Python (Pre-installed on most systems)
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option 2: Using Node.js `npx serve`
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` and click **"Open with Live Server"**.

---

## 🏫 Sample Data Scenarios

The prototype comes seeded with standard realistic Indian campus test records:
- **Wallet Match Pair**: Black wallet lost near Central Canteen vs. Black leather wallet found at Canteen Counter.
- **Library Bottle**: Stainless steel Milton water bottle found on Library 2nd Floor reading tables.
- **Lost Keys**: Hero Splendor / Hostel room keychain lost near Academic Block A Classroom 302.
- **Laboratory Earphones**: OnePlus Bullets Wireless earphones found in Computer Center Lab 3.

To reset data at any time, click **"Reset Demo Data"** in the footer or in the Admin Dashboard.
