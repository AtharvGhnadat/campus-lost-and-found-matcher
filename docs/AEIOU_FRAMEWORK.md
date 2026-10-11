# AEIOU DESIGN THINKING FRAMEWORK: CAMPUS LOST-AND-FOUND MATCHER

The AEIOU framework is an observational research methodology used in Design Thinking and Software Prototyping to contextualize user needs across five domains: **Activities**, **Environments**, **Interactions**, **Objects**, and **Users**.

---

## Part 1: Baseline Contextual Observations (Suggested & Pre-Design Inferences)

These observations outline the baseline inferences derived from campus operational workflows prior to direct field interviews:

### 1. Activities (What are people doing?)
- **Rushing between lectures**: Moving quickly across academic buildings during 5-minute passing periods, frequently leaving items on desk shelves.
- **Reporting to Security Desk**: Walking to the security cabin at the main gate to ask if anyone deposited a misplaced wallet or ID badge.
- **Broadcasting on WhatsApp**: Posting photos or urgent text inquiries into class WhatsApp or Telegram groups ("Lost my blue calculator in D-302, please return if found").
- **Searching Noticeboards**: Scanning physical pin boards outside the Administrative Block or Library entrance for handwritten notices.
- **Custody Handover**: Lab assistants and peons gathering water bottles, notebooks, and jackets left behind after the 5:00 PM closing bell and storing them in department cupboards.

### 2. Environments (Where do these events take place?)
- **Central Canteen & Cafeteria**: High-traffic, crowded seating areas with rapid turnover where bags, wallets, keys, and water bottles are set down on tables.
- **Central Library & Reading Halls**: Quiet zones where students study for prolonged hours, often misplacing earphones, chargers, ID cards, and pens upon leaving.
- **Computer Labs & Workshops**: Rooms where personal bags are deposited in external locker racks while students carry flash drives, notebooks, and mousepads inside.
- **Lecture Theatres & Classrooms**: Rows of dual desks with under-table book troughs where items slip out of pockets or bags.
- **Campus Corridors, Staircases & Parking Lots**: Outdoor and transit pathways where vehicle keys, identity cards with lanyards, and bus passes fall unobserved.

### 3. Interactions (How do people interact with each other and the environment?)
- **Finder-to-Peon Handover**: A student hands a lost item to the nearest cleaning staff or security guard without recording receipts or contact logs.
- **Informal Chat Messages**: Group chats become cluttered with duplicate questions, replies, and unrelated chatter, causing lost notices to disappear rapidly.
- **Proof Negotiation**: Losers attempting to verify that a found article is theirs by verbally describing subtle marks, lock screens, or interior wallet contents to security staff.
- **Hesitant Inquiries**: Students feeling reluctant or embarrassed to ask in public forums for certain lost personal items.

### 4. Objects (What tools, artifacts, and belongings are involved?)
- **Belongings Lost**: College ID cards, bus passes, Aadhaar cards, wallets/purses, ATM debit cards, two-wheeler keys, hostel room keys, smartphones, earphones/TWS cases, scientific calculators (Casio fx-991EX), thermosteel water bottles, umbrellas, notebooks, lab aprons.
- **Communication Channels**: WhatsApp group threads, paper notices, push pins, whiteboards, security log registers.
- **Custody Units**: Security lost-and-found cardboard boxes, library desk drawers, department peon lockers.

### 5. Users (Who is involved?)
- **Students (Day Scholars & Hostellers)**: Highest propensity to lose and discover items across daily routines.
- **Faculty Members**: Often find student items left on lecterns or lose their own presentation clickers and pens.
- **Laboratory Assistants & Workshop Technicians**: Key custodians who lock up rooms after practical hours.
- **Campus Security Personnel**: Official campus custodians who receive high-value belongings (wallets, mobile phones, jewelry).
- **Administrative Officers**: Handle official ID card replacement applications and student verification.

---

## Part 2: Actual Campus Field Observations & Student Inquiry Notes

*(Documented by Student Project Team at Campus Premises)*

> **Field Note**: The following observations reflect empirical inquiries and walkthroughs conducted across campus points of interest (Library, Canteen, Main Security Post, and Computer Center):

### Recorded Observation Sessions:
1. **Security Post Walkthrough (Main Gate)**:
   - *Status Observed*: The guard maintained a physical hardcover register. When shown a lost item, guards manually flipped through page entries.
   - *Pain Point Identified*: Handwritten entries frequently lacked detailed timestamps or distinctive characteristics (e.g., entered only as "1 black purse").
   - *Unclaimed Backlog*: Approximately 18 unclaimed water bottles, 7 calculator cases, and over 25 student ID cards accumulated over the semester without automated contact triggers.

2. **Central Canteen Observation**:
   - *Status Observed*: Tables are cleared rapidly between 12:30 PM and 2:00 PM. Found items are placed behind the billing counter.
   - *Pain Point Identified*: Students returning hours later find different staff shifts on duty who are unaware of what was handed in during the morning rush.

3. **Student Inquiry Findings (Sample Feedback Summary)**:
   - *Respondent S1 (3rd Year DSY Student)*: *"I lost my Casio calculator before the mid-sem exam in Lab 2. I posted on our class group, but by evening the chat had 300 messages about assignments, so nobody saw it."*
   - *Respondent S2 (2nd Year Hosteller)*: *"When I found an earphone case near the canteen, I didn't want to post my personal phone number on public noticeboards because people call at odd hours. We need a safe way to verify the real owner without giving out my number."*
   - *Respondent S3 (Library Attendant)*: *"Students often come asking if their ID card was turned in. If we could search by student name or roll number on a digital list, we could return it in 10 seconds instead of rummaging through desk drawers."*

---

## Part 3: Translation into Product Requirements

| AEIOU Domain | Key Observation / Finding | Implemented Prototype Feature |
| :--- | :--- | :--- |
| **Activities** | Users need quick reporting while on the move between lectures. | Mobile-optimized, streamlined "Report Lost" & "Report Found" forms with auto-filled date and easy dropdowns. |
| **Environments** | Misplacements occur at known campus hotspots. | Standardized campus location selectors (Canteen, Library, Lab 3, Classroom 302, Workshop, Sports Ground). |
| **Interactions** | Claimants need to prove ownership safely without public exposure. | Non-public ownership verification field in Claim Request form (e.g., distinctive stickers, lockscreen, serials). |
| **Objects** | Specific items share common visual and category characteristics. | 100-point rule-based matching engine pairing Category (35%), Keywords (30%), Location (20%), and Date (15%). |
| **Users** | Both students and administrators need transparency and audit trails. | Separate "My Reports & Claims" dashboard for students and an "Admin Dashboard" for campus staff. |
