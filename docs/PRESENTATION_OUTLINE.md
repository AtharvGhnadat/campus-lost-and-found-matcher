# PRESENTATION OUTLINE: 10-MINUTE DEMO & VIVA
## Campus Lost-and-Found Matcher

Academic Course: **Software Prototyping (SP)**  
Time Budget: **10 Minutes Total** (7 Mins Presentation + 3 Mins Live Walkthrough)

---

## Slide & Speaking Schedule

### Minute 1: Title & Project Context
- **Slide 1: Title & Team Credentials**
  - Project Title: Campus Lost-and-Found Matcher
  - Academic Subject: Software Prototyping (SP)
  - Objective: Providing a centralized, privacy-protected, algorithmic recovery portal for college campuses.
- **Key Talking Point**: Every semester, hundreds of student ID cards, calculators, and wallets are lost with low recovery rates because broadcast chats get cluttered and public noticeboards compromise privacy.

### Minute 2: Problem Statement & AEIOU Insights
- **Slide 2: Problem & Campus Field Observations (AEIOU)**
  - Activities: Rapid movement between lectures, misplacing items in labs and canteens.
  - Environments: High-traffic zones like Canteen, Library, Computer Labs, Security Gate.
  - Interactions: Finder-to-guard handovers lack verifiable logs; claimants struggle to prove ownership.
  - Objects: High-value personal essentials (wallets, keys, earphones, IDs).
  - Users: Students, lab assistants, security staff, and administrators.

### Minute 3: Proposed Architecture & Strict Technology Constraints
- **Slide 3: Technical Blueprint & Academic Compliance**
  - Pure Web Standards: Semantic HTML5, Vanilla CSS3 (Custom Design System), Modern Vanilla JS (ES6+).
  - Browser Storage: Resilient `localStorage` persistence with one-click demo data reset.
  - Zero External Frameworks: Strictly adhering to SP practical rules (No React, Tailwind, Bootstrap, or Node.js).

### Minute 4: UML System Design & Workflows
- **Slide 4: Use Cases & Activity Flow**
  - Walk through the Mermaid use case model and activity lifecycle: Incident -> Form Submission -> 100-Point Match Calculation -> Claim Filing with Private Proof -> Administrative Verification -> Recovery.

### Minutes 5–7: Live Interactive System Demonstration (Demo Walkthrough)
- **Live Demo Screen 1: Home Dashboard (`index.html`)**
  - Show the hero actions, live statistics, recent items feed, and "How it works" guide.
- **Live Demo Screen 2: Report Lost Item (`pages/report-lost.html`)**
  - Demonstrate form validation, campus location presets, and image file preview.
- **Live Demo Screen 3: Browse Catalog (`pages/browse.html`)**
  - Demonstrate real-time filtering by category ("Wallets & Bags"), type ("Lost" vs "Found"), and campus zone.
- **Live Demo Screen 4: Algorithmic Matching Showcase (`pages/matches.html`)**
  - **Highlight**: Show the seeded "Black Wallet" match pair scoring ~85–90%.
  - Point out the itemized 4-part score breakdown (Category 35/35, Keywords, Location 20/20, Date).
  - Emphasize the prominent ethical disclaimer: *Score is a heuristic similarity metric, not legal proof of ownership.*
- **Live Demo Screen 5: Claim Submission with Non-Public Proof (`pages/item-details.html`)**
  - Show that private proof details (e.g. "Contains SBI Card ending in 4102 and a library receipt") remain shielded from public cards.
- **Live Demo Screen 6: Admin Dashboard (`pages/admin.html`)**
  - Show admin KPI metrics; review the pending claim; click "Approve Claim"; show status transition to "Claimed".
- **Live Demo Screen 7: My Reports & Recovery (`pages/my-reports.html`)**
  - Show the student viewing the approved claim and marking the item "Recovered".

### Minute 8: Verification & Test Results
- **Slide 5: Testing & Quality Assurance Summary**
  - 14 targeted test cases covering validation, persistence, responsiveness, and matching accuracy.
  - Verification across mobile (375px), tablet (768px), and desktop (1280px) viewports with zero horizontal overflow.

### Minute 9: Known Limitations & Production Roadmap
- **Slide 6: Boundaries & Future Enhancements**
  - Current prototype limits: Local-only storage sandbox, simulated demo credentials, syntactic keyword matching.
  - Next steps for production: PostgreSQL cloud backend, institutional student ERP/LDAP SSO, and SMS OTP verification.

### Minute 10: Conclusion & Q&A
- **Slide 7: Conclusion**
  - Recap value delivered: 3x faster recovery cycle, privacy preservation, and complete academic syllabus compliance.
  - Open floor for examiner questions and viva discussion.
