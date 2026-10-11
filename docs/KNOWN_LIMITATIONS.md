# KNOWN LIMITATIONS & PROTOTYPE BOUNDARIES
## Campus Lost-and-Found Matcher

This document details the intentional boundaries, known technical limitations, and scope constraints of the **Campus Lost-and-Found Matcher** prototype as developed for the Software Prototyping (SP) practical curriculum.

---

## 1. Data Storage & Multi-Device Synchronization
- **Browser-Scoped Storage**: The prototype stores all report and claim entities within the client browser's `localStorage`. Consequently, records created in one browser (e.g., Chrome on Laptop A) are not visible on another device (e.g., Mobile Phone B) without an export/import mechanism.
- **Storage Size Limits**: Standard browser `localStorage` is capped at approximately 5MB to 10MB per origin. Uploading numerous high-resolution photos converted into Base64 Data URLs can exhaust available quota in extended testing sessions. A built-in image size constraint and the "Reset Demo Data" function mitigate this in prototype demonstrations.
- **Cache Clearing Vulnerability**: Clearing browser cache or operating in incognito/private browsing mode wipes out customized entries.

---

## 2. Authentication and Authorization
- **Simulated Role Architecture**: To comply strictly with the no-backend / zero-framework policy, the application does not include server-side cryptographic authentication (e.g., JWT, OAuth2, campus SSO LDAP).
- **Client-Side Admin Mode**: The Administrator Dashboard operates via client-side routing. In an enterprise production deployment, administrative endpoints would be gated behind hardened role-based access control (RBAC) and session tokens.
- **Demo User Identity**: The claimant persona operates under a pre-configured demo student profile (`usr-student-01` — Aarav Sharma) for deterministic demonstration of personal dashboards and claim submissions.

---

## 3. Algorithmic Heuristic Matching Limitations
- **Syntactic vs. Semantic Natural Language Understanding**: The keyword matching engine uses tokenization, case-normalization, and stopword removal. While transparent and deterministic, it does not use heavyweight neural embeddings (e.g. BERT/Sentence-Transformers) and therefore cannot infer semantic equivalence between distinct synonyms unless keywords overlap.
- **Heuristic Disclaimer**: A high score (e.g., 90/100) indicates correlation between logged attributes, never conclusive proof of ownership. Claim validation remains human-gated via the non-public proof field.

---

## 4. Notifications & Live Communication
- **No Push / SMS / Email Gateway**: As there is no backend server or third-party paid SMS gateway (Twilio, SendGrid), notification updates are presented via in-app banners, status badges, and dashboard updates rather than external mobile alerts.
- **Real-Time WebSockets**: Live multi-client pushes are not implemented; users see updates upon refreshing or navigating between views.

---

## 5. Production Transition Roadmap
To transition this prototype into a campus-wide production enterprise service, the following additions would be implemented:
1. Migration of `js/storage.js` to a RESTful API backed by PostgreSQL or Supabase.
2. Integration with college ERP / Active Directory LDAP for official student roll number verification.
3. Automated cloud image compression and S3 bucket storage.
4. WhatsApp / SMS OTP dispatch for safe finder-loser claim verification.
