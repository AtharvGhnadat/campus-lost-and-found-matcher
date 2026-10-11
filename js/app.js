/**
 * Campus Lost-and-Found Matcher — Global App UI & Common Utilities
 * Manages responsive navigation, global toasts, confirmation dialogs,
 * and date/category visual helpers.
 */

const App = {
  init() {
    this.setupMobileNav();
    this.highlightActiveNavLink();
    this.setupFooterReset();
  },

  /**
   * Mobile drawer menu toggle
   */
  setupMobileNav() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (toggleBtn && mainNav) {
      toggleBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
      });

      // Close menu on click outside
      document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !toggleBtn.contains(e.target)) {
          mainNav.classList.remove('open');
        }
      });
    }
  },

  /**
   * Highlights the current active navigation link based on window.location
   */
  highlightActiveNavLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      const isHome = (currentPath.endsWith('/') || currentPath.endsWith('index.html')) && (href === 'index.html' || href === '../index.html' || href === '/');
      const isMatch = currentPath.includes(href) && href !== 'index.html';

      if (isHome || isMatch) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  /**
   * Shows a top-right floating toast notification
   */
  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-width: 380px;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `alert alert-${type}`;
    toast.style.cssText = `
      box-shadow: var(--shadow-lg);
      margin: 0;
      pointer-events: auto;
      animation: fadeIn 0.2s ease;
    `;
    toast.innerHTML = `
      <div><strong>${type.toUpperCase()}:</strong> ${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  /**
   * Binds global demo reset triggers
   */
  setupFooterReset() {
    const resetTriggers = document.querySelectorAll('.action-reset-demo');
    resetTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to restore the default demo dataset? Any custom reports or claims will be reset.')) {
          window.StorageService.resetToDefaults();
          App.showToast('Demo dataset successfully restored!', 'success');
          setTimeout(() => window.location.reload(), 600);
        }
      });
    });
  },

  /**
   * Helper to format YYYY-MM-DD into readable date (e.g. 09 Oct 2026)
   */
  formatDate(dateStr) {
    if (!dateStr) return 'Unknown Date';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  },

  /**
   * Helper to determine appropriate fallback SVG image based on category
   */
  getFallbackImage(category) {
    if (!category) return 'assets/images/fallback-item.svg';
    const cat = category.toLowerCase();
    if (cat.includes('wallet') || cat.includes('bag') || cat.includes('purse')) {
      return 'assets/images/fallback-wallet.svg';
    }
    if (cat.includes('bottle') || cat.includes('accessory')) {
      return 'assets/images/fallback-bottle.svg';
    }
    if (cat.includes('key')) {
      return 'assets/images/fallback-keys.svg';
    }
    if (cat.includes('earphone') || cat.includes('audio') || cat.includes('electronic')) {
      return 'assets/images/fallback-earphones.svg';
    }
    if (cat.includes('id') || cat.includes('card')) {
      return 'assets/images/fallback-card.svg';
    }
    return 'assets/images/fallback-item.svg';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.App = App;
