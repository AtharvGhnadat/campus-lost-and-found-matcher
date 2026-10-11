# PROJECT OVERVIEW: CAMPUS LOST-AND-FOUND MATCHER

## 1. Project Title
**Campus Lost-and-Found Matcher**  
*An Algorithmic Recovery and Ownership Verification Web Prototype for Academic Institutions*

## 2. Background
In tertiary education institutions and engineering campuses with thousands of daily occupants, student and faculty personal belongings frequently go missing. Typical items include student identity cards, fee cards, wallets, calculators, hostel/vehicle keys, wireless earphones, chargers, umbrellas, and notebooks.

In the current status quo, reporting and claiming relies primarily on fragmented channels:
- Word-of-mouth inquiries to peons, laboratory assistants, and security guards.
- Overwhelmed student WhatsApp or Telegram broadcast channels where notices are rapidly pushed down the chat log.
- Physical lost-and-found noticeboards at administrative blocks that are infrequently checked.
- Uncoordinated drops at disparate locations (e.g., central library reception, department offices, sports complex, security gates).

Because these mechanisms lack central coordination and searchability, the recovery rate remains low, finder-loser contact is cumbersome, and sensitive belongings often remain indefinitely unclaimed in security lockups.

## 3. Problem Statement
Campus community members lack a centralized, structured, and secure system to log lost articles, record found items, and match related incidents automatically. Furthermore, existing informal mechanisms force students to post private phone numbers publicly and lack a verification layer to ensure that an item is returned only to its rightful owner.

## 4. Proposed Solution
The **Campus Lost-and-Found Matcher** is a client-side prototype that solves these challenges through:
1. **Standardized Lost & Found Digital Intake**: Capturing item category, descriptive tags, precise campus location zones, date/time, and photo evidence.
2. **Deterministic Heuristic Matcher**: A transparent rule-based algorithm (scoring 0–100) that evaluates Category (35%), Description Keywords (30%), Location Proximity (20%), and Date Proximity (15%) to automatically present likely correlations.
3. **Privacy-Preserving Ownership Verification**: An integrated claims portal where claimants must supply non-public verification indicators (e.g., lockscreen wallpaper details, card names, hidden markings, scratches, specific contents) prior to handover.
4. **Administrative & Personal Transparency**: Dedicated dashboards allowing students to monitor report statuses and campus administrators/security officers to inspect and resolve claims.

## 5. Objectives
- **Centralize Campus Reporting**: Provide a single, intuitive hub for lost and found reports accessible across mobile phones, tablets, and desktop computers.
- **Accelerate Item Resolution**: Reduce the time between an item being lost and recovered using automated similarity scoring.
- **Safeguard Privacy & Security**: Protect student contact information from public exposure and verify claims before handing over property.
- **Deliver an Academic Prototype**: Implement cleanly in native web standards (HTML5/CSS3/Vanilla JS) strictly adhering to the Software Prototyping (SP) syllabus without external frameworks.

## 6. Scope
### In-Scope (Prototype Features)
- Responsive web interface for desktop, tablet, and mobile displays.
- Localized Indian campus zones (Library, Canteen, Academic Blocks, Computer Labs, Workshop, Sports Ground, Security Gate).
- Forms for logging lost and found records with image upload preview (data URLs).
- Filterable search catalog with real-time text query and category/location/date criteria.
- 100-point transparent matching engine with heuristic breakdown indicators and clear disclaimer.
- Non-public claim request submission and verification interface.
- Personal report and claim management view with recovery state updates.
- Prototype administrative dashboard for approving/rejecting claims and resolving records.
- Local browser storage (`localStorage`) persistence with demo dataset seeding and reset controls.

### Out-of-Scope (Deferred to Future Production Cycles)
- Cloud-hosted relational database servers and multi-device real-time sync.
- Production Single Sign-On (SSO) with college LDAP/ERP integration.
- Hardware RFID/barcode tag scanning.
- Automated email or SMS OTP dispatch gateways.

## 7. Target Users
1. **Students**: Primary users who frequently misplace or discover belongings across lecture halls, labs, and canteens.
2. **Faculty & Staff**: Discover items left behind in staff rooms or exam halls; manage department inventories.
3. **Security Staff & Lab Assistants**: Custodians of found property who need a reliable audit log for verifying ownership before returning items.
4. **Campus Administrators**: Supervise open cases, dispute resolutions, and unclaimed property statistics.

## 8. Technology Stack
- **Structure**: HTML5 (Semantic landmarks, Accessible form inputs).
- **Presentation**: CSS3 (Modern custom properties, CSS Grid, Flexbox, Mobile-First layout).
- **Behavior**: Pure Vanilla JavaScript (ES6 Modules, DOM manipulation, JSON serialization).
- **State Persistence**: Browser `localStorage` API.
- **Assets**: Embedded SVG icons and optimized local mock images.

## 9. Expected Outcome
A fully operational, responsive, zero-install web prototype demonstrating seamless reporting, algorithmic matching, claim lifecycle tracking, and admin moderation, accompanied by comprehensive academic documentation for the Software Prototyping subject.
