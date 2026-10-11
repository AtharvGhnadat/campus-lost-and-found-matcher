/**
 * Campus Lost-and-Found Matcher — Administrator Moderation Portal
 * Controls KPI statistics aggregation, claim approvals/rejections,
 * report status updates, deletion of test records, and demo reseeding.
 */

const AdminController = {
  init() {
    this.renderKPIStats();
    this.renderPendingClaimsTable();
    this.renderReportsManagementTable();
    this.setupAdminSearch();
  },

  /**
   * Aggregates and renders summary metrics
   */
  renderKPIStats() {
    const reports = window.StorageService.getReports();
    const claims = window.StorageService.getClaims();

    const totalReports = reports.length;
    const openLost = reports.filter(r => r.type === 'lost' && r.status === 'Open').length;
    const openFound = reports.filter(r => r.type === 'found' && r.status === 'Open').length;
    const pendingClaims = claims.filter(c => c.status === 'Pending').length;
    const resolvedItems = reports.filter(r => r.status === 'Resolved').length;

    const elTotal = document.getElementById('stat-total-reports');
    const elLost = document.getElementById('stat-open-lost');
    const elFound = document.getElementById('stat-open-found');
    const elPending = document.getElementById('stat-pending-claims');
    const elResolved = document.getElementById('stat-resolved-reports');

    if (elTotal) elTotal.textContent = totalReports;
    if (elLost) elLost.textContent = openLost;
    if (elFound) elFound.textContent = openFound;
    if (elPending) elPending.textContent = pendingClaims;
    if (elResolved) elResolved.textContent = resolvedItems;
  },

  /**
   * Renders the table of pending and resolved claims
   */
  renderPendingClaimsTable() {
    const tbody = document.getElementById('admin-claims-tbody');
    if (!tbody) return;

    const claims = window.StorageService.getClaims();
    if (claims.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">
            No claim requests submitted yet.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = claims.map(claim => {
      const item = window.StorageService.getReportById(claim.reportId);
      const itemTitle = item ? item.title : `Report #${claim.reportId}`;

      let statusBadge = '<span class="badge badge-open">PENDING</span>';
      if (claim.status === 'Approved') statusBadge = '<span class="badge badge-resolved">APPROVED</span>';
      if (claim.status === 'Rejected') statusBadge = '<span class="badge badge-lost">REJECTED</span>';

      return `
        <tr>
          <td><code>${claim.id}</code></td>
          <td>
            <strong>${itemTitle}</strong>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Ref: ${claim.reportId}</div>
          </td>
          <td>
            ${claim.claimantName}
            <div style="font-size: 0.78rem; color: var(--text-muted);">${claim.claimantRoll}</div>
          </td>
          <td>
            <div style="font-size: 0.85rem; line-height: 1.4;">
              <div><strong>Stated Reason:</strong> ${claim.reason}</div>
              <div style="margin-top: 0.35rem; color: #b45309; background: #fffbeb; padding: 0.3rem 0.5rem; border-radius: 4px; border: 1px dashed #fde68a;">
                <strong>Non-Public Proof:</strong> ${claim.privateProof}
              </div>
            </div>
          </td>
          <td>${statusBadge}</td>
          <td>
            ${claim.status === 'Pending' ? `
              <div style="display: flex; gap: 0.4rem;">
                <button class="btn btn-found btn-sm" onclick="AdminController.handleApproveClaim('${claim.id}')">Approve</button>
                <button class="btn btn-outline-danger btn-sm" onclick="AdminController.handleRejectClaim('${claim.id}')">Reject</button>
              </div>
            ` : `
              <span style="font-size: 0.8rem; color: var(--text-muted);">${claim.adminNotes || 'Reviewed'}</span>
            `}
          </td>
        </tr>
      `;
    }).join('');
  },

  /**
   * Approves a claim
   */
  handleApproveClaim(claimId) {
    const note = prompt('Optional administrator notes (e.g., "Verified ID badge in person at Security Desk"):', 'Verified ownership details in person');
    if (note !== null) {
      window.StorageService.updateClaimStatus(claimId, 'Approved', note);
      window.App.showToast('Claim approved and item marked as Claimed!', 'success');
      this.init();
    }
  },

  /**
   * Rejects a claim
   */
  handleRejectClaim(claimId) {
    const note = prompt('Reason for rejecting claim (e.g., "Provided incorrect interior card details"):', 'Proof provided did not match item attributes');
    if (note !== null) {
      window.StorageService.updateClaimStatus(claimId, 'Rejected', note);
      window.App.showToast('Claim rejected.', 'info');
      this.init();
    }
  },

  /**
   * Renders the master reports management table
   */
  renderReportsManagementTable(filterQuery = '') {
    const tbody = document.getElementById('admin-reports-tbody');
    if (!tbody) return;

    let reports = window.StorageService.getReports();

    if (filterQuery) {
      const q = filterQuery.toLowerCase();
      reports = reports.filter(r => 
        r.title.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
      );
    }

    if (reports.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">
            No campus reports found.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = reports.map(item => {
      const typeBadge = item.type === 'lost' 
        ? '<span class="badge badge-lost">LOST</span>' 
        : '<span class="badge badge-found">FOUND</span>';

      let statusBadge = '<span class="badge badge-open">OPEN</span>';
      if (item.status === 'Claimed') statusBadge = '<span class="badge badge-claimed">CLAIMED</span>';
      if (item.status === 'Resolved') statusBadge = '<span class="badge badge-resolved">RESOLVED</span>';

      return `
        <tr>
          <td><code>${item.id}</code></td>
          <td>${typeBadge}</td>
          <td>
            <strong>${item.title}</strong>
            <div style="font-size: 0.78rem; color: var(--text-muted);">${item.category}</div>
          </td>
          <td>${item.location}</td>
          <td>${window.App.formatDate(item.date)}</td>
          <td>${statusBadge}</td>
          <td>
            <div style="display: flex; gap: 0.4rem;">
              <a href="item-details.html?id=${item.id}" class="btn btn-secondary btn-sm" target="_blank">View</a>
              ${item.status !== 'Resolved' ? `
                <button class="btn btn-primary btn-sm" onclick="AdminController.handleMarkReportResolved('${item.id}')">Resolve</button>
              ` : ''}
              <button class="btn btn-outline-danger btn-sm" onclick="AdminController.handleDeleteReport('${item.id}')">Delete</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  /**
   * Marks a report as resolved
   */
  handleMarkReportResolved(reportId) {
    if (confirm('Mark this report as resolved/archived?')) {
      window.StorageService.updateReport(reportId, { status: 'Resolved' });
      window.App.showToast('Report marked as Resolved!', 'success');
      this.init();
    }
  },

  /**
   * Deletes a report
   */
  handleDeleteReport(reportId) {
    if (confirm('Are you sure you want to delete this demo report from storage?')) {
      window.StorageService.deleteReport(reportId);
      window.App.showToast('Report removed from storage.', 'info');
      this.init();
    }
  },

  /**
   * Search input listener for admin reports table
   */
  setupAdminSearch() {
    const searchInput = document.getElementById('admin-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.renderReportsManagementTable(e.target.value.trim());
      });
    }
  }
};

window.AdminController = AdminController;
