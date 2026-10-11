# ACADEMIC PROJECT REPORT DRAFT
## CAMPUS LOST-AND-FOUND MATCHER
**Subject:** Software Prototyping (SP)  
**Academic Program:** Direct Second Year (DSY) / Bachelor of Technology  
**Department:** Computer Engineering / Information Technology  
**Institution:** MIT Academy of Engineering (MITAOE)  

---

## 1. Introduction
Tertiary academic institutions host vibrant communities of thousands of students, faculty, and administrative personnel daily. In the routine bustle of attending laboratories, workshops, lecture halls, and canteens, personal belongings are frequently misplaced. The **Campus Lost-and-Found Matcher** is a dedicated web prototype developed to digitize, accelerate, and safeguard the recovery of lost articles on campus.

## 2. Problem Statement
The conventional lost-and-found paradigm relies on fragmented communication—impromptu WhatsApp broadcasts, physical noticeboards, or manual queries to security staff. These channels lack centralized indexing, suffer from rapid communication clutter, compromise student privacy by forcing public phone number broadcasts, and offer no structured verification layer before items are handed over.

## 3. Objectives
- Establish a single, accessible, responsive digital portal for reporting lost and found items.
- Engineer a transparent, rule-based 100-point matching heuristic (Category, Keywords, Location, Date).
- Implement privacy-conscious ownership verification through non-public proof attributes.
- Provide tailored views for students (reporting & tracking) and administrative staff (claim auditing).
- Fulfill academic prototyping constraints using strictly native web standards (HTML5/CSS3/Vanilla JS).

## 4. Existing System and Its Limitations
- **WhatsApp Groups**: Urgent lost notices get pushed down rapidly by conversation chatter within hours.
- **Physical Noticeboards**: Rarely updated; students in other academic blocks never see them.
- **Security Guard Registers**: Hardcover logbooks lack search capabilities and often omit distinctive item traits.
- **Privacy Hazard**: Students publish personal mobile numbers openly, risking spam or harassment.

## 5. Proposed System
The proposed prototype introduces:
1. Standardized digital reporting for both lost and found articles.
2. Real-time multi-facet catalog search (Type, Category, Campus Location, Date).
3. 100-Point Rule-Based Matching Engine with transparent diagnostic score cards.
4. Non-public proof submission for ownership claims to prevent fraudulent collections.
5. Client-side persistence using HTML5 `localStorage` with automated sample seeding and recovery controls.

## 6. AEIOU Framework Summary
Observational research conducted across campus zones identified:
- **Activities**: Rapid movement during 5-minute class breaks, depositing articles in lab racks.
- **Environments**: High-risk hotspots—Canteen, Central Library, Computer Labs, Main Gate.
- **Interactions**: Finder handover to custodial staff, loser negotiation of proof with security.
- **Objects**: ID cards, Casio calculators, thermosteel bottles, wallets, keys, wireless earphones.
- **Users**: Students, Lab Assistants, Security Officers, Administrative In-Charge.

## 7. Requirement Analysis
Functional requirements (FR-01 to FR-12) and Non-Functional requirements (NFR-01 to NFR-06) govern the system. Critical acceptance criteria focus on responsive rendering, client persistence without data loss, accurate algorithmic scoring on benchmark test pairs, and privacy preservation.

## 8. Feasibility Analysis
- **Technical Feasibility**: Native HTML5/CSS3/JS executes consistently on all contemporary browsers without runtime dependencies.
- **Economic Feasibility**: Zero server hosting costs or external API subscription requirements.
- **Operational Feasibility**: Intuitive campus-themed interface tailored specifically for college workflows.

## 9. System Design and UML Diagrams
The system architecture includes:
- **Use Case Models**: Covering reporting, catalog searching, algorithmic matching, claim filing, and admin moderation.
- **Activity Workflow**: Transitioning from incident occurrence to matching, claim filing, administrative review, and final recovery.
- **Sequence Diagram**: Documenting the interaction sequence among claimant, UI controllers, matching engine, and storage.
- *(Authoritative Mermaid models are documented in `docs/UML_DIAGRAMS.md` for reproduction in Lucidchart).*

## 10. UI/UX Design
The interface adopts a collegiate navy and slate palette (`#0f2b48`, `#1d4ed8`, `#f8fafc`), clean sans-serif typography, accessible contrast levels, responsive card grids, and mobile-friendly touch targets.

## 11. Technology Stack
- **HTML5**: Semantic document structuring.
- **CSS3**: Custom design tokens, Flexbox, Grid, Mobile-First media queries.
- **Vanilla JavaScript (ES6+)**: Business logic, DOM manipulation, storage controller.
- **Browser LocalStorage**: Zero-backend persistence.

## 12. Implementation
The solution is organized into modular files:
- `index.html`: Dashboard & recent items showcase.
- `pages/report-lost.html` & `pages/report-found.html`: Validated intake forms.
- `pages/browse.html`: Search and multi-criteria filter catalog.
- `pages/matches.html`: 100-point transparent algorithmic matcher.
- `pages/item-details.html`: Detailed inspection and private claim filing.
- `pages/my-reports.html`: Student personal dashboard.
- `pages/admin.html`: Moderator dashboard for claim resolution.

## 13. Testing and Results
A structured test suite of 14 test cases (`docs/TEST_PLAN.md`) covers input validation, persistence, matching accuracy, claim workflows, and multi-device viewport responsiveness. Empirical results are maintained in `docs/TEST_RESULTS.md`.

## 14. Limitations
Data is scoped to the local browser environment without cross-device synchronization; authentication is simulated for demo purposes; natural language matching relies on tokenized overlap rather than semantic embeddings.

## 15. Future Enhancements
- Transition to a cloud relational backend (PostgreSQL / Supabase).
- Integration with institutional student ERP / LDAP directories.
- Automated SMS / WhatsApp OTP claim verification.
- Campus map integration with interactive building pins.

## 16. Conclusion
The **Campus Lost-and-Found Matcher** prototype successfully demonstrates that a centralized, transparent, and privacy-conscious web application significantly improves the efficiency and security of managing lost and found articles across college campuses while strictly honoring academic software prototyping constraints.
