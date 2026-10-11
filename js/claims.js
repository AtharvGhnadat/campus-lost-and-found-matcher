/**
 * Campus Lost-and-Found Matcher — Claims & User Activity Controller
 * Manages item details view, claim submission with non-public proof,
 * and the user's personal reports/claims tracking view.
 */

const ClaimsController = {
  /**
   * Initializes Item Details view & inline Claim form
   */
  initItemDetails() {
    const container = document.getElementById('item-details-container');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    if (!itemId) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No report specified</h3>
          <p>Please return to the catalog and select an item to view its details.</p>
          <a href="browse.html" class="btn btn-primary">Browse Catalog</a>
        </div>
      `;
      return;
    }

    const item = window.StorageService.getReportById(itemId);
    if (!item) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>Report not found</h3>
          <p>The requested campus report may have been removed or does not exist.</p>
          <a href="browse.html" class="btn btn-primary">Browse Catalog</a>
        </div>
      `;
      return;
    }

    const currentUser = window.StorageService.getCurrentUser();
    const fallbackImg = window.App.getFallbackImage(item.category);
    const itemImg = item.image || fallbackImg;

    const typeBadge = item.type === 'lost' 
      ? '<span class="badge badge-lost">LOST ITEM REPORT</span>' 
      : '<span class="badge badge-found">FOUND ITEM REPORT</span>';

    let statusBadgeClass = 'badge-open';
    if (item.status === 'Claimed') statusBadgeClass = 'badge-claimed';
    if (item.status === 'Resolved') statusBadgeClass = 'badge-resolved';

    // Check if current user already submitted a claim on this item
    const existingClaims = window.StorageService.getClaims();
    const userClaim = existingClaims.find(c => c.reportId === item.id && c.claimantId === currentUser.id);

    container.innerHTML = `
      <div class="details-layout-grid">
        <!-- Left: Item Public Details Card -->
        <div class="card" style="height: fit-content;">
          <div class="item-card-media" style="height: 280px;">
            <img src="${itemImg}" alt="${item.title}" onerror="this.onerror=null; this.src='${fallbackImg}';">
            <div class="card-badge-overlay">${typeBadge}</div>
            <div class="card-status-overlay">
              <span class="badge ${statusBadgeClass}">Status: ${item.status}</span>
            </div>
          </div>
          <div class="card-body">
            <span class="card-category">${item.category}</span>
            <h1 class="card-title" style="font-size: 1.5rem; margin-bottom: 0.75rem;">${item.title}</h1>
            <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">${item.description}</p>
            
            <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.5rem;">
              <h4 style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.6rem;">Incident Metadata</h4>
              <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;">
                <div><strong>Campus Location:</strong> ${item.location}</div>
                <div><strong>Incident Date:</strong> ${window.App.formatDate(item.date)}</div>
                ${item.safeLocation ? `<div><strong>Safe Handover Spot:</strong> <span style="color: var(--color-found); font-weight: 600;">${item.safeLocation}</span></div>` : ''}
                ${item.identifyingTraits ? `<div><strong>Public Identifying Traits:</strong> ${item.identifyingTraits}</div>` : ''}
                <div><strong>Report Reference:</strong> <code>${item.id}</code></div>
              </div>
            </div>

            <div style="display: flex; gap: 0.75rem;">
              <a href="browse.html" class="btn btn-secondary btn-sm">← Back to Catalog</a>
              <a href="matches.html?lostId=${item.id}" class="btn btn-secondary btn-sm" ${item.type === 'lost' ? '' : 'style="display:none;"'}>Check Possible Matches</a>
            </div>
          </div>
        </div>

        <!-- Right: Claim Submission or Status Section -->
        <div>
          ${item.type === 'found' ? `
            <div class="card" id="claim" style="padding: 1.5rem;">
              <h2 style="font-size: 1.3rem; color: var(--color-primary); margin-bottom: 0.5rem;">Ownership Claim Request</h2>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                Think this belonging is yours? Submit a claim request with details to help verify ownership. Private verification traits will <strong>never</strong> be displayed publicly.
              </p>

              ${userClaim ? `
                <div class="alert alert-${userClaim.status === 'Approved' ? 'success' : (userClaim.status === 'Rejected' ? 'danger' : 'warning')}">
                  <div>
                    <strong>Your Claim Status: ${userClaim.status.toUpperCase()}</strong>
                    <div style="margin-top: 0.35rem; font-size: 0.86rem;">
                      Submitted on: ${window.App.formatDate(userClaim.createdAt.split('T')[0])}
                    </div>
                    ${userClaim.adminNotes ? `<div style="margin-top: 0.35rem;"><strong>Admin Remarks:</strong> ${userClaim.adminNotes}</div>` : ''}
                  </div>
                </div>
              ` : (item.status === 'Open' ? `
                <form id="claim-form" style="display: flex; flex-direction: column; gap: 1rem;">
                  <div class="form-group">
                    <label class="form-label" for="claimant-name">Your Full Name <span class="required-mark">*</span></label>
                    <input type="text" id="claimant-name" class="form-control" value="${currentUser.name}" required>
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="claimant-roll">Student Roll / Staff ID <span class="required-mark">*</span></label>
                    <input type="text" id="claimant-roll" class="form-control" value="${currentUser.rollNumber}" required>
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="claim-reason">Circumstance / Explanation <span class="required-mark">*</span></label>
                    <textarea id="claim-reason" class="form-control" placeholder="Describe when and how you misplaced this item on campus..." required minlength="10"></textarea>
                    <span class="form-hint">Briefly explain where you were prior to noticing the item missing.</span>
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="claim-private-proof">
                      Non-Public Proof of Ownership <span class="required-mark">*</span>
                    </label>
                    <textarea id="claim-private-proof" class="form-control" placeholder="Hidden identification: wallpaper image, interior cards, scratch marks, serial number..." required minlength="8"></textarea>
                    <span class="form-hint" style="color: var(--color-accent);">
                      🔒 Kept confidential. Only authorized campus administration/security can inspect this proof to verify ownership.
                    </span>
                  </div>

                  <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem;">Submit Claim for Verification</button>
                </form>
              ` : `
                <div class="alert alert-info">
                  This item is currently marked <strong>${item.status}</strong> and is not accepting new claims.
                </div>
              `)}
            </div>
          ` : `
            <div class="card" style="padding: 1.5rem;">
              <h2 style="font-size: 1.3rem; color: var(--color-primary); margin-bottom: 0.5rem;">Item Resolution Status</h2>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                This report is filed under <strong>Lost Items</strong>. Check the matching engine to see if anyone has deposited a corresponding article.
              </p>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <a href="matches.html?lostId=${item.id}" class="btn btn-primary">Find Suggested Matches for This Item</a>
                <a href="browse.html?type=found&search=${encodeURIComponent(item.title.split(' ')[0])}" class="btn btn-secondary">Search Found Items Catalog</a>
              </div>
            </div>
          `}
        </div>
      </div>
    `;

    // Bind claim form submission
    const claimForm = document.getElementById('claim-form');
    if (claimForm) {
      claimForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const claimantName = document.getElementById('claimant-name').value.trim();
        const claimantRoll = document.getElementById('claimant-roll').value.trim();
        const claimReason = document.getElementById('claim-reason').value.trim();
        const privateProof = document.getElementById('claim-private-proof').value.trim();

        if (!claimantName || !claimantRoll || !claimReason || !privateProof) {
          alert('Please fill out all required fields before submitting your claim.');
          return;
        }

        const newClaim = {
          id: `clm-${Date.now().toString().slice(-4)}`,
          reportId: item.id,
          lostReportId: null,
          claimantId: currentUser.id,
          claimantName,
          claimantRoll,
          reason: claimReason,
          privateProof,
          status: 'Pending',
          adminNotes: '',
          createdAt: new Date().toISOString(),
          resolvedAt: null
        };

        window.StorageService.saveClaim(newClaim);
        window.App.showToast('Claim submitted! Campus administration will review your non-public proof.', 'success');
        setTimeout(() => this.initItemDetails(), 800);
      });
    }
  },

  /**
   * Initializes My Reports & Claims Dashboard (`pages/my-reports.html`)
   */
  initMyReportsDashboard() {
    const reportsList = document.getElementById('my-reports-list');
    const claimsList = document.getElementById('my-claims-list');
    if (!reportsList || !claimsList) return;

    const currentUser = window.StorageService.getCurrentUser();
    const allReports = window.StorageService.getReports();
    const allClaims = window.StorageService.getClaims();

    // Filter user's created reports
    const myReports = allReports.filter(r => r.reporterId === currentUser.id);
    // Filter user's filed claims
    const myClaims = allClaims.filter(c => c.claimantId === currentUser.id);

    // Render My Reports
    if (myReports.length === 0) {
      reportsList.innerHTML = `
        <div class="empty-state">
          <h3>No reports logged yet</h3>
          <p>You haven't reported any lost or found items under this profile.</p>
          <div style="display:flex; justify-content:center; gap:0.5rem;">
            <a href="report-lost.html" class="btn btn-lost btn-sm">Report Lost</a>
            <a href="report-found.html" class="btn btn-found btn-sm">Report Found</a>
          </div>
        </div>
      `;
    } else {
      reportsList.innerHTML = myReports.map(item => `
        <div class="card" style="margin-bottom: 1rem; padding: 1.25rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; flex-wrap:wrap;">
            <div>
              <div style="display:flex; gap:0.5rem; margin-bottom:0.35rem;">
                <span class="badge badge-${item.type}">${item.type.toUpperCase()}</span>
                <span class="badge ${item.status === 'Resolved' ? 'badge-resolved' : (item.status === 'Claimed' ? 'badge-claimed' : 'badge-open')}">${item.status}</span>
              </div>
              <h3 style="font-size:1.15rem; font-weight:600; margin-bottom:0.25rem;">${item.title}</h3>
              <div style="font-size:0.85rem; color:var(--text-muted);">
                ${item.location} • Reported on ${window.App.formatDate(item.date)}
              </div>
            </div>
            <div style="display:flex; gap:0.5rem; align-items:center;">
              <a href="item-details.html?id=${item.id}" class="btn btn-secondary btn-sm">View Details</a>
              ${item.status !== 'Resolved' ? `
                <button class="btn btn-primary btn-sm" onclick="ClaimsController.markItemRecovered('${item.id}')">Mark as Recovered</button>
              ` : `
                <span style="font-size:0.85rem; color:var(--color-success); font-weight:600;">✓ Recovered</span>
              `}
            </div>
          </div>
        </div>
      `).join('');
    }

    // Render My Claims
    if (myClaims.length === 0) {
      claimsList.innerHTML = `
        <div class="empty-state">
          <h3>No claim requests submitted</h3>
          <p>When you discover your item in the Found catalog, submit a claim with your proof of ownership.</p>
          <a href="browse.html?type=found" class="btn btn-secondary btn-sm">Browse Found Items</a>
        </div>
      `;
    } else {
      claimsList.innerHTML = myClaims.map(claim => {
        const item = window.StorageService.getReportById(claim.reportId);
        const itemTitle = item ? item.title : `Report #${claim.reportId}`;

        let statusClass = 'badge-open';
        if (claim.status === 'Approved') statusClass = 'badge-resolved';
        if (claim.status === 'Rejected') statusClass = 'badge-lost';

        return `
          <div class="card" style="margin-bottom: 1rem; padding: 1.25rem;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; flex-wrap:wrap;">
              <div>
                <div style="margin-bottom:0.35rem;">
                  <span class="badge ${statusClass}">Claim: ${claim.status.toUpperCase()}</span>
                </div>
                <h3 style="font-size:1.15rem; font-weight:600; margin-bottom:0.25rem;">${itemTitle}</h3>
                <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.5rem;">
                  Claim ID: <code>${claim.id}</code> • Submitted: ${window.App.formatDate(claim.createdAt.split('T')[0])}
                </div>
                <div style="font-size:0.88rem; color:var(--text-main); background:var(--bg-subtle); padding:0.6rem 0.8rem; border-radius:var(--radius-sm);">
                  <strong>Your Stated Justification:</strong> "${claim.reason}"
                </div>
                ${claim.adminNotes ? `
                  <div style="font-size:0.85rem; color:var(--color-primary); margin-top:0.4rem;">
                    <strong>Admin Note:</strong> ${claim.adminNotes}
                  </div>
                ` : ''}
              </div>
              <div>
                ${item ? `<a href="item-details.html?id=${item.id}" class="btn btn-secondary btn-sm">View Item</a>` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  },

  /**
   * Action to mark an item as recovered
   */
  markItemRecovered(itemId) {
    if (confirm('Confirm marking this item as recovered and resolved?')) {
      window.StorageService.updateReport(itemId, { status: 'Resolved' });
      window.App.showToast('Item marked as successfully recovered!', 'success');
      this.initMyReportsDashboard();
    }
  }
};

window.ClaimsController = ClaimsController;
