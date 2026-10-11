/**
 * Campus Lost-and-Found Matcher — Report Forms & Catalog Controller
 * Manages form validation, image file-to-DataURL conversion,
 * live multi-criteria catalog search and rendering.
 */

const ReportsController = {
  /**
   * Initializes "Report Lost Item" Form
   */
  initReportLostForm() {
    const form = document.getElementById('report-lost-form');
    if (!form) return;

    this.setupImageUploadPreview('item-image', 'upload-preview-container');
    this.setDefaultMaxDate('item-date');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.validateForm(form)) return;

      const currentUser = window.StorageService.getCurrentUser();
      const imagePreview = document.getElementById('preview-img-element');

      const newReport = {
        id: `rep-lost-${Date.now()}`,
        type: 'lost',
        title: form['item-title'].value.trim(),
        category: form['item-category'].value,
        description: form['item-description'].value.trim(),
        location: form['item-location'].value,
        date: form['item-date'].value,
        image: imagePreview ? imagePreview.src : window.App.getFallbackImage(form['item-category'].value),
        identifyingTraits: form['item-traits'] ? form['item-traits'].value.trim() : '',
        safeLocation: '',
        status: 'Open',
        reporterId: currentUser.id,
        reporterName: currentUser.name,
        createdAt: new Date().toISOString()
      };

      window.StorageService.saveReport(newReport);
      
      const successBox = document.getElementById('form-success-box');
      if (successBox) {
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth' });
        form.reset();
        const preview = document.getElementById('upload-preview-container');
        if (preview) preview.innerHTML = '';
      } else {
        window.App.showToast('Lost item report submitted successfully!', 'success');
        setTimeout(() => {
          window.location.href = `browse.html?type=lost&id=${newReport.id}`;
        }, 1200);
      }
    });
  },

  /**
   * Initializes "Report Found Item" Form
   */
  initReportFoundForm() {
    const form = document.getElementById('report-found-form');
    if (!form) return;

    this.setupImageUploadPreview('item-image', 'upload-preview-container');
    this.setDefaultMaxDate('item-date');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.validateForm(form)) return;

      const currentUser = window.StorageService.getCurrentUser();
      const imagePreview = document.getElementById('preview-img-element');

      const newReport = {
        id: `rep-found-${Date.now()}`,
        type: 'found',
        title: form['item-title'].value.trim(),
        category: form['item-category'].value,
        description: form['item-description'].value.trim(),
        location: form['item-location'].value,
        date: form['item-date'].value,
        image: imagePreview ? imagePreview.src : window.App.getFallbackImage(form['item-category'].value),
        identifyingTraits: '',
        safeLocation: form['item-safe-location'].value.trim() || 'Campus Security Cabin / Main Gate',
        status: 'Open',
        reporterId: currentUser.id,
        reporterName: currentUser.name,
        createdAt: new Date().toISOString()
      };

      window.StorageService.saveReport(newReport);

      const successBox = document.getElementById('form-success-box');
      if (successBox) {
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth' });
        form.reset();
        const preview = document.getElementById('upload-preview-container');
        if (preview) preview.innerHTML = '';
      } else {
        window.App.showToast('Found item report recorded successfully!', 'success');
        setTimeout(() => {
          window.location.href = `browse.html?type=found&id=${newReport.id}`;
        }, 1200);
      }
    });
  },

  /**
   * Prevents future dates in input
   */
  setDefaultMaxDate(elementId) {
    const input = document.getElementById(elementId);
    if (input) {
      const today = new Date().toISOString().split('T')[0];
      input.max = today;
      input.value = today;
    }
  },

  /**
   * File upload preview handler converting local image to Data URL
   */
  setupImageUploadPreview(inputId, containerId) {
    const fileInput = document.getElementById(inputId);
    const container = document.getElementById(containerId);
    if (!fileInput || !container) return;

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) {
        container.innerHTML = '';
        return;
      }

      // 2MB size safeguard
      if (file.size > 2 * 1024 * 1024) {
        alert('Image exceeds 2MB limit. Please select a smaller photo or use the default icon.');
        fileInput.value = '';
        container.innerHTML = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        container.innerHTML = `
          <div class="upload-preview-wrapper">
            <img id="preview-img-element" src="${event.target.result}" alt="Preview" class="upload-preview-img">
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              <div><strong>Photo selected:</strong> ${file.name}</div>
              <button type="button" class="btn btn-sm btn-secondary" style="margin-top:0.4rem;" onclick="ReportsController.clearPhotoUpload('${inputId}', '${containerId}')">Remove Photo</button>
            </div>
          </div>
        `;
      };
      reader.readAsDataURL(file);
    });
  },

  clearPhotoUpload(inputId, containerId) {
    const fileInput = document.getElementById(inputId);
    const container = document.getElementById(containerId);
    if (fileInput) fileInput.value = '';
    if (container) container.innerHTML = '';
  },

  /**
   * Validates form inputs, highlighting failures
   */
  validateForm(form) {
    let isValid = true;
    const requiredInputs = form.querySelectorAll('[required]');

    requiredInputs.forEach(input => {
      const val = input.value.trim();
      let inputValid = true;

      if (!val) {
        inputValid = false;
      } else if (input.id === 'item-title' && val.length < 3) {
        inputValid = false;
      } else if (input.id === 'item-description' && val.length < 10) {
        inputValid = false;
      }

      if (!inputValid) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }

      input.addEventListener('input', () => {
        if (input.value.trim()) input.classList.remove('is-invalid');
      }, { once: true });
    });

    return isValid;
  },

  /**
   * Initializes Browse Page Catalog with dynamic filter & search
   */
  initBrowseCatalog() {
    const catalogContainer = document.getElementById('catalog-grid');
    if (!catalogContainer) return;

    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('filter-category');
    const locationFilter = document.getElementById('filter-location');
    const statusFilter = document.getElementById('filter-status');
    const typeButtons = document.querySelectorAll('[data-type-filter]');
    const resultsCount = document.getElementById('results-count');

    // Parse URL query parameters if present (e.g. ?type=lost&search=wallet)
    const urlParams = new URLSearchParams(window.location.search);
    let activeType = urlParams.get('type') || 'all';
    const initialSearch = urlParams.get('search') || '';

    if (searchInput && initialSearch) {
      searchInput.value = initialSearch;
    }

    // Set initial active type button
    typeButtons.forEach(btn => {
      if (btn.getAttribute('data-type-filter') === activeType) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }

      btn.addEventListener('click', () => {
        typeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeType = btn.getAttribute('data-type-filter');
        renderFilteredReports();
      });
    });

    const renderFilteredReports = () => {
      const allReports = window.StorageService.getReports();
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
      const selectedLocation = locationFilter ? locationFilter.value : 'all';
      const selectedStatus = statusFilter ? statusFilter.value : 'all';

      const filtered = allReports.filter(item => {
        // Type filter
        if (activeType !== 'all' && item.type !== activeType) return false;

        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

        // Location filter
        if (selectedLocation !== 'all' && item.location !== selectedLocation) return false;

        // Status filter
        if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;

        // Text search
        if (query) {
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchDesc = item.description.toLowerCase().includes(query);
          const matchLoc = item.location.toLowerCase().includes(query);
          if (!matchTitle && !matchDesc && !matchLoc) return false;
        }

        return true;
      });

      if (resultsCount) {
        resultsCount.textContent = `Showing ${filtered.length} report${filtered.length === 1 ? '' : 's'}`;
      }

      if (filtered.length === 0) {
        catalogContainer.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <h3>No matching campus reports found</h3>
            <p>Try clearing your search terms or adjusting the category and campus location filters.</p>
            <button class="btn btn-secondary btn-sm" onclick="ReportsController.resetCatalogFilters()">Reset All Filters</button>
          </div>
        `;
        return;
      }

      catalogContainer.innerHTML = filtered.map(item => this.createItemCardHTML(item)).join('');
    };

    // Attach input listeners
    if (searchInput) searchInput.addEventListener('input', renderFilteredReports);
    if (categoryFilter) categoryFilter.addEventListener('change', renderFilteredReports);
    if (locationFilter) locationFilter.addEventListener('change', renderFilteredReports);
    if (statusFilter) statusFilter.addEventListener('change', renderFilteredReports);

    // Initial render
    renderFilteredReports();
  },

  resetCatalogFilters() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('filter-category');
    const locationFilter = document.getElementById('filter-location');
    const statusFilter = document.getElementById('filter-status');
    const typeButtons = document.querySelectorAll('[data-type-filter]');

    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    if (locationFilter) locationFilter.value = 'all';
    if (statusFilter) statusFilter.value = 'all';
    typeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-type-filter') === 'all');
    });

    this.initBrowseCatalog();
  },

  /**
   * Generates markup for an item card
   */
  createItemCardHTML(item) {
    const typeBadge = item.type === 'lost' 
      ? '<span class="badge badge-lost">LOST</span>' 
      : '<span class="badge badge-found">FOUND</span>';
    
    let statusClass = 'badge-open';
    if (item.status === 'Claimed') statusClass = 'badge-claimed';
    if (item.status === 'Resolved') statusClass = 'badge-resolved';

    const fallbackImg = window.App.getFallbackImage(item.category);
    const itemImg = item.image || fallbackImg;

    return `
      <article class="card">
        <div class="item-card-media">
          <img src="${itemImg}" alt="${item.title}" onerror="this.onerror=null; this.src='${fallbackImg}';">
          <div class="card-badge-overlay">${typeBadge}</div>
          <div class="card-status-overlay">
            <span class="badge ${statusClass}">${item.status}</span>
          </div>
        </div>
        <div class="card-body">
          <span class="card-category">${item.category}</span>
          <h3 class="card-title">${item.title}</h3>
          <p class="card-desc">${item.description}</p>
          <div class="card-meta-list">
            <div class="card-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${item.location}</span>
            </div>
            <div class="card-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>${window.App.formatDate(item.date)}</span>
            </div>
          </div>
          <div class="card-actions">
            <a href="item-details.html?id=${item.id}" class="btn btn-secondary btn-sm" style="flex:1;">View Details</a>
            ${item.type === 'found' && item.status === 'Open' ? `
              <a href="item-details.html?id=${item.id}#claim" class="btn btn-primary btn-sm">Claim</a>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  }
};

window.ReportsController = ReportsController;
