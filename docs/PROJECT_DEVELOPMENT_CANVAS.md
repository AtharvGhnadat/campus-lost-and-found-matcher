# PROJECT DEVELOPMENT CANVAS: CAMPUS LOST-AND-FOUND MATCHER

Academic Practical Framework — Software Prototyping (SP) Coursework

---

```
+-------------------------------------------------------------------------------------------------------------------------------+
|                                            CAMPUS LOST-AND-FOUND MATCHER CANVAS                                               |
+-----------------------------------------+-----------------------------------------+-------------------------------------------+
| 1. PROBLEM STATEMENT                    | 4. PROPOSED SOLUTION & KEY FEATURES     | 2. TARGET USERS & BENEFICIARIES           |
| - High incidence of misplaced student   | Centralized client-side portal for      | - Undergraduate & Diploma Students        |
|   belongings on college premises.       | reporting, searching, and algorithmic   | - Faculty Members & Lecturers             |
| - Broadcast chat groups (WhatsApp)      | matching of lost/found campus articles. | - Security Guards & Main Gate Staff       |
|   clutter and bury urgent notices.      | Key Features:                           | - Laboratory & Library Attendants         |
| - Finder lacks safe contact channel;    | • Dual Lost & Found intake with photos  | - Campus Estate/Admin Authorities         |
|   loser fears privacy exposure.         | • Real-time multi-criteria filter       +-------------------------------------------+
| - Security lacks verification logs      | • 100-pt transparent matching engine    | 3. VALUE PROPOSITION                      |
|   leading to disputed property returns. | • Privacy-protected ownership claims    | - Recovers lost items 3x faster           |
|                                         | • Student & Admin dashboards            | - Eliminates public phone number leaks    |
|                                         | • One-click demo data reset             | - Auditable proof-of-ownership trail      |
+-----------------------------------------+-----------------------------------------+-------------------------------------------+
| 7. STAKEHOLDERS                         | 6. TECHNOLOGY STACK                     | 5. CONSTRAINTS & PREREQUISITES            |
| - Students, Lab Assistants, Guards      | • HTML5 (Semantic Structure)            | - Zero backend / server runtimes allowed  |
| - Faculty Guides & Academic Evaluators  | • CSS3 (Vanilla Responsive Grid/Flex)   | - Pure Vanilla JS only (No frameworks)   |
| - College Administrative Office         | • JavaScript ES6+ (Core Logic/Storage)  | - Persistence limited to LocalStorage     |
|                                         | • LocalStorage API (Data Persistence)   | - Prototype demonstration scope only      |
+-----------------------------------------+-----------------------------------------+-------------------------------------------+
| 9. RISKS & ASSUMPTIONS                  | 8. SUCCESS CRITERIA (ACCEPTANCE)        | 10. FEASIBILITY & SUSTAINABILITY          |
| - Assumption: Modern browser access.    | • 100% responsive on mobile/desktop.    | • Zero hosting/license expense.           |
| - Risk: LocalStorage cleared manually.  | • Seeded wallet pair matches >= 85%.    | • Modular vanilla code easily maintained. |
|   Mitigation: Instant Restore Data tool | • Claims cycle completes without errors.| • Ideal foundation for semester viva demo.|
| - Risk: Bogus claims -> Mitigation:     | • Clean academic documentation package. | • Easily upgradable to cloud DB later.    |
|   Admin approval with non-public proof. |                                         |                                           |
+-----------------------------------------+-----------------------------------------+-------------------------------------------+
```

---

## Detailed Section Breakdown

### 1. Problem Statement
College campuses encompass sprawling academic blocks, canteens, reading halls, and labs. Misplacing personal items (wallets, ID cards, keys, calculators, gadgets) disrupts academic schedules and induces stress. Current informal recovery channels lack central visibility, expose private phone numbers on bulletin boards, and lack objective verification.

### 2. Target Users
- **Primary Users (Students)**: Daily commuters and campus hostellers who actively lose or find belongings.
- **Secondary Custodians (Staff & Guards)**: Receptionists, librarians, and gatekeepers holding surrendered articles.
- **Moderators (Campus Admin)**: Faculty and security in-charge overseeing dispute resolution.

### 3. Value Proposition
- **Convenience**: 60-second form filing for lost or found items.
- **Intelligence**: Algorithmic heuristic correlation highlighting potential matches without manual searching.
- **Privacy & Security**: Claim verification occurs via hidden identifying markers rather than public disclosure.
- **Academic Rigor**: Clean design adhering faithfully to SP curriculum constraints.

### 4. Proposed Solution & Key Features
- **Centralized Intake**: Intuitive forms with location presets and picture previews.
- **Live Search & Filter**: Real-time filtering across 6 campus categories and 7 campus zones.
- **Rule-Based Matching Algorithm**: Weighted transparent 100-point score (Category 35, Keywords 30, Location 20, Date 15).
- **Claim Request Engine**: Private ownership verification submitted for administrative review.
- **Role-Based Portals**: Dedicated student activity dashboard and prototype administrative moderation panel.

### 5. Constraints
- Framework ban: No React, Vue, Angular, Bootstrap, Tailwind, or Node.js.
- Local execution: Client-only execution via browser localStorage.
- Academic scope: High clarity, educational readability, and modular design.

### 6. Technology Stack
- HTML5, CSS3 (Custom design system), Vanilla JavaScript (ES6+), LocalStorage.

### 7. Stakeholders
- Department of Computer Engineering / Information Technology.
- Course mentors, students, lab attendants, and administrative staff.

### 8. Success Criteria
- Flawless form validation and persistent storage.
- Seed data matching demonstration (e.g. Black Wallet pair scoring 85%+).
- Fluid layout transitions across 320px, 768px, and 1200px screens.
- Complete documentation suite ready for practical assessment.

### 9. Risks and Assumptions
- *Risk*: Data loss when browser cookies/storage are cleared.  
  *Countermeasure*: Resilient fallback check and instant "Reset Demo Data" button.
- *Risk*: Subjectivity in keyword matching.  
  *Countermeasure*: Normalized tokenization with stopword filtering.

### 10. Feasibility
High technical, economic, and operational feasibility. Zero server deployment requirements allow running locally off any storage drive or simple HTTP server.
