/**
 * Campus Lost-and-Found Matcher — Data Storage & Persistence Layer
 * Implements browser localStorage management, initial test seeds,
 * and data integrity error recovery.
 */

const STORAGE_KEYS = {
  REPORTS: 'clf_reports_data_v1',
  CLAIMS: 'clf_claims_data_v1',
  CURRENT_USER: 'clf_current_user_v1'
};

// Default Demo User (Student)
const DEFAULT_USER = {
  id: 'usr-student-01',
  name: 'Aarav Sharma',
  rollNumber: 'DSY2026-42',
  email: 'aarav.sharma@mitaoe.edu.in',
  role: 'student'
};

// Default Realistic Seed Data (Indian Campus Setting)
const DEFAULT_SEED_REPORTS = [
  {
    id: 'rep-lost-101',
    type: 'lost',
    title: 'Black WildHorn Leather Wallet',
    category: 'Wallets & Bags',
    description: 'Black bi-fold leather wallet lost during lunch break. Contains student ID card, college bus pass, and ₹400 cash.',
    location: 'Central Canteen',
    date: '2026-10-09',
    image: 'assets/images/fallback-wallet.svg',
    identifyingTraits: 'Silver metal WildHorn logo embossed on corner, tiny tear on coin pocket seam.',
    safeLocation: '',
    status: 'Open',
    reporterId: 'usr-student-01',
    reporterName: 'Aarav Sharma',
    createdAt: '2026-10-09T13:45:00Z'
  },
  {
    id: 'rep-found-201',
    type: 'found',
    title: 'Black Leather Wallet with ID Card',
    category: 'Wallets & Bags',
    description: 'Found black leather bi-fold wallet left behind on table 4 near main canteen counter.',
    location: 'Central Canteen',
    date: '2026-10-09',
    image: 'assets/images/fallback-wallet.svg',
    identifyingTraits: '',
    safeLocation: 'Canteen Billing Counter / Security Desk Gate 1',
    status: 'Open',
    reporterId: 'usr-student-02',
    reporterName: 'Priya Deshmukh',
    createdAt: '2026-10-09T14:10:00Z'
  },
  {
    id: 'rep-found-202',
    type: 'found',
    title: 'Milton Thermosteel Water Bottle (Silver)',
    category: 'Personal Accessories',
    description: 'Silver stainless steel insulated Milton 750ml water bottle found on 2nd floor reading table.',
    location: 'Central Library',
    date: '2026-10-08',
    image: 'assets/images/fallback-bottle.svg',
    identifyingTraits: '',
    safeLocation: 'Library Reception Desk',
    status: 'Open',
    reporterId: 'usr-staff-01',
    reporterName: 'Suresh Patil (Library Attendant)',
    createdAt: '2026-10-08T17:30:00Z'
  },
  {
    id: 'rep-lost-102',
    type: 'lost',
    title: 'Hostel Room & Hero Splendor Bike Keys',
    category: 'Keys & Locks',
    description: 'Ring of 3 brass keys with blue rubber Marvel Captain America shield keychain lost between Classroom 302 and corridor.',
    location: 'Academic Block A (Classrooms)',
    date: '2026-10-10',
    image: 'assets/images/fallback-keys.svg',
    identifyingTraits: 'Captain America shield keychain has faint scratches on edge.',
    safeLocation: '',
    status: 'Open',
    reporterId: 'usr-student-03',
    reporterName: 'Rohan Verma',
    createdAt: '2026-10-10T11:20:00Z'
  },
  {
    id: 'rep-found-203',
    type: 'found',
    title: 'OnePlus Bullets Wireless Z Earphones',
    category: 'Electronics & Gadgets',
    description: 'Black neckband earphones found plugged into desktop CPU terminal 14 after afternoon practical.',
    location: 'Computer Center (Lab 3)',
    date: '2026-10-07',
    image: 'assets/images/fallback-earphones.svg',
    identifyingTraits: '',
    safeLocation: 'Lab Assistant Cabin - Lab 3',
    status: 'Open',
    reporterId: 'usr-staff-02',
    reporterName: 'Deepak More (Lab Tech)',
    createdAt: '2026-10-07T16:45:00Z'
  },
  {
    id: 'rep-lost-103',
    type: 'lost',
    title: 'MITAOE College Student Smart ID Card',
    category: 'ID & Cards',
    description: 'Blue lanyard with laminated smart RFID identity card lost near basketball court during evening sports practice.',
    location: 'Sports Ground',
    date: '2026-10-06',
    image: 'assets/images/fallback-card.svg',
    identifyingTraits: 'Mechanical Engg badge printed on reverse side.',
    safeLocation: '',
    status: 'Resolved',
    reporterId: 'usr-student-04',
    reporterName: 'Neha Kulkarni',
    createdAt: '2026-10-06T18:15:00Z'
  }
];

// Sample Initial Claim
const DEFAULT_SEED_CLAIMS = [
  {
    id: 'clm-001',
    reportId: 'rep-found-201',
    lostReportId: 'rep-lost-101',
    claimantId: 'usr-student-01',
    claimantName: 'Aarav Sharma',
    claimantRoll: 'DSY2026-42',
    reason: 'I accidentally left my wallet on canteen table 4 right after paying for tea at 1:40 PM.',
    privateProof: 'Inside the wallet is my DSY Roll No slip, an SBI ATM card ending with 4102, and a folded canteen coupon.',
    status: 'Pending',
    adminNotes: '',
    createdAt: '2026-10-09T15:00:00Z',
    resolvedAt: null
  }
];

const StorageService = {
  /**
   * Initializes local storage with seed data if not present or corrupt
   */
  init() {
    try {
      const storedReports = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (!storedReports) {
        this.resetToDefaults();
      } else {
        // Validate JSON
        JSON.parse(storedReports);
      }

      if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USER));
      }
    } catch (err) {
      console.warn('Storage corrupt or unavailable. Resetting to defaults.', err);
      this.resetToDefaults();
    }
  },

  /**
   * Resets local storage to clean seed state
   */
  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(DEFAULT_SEED_REPORTS));
    localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(DEFAULT_SEED_CLAIMS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USER));
    return true;
  },

  /**
   * Get all reports
   */
  getReports() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to parse reports:', e);
      return DEFAULT_SEED_REPORTS;
    }
  },

  /**
   * Get single report by ID
   */
  getReportById(id) {
    const reports = this.getReports();
    return reports.find(r => r.id === id) || null;
  },

  /**
   * Add a new report
   */
  saveReport(report) {
    const reports = this.getReports();
    reports.unshift(report);
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    return report;
  },

  /**
   * Update existing report
   */
  updateReport(id, updates) {
    const reports = this.getReports();
    const index = reports.findIndex(r => r.id === id);
    if (index !== -1) {
      reports[index] = { ...reports[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
      return reports[index];
    }
    return null;
  },

  /**
   * Delete report
   */
  deleteReport(id) {
    let reports = this.getReports();
    reports = reports.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    return true;
  },

  /**
   * Get all claims
   */
  getClaims() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLAIMS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return DEFAULT_SEED_CLAIMS;
    }
  },

  /**
   * Save a claim
   */
  saveClaim(claim) {
    const claims = this.getClaims();
    claims.unshift(claim);
    localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(claims));
    return claim;
  },

  /**
   * Update a claim status
   */
  updateClaimStatus(claimId, status, adminNotes = '') {
    const claims = this.getClaims();
    const claim = claims.find(c => c.id === claimId);
    if (claim) {
      claim.status = status;
      claim.adminNotes = adminNotes;
      claim.resolvedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(claims));

      // If approved, update associated report status to 'Claimed'
      if (status === 'Approved' && claim.reportId) {
        this.updateReport(claim.reportId, { status: 'Claimed' });
        if (claim.lostReportId) {
          this.updateReport(claim.lostReportId, { status: 'Claimed' });
        }
      }
      return claim;
    }
    return null;
  },

  /**
   * Get Current User
   */
  getCurrentUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : DEFAULT_USER;
    } catch (e) {
      return DEFAULT_USER;
    }
  }
};

// Initialize on script load
StorageService.init();

// Export to window for vanilla JS access
window.StorageService = StorageService;
window.DEFAULT_USER = DEFAULT_USER;
