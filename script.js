/**
 * StockWise – Supply Chain & Inventory Management Calculators
 * Pure Client-Side JavaScript (script.js)
 * Zero external runtime dependencies; works offline via Service Worker.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Page Metadata & SEO Configuration
     ========================================================================== */
  const PAGE_META = {
    home: {
      title: 'StockWise – Free Supply Chain & Inventory Management Calculators',
      description:
        'Free professional supply chain and inventory calculators for Economic Order Quantity (EOQ), Reorder Point (ROP), Safety Stock, and Inventory Turnover.',
      path: '/index.html'
    },
    eoq: {
      title: 'Free EOQ Calculator – Economic Order Quantity Tool | StockWise',
      description:
        'Calculate optimal order quantity with our free EOQ Calculator. Balance ordering and holding costs using the Wilson Economic Order Quantity formula.',
      path: '/eoq.html'
    },
    'reorder-point': {
      title: 'Free Reorder Point Calculator – ROP Inventory Tool | StockWise',
      description:
        'Determine the exact inventory threshold to trigger replenishment orders using average daily usage, supplier lead time, and safety stock.',
      path: '/reorder-point.html'
    },
    'safety-stock': {
      title: 'Free Safety Stock Calculator – Buffer Inventory Tool | StockWise',
      description:
        'Calculate optimal safety stock buffer units to protect your supply chain against demand spikes and supplier lead time variability.',
      path: '/safety-stock.html'
    },
    'inventory-turnover': {
      title: 'Free Inventory Turnover Calculator – Stock Turns & DSI Tool | StockWise',
      description:
        'Measure how efficiently your business cycles through stock by dividing Cost of Goods Sold (COGS) by Average Inventory Value.',
      path: '/inventory-turnover.html'
    }
  };

  /* ==========================================================================
     2. Number Formatting Utilities
     ========================================================================== */
  const fmtInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  });

  const fmtDec = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const fmtOneDec = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  const fmtCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  function parsePositiveNumber(inputEl) {
    if (!inputEl) return NaN;
    const raw = String(inputEl.value).replace(/,/g, '').trim();
    if (raw === '') return NaN;
    return Number(raw);
  }

  function setError(errorId, message) {
    const el = document.getElementById(errorId);
    if (!el) return;
    if (message) {
      el.textContent = message;
      el.classList.add('visible');
    } else {
      el.textContent = '';
      el.classList.remove('visible');
    }
  }

  /* ==========================================================================
     3. Navigation & Dynamic SEO Updater
     ========================================================================== */
  function updateMetaTag(selector, attr, value) {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute(attr, value);
    }
  }

  function resolveInitialPage() {
    const bodyPage = document.body.getAttribute('data-initial-page');
    if (bodyPage && PAGE_META[bodyPage]) {
      // Check if URL hash overrides
      const hash = window.location.hash.replace(/^#/, '').trim();
      if (hash && PAGE_META[hash]) return hash;
      return bodyPage;
    }

    const pathname = window.location.pathname.toLowerCase();
    if (pathname.endsWith('eoq.html')) return 'eoq';
    if (pathname.endsWith('reorder-point.html')) return 'reorder-point';
    if (pathname.endsWith('safety-stock.html')) return 'safety-stock';
    if (pathname.endsWith('inventory-turnover.html')) return 'inventory-turnover';

    const hash = window.location.hash.replace(/^#/, '').trim();
    if (hash && PAGE_META[hash]) return hash;

    return 'home';
  }

  function showPage(pageKey, pushHistory = true) {
    const targetKey = PAGE_META[pageKey] ? pageKey : 'home';
    const meta = PAGE_META[targetKey];

    // Toggle active view section
    const views = document.querySelectorAll('.page-view');
    views.forEach((view) => {
      const isMatch = view.getAttribute('data-view') === targetKey;
      view.classList.toggle('active', isMatch);
      view.setAttribute('aria-hidden', isMatch ? 'false' : 'true');
    });

    // Update active state on navigation links
    const navLinks = document.querySelectorAll('[data-nav-page]');
    navLinks.forEach((link) => {
      if (link.classList.contains('nav-link')) {
        const isCurrent = link.getAttribute('data-nav-page') === targetKey;
        link.classList.toggle('active', isCurrent);
        if (isCurrent) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      }
    });

    // Update SEO Title & Meta Description dynamically
    document.title = meta.title;
    updateMetaTag('meta[name="description"]', 'content', meta.description);
    updateMetaTag('meta[property="og:title"]', 'content', meta.title);
    updateMetaTag('meta[property="og:description"]', 'content', meta.description);
    updateMetaTag('meta[name="twitter:title"]', 'content', meta.title);
    updateMetaTag('meta[name="twitter:description"]', 'content', meta.description);

    // Close mobile drawer if open
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (mobileDrawer && mobileDrawer.classList.contains('open')) {
      mobileDrawer.classList.remove('open');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    }

    // Update browser history state cleanly
    if (pushHistory && window.history && window.history.pushState) {
      const newHash = targetKey === 'home' ? '#home' : '#' + targetKey;
      try {
        window.history.pushState({ page: targetKey }, meta.title, newHash);
      } catch (_err) {
        window.location.hash = newHash;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==========================================================================
     4. Calculator 1: Economic Order Quantity (EOQ)
     Formula: EOQ = sqrt((2 * Annual Demand * Order Cost) / Holding Cost)
     ========================================================================== */
  function calculateEOQ() {
    const demandEl = document.getElementById('eoq-demand');
    const orderCostEl = document.getElementById('eoq-order-cost');
    const holdingCostEl = document.getElementById('eoq-holding-cost');

    const demand = parsePositiveNumber(demandEl);
    const orderCost = parsePositiveNumber(orderCostEl);
    const holdingCost = parsePositiveNumber(holdingCostEl);

    if (isNaN(demand) || demand <= 0) {
      setError('eoq-error', 'Please enter an Annual Demand greater than 0 units/year.');
      return;
    }
    if (isNaN(orderCost) || orderCost <= 0) {
      setError('eoq-error', 'Please enter an Order Cost greater than $0 per order.');
      return;
    }
    if (isNaN(holdingCost) || holdingCost <= 0) {
      setError('eoq-error', 'Please enter a Holding Cost greater than $0 per unit/year.');
      return;
    }

    setError('eoq-error', '');

    const eoqExact = Math.sqrt((2 * demand * orderCost) / holdingCost);
    const eoqRounded = Math.round(eoqExact);
    const ordersPerYear = demand / eoqExact;
    const cycleDays = 365 / ordersPerYear;
    const annualOrderCost = ordersPerYear * orderCost;
    const annualHoldingCost = (eoqExact / 2) * holdingCost;
    const totalInventoryCost = annualOrderCost + annualHoldingCost;

    const valueEl = document.getElementById('eoq-result-value');
    const interpEl = document.getElementById('eoq-result-interpretation');
    const exactEl = document.getElementById('eoq-metric-exact');
    const ordersEl = document.getElementById('eoq-metric-orders');
    const cycleEl = document.getElementById('eoq-metric-cycle');
    const orderCostOutEl = document.getElementById('eoq-metric-order-cost');
    const holdCostOutEl = document.getElementById('eoq-metric-hold-cost');
    const totalCostEl = document.getElementById('eoq-metric-total-cost');

    if (valueEl) valueEl.textContent = fmtInt.format(eoqRounded);
    if (interpEl) {
      interpEl.textContent =
        'Ordering ' +
        fmtInt.format(eoqRounded) +
        ' units per batch (' +
        fmtDec.format(eoqExact) +
        ' exact) minimizes total combined ordering and storage costs at ' +
        fmtCurrency.format(totalInventoryCost) +
        ' per year.';
    }
    if (exactEl) exactEl.textContent = fmtDec.format(eoqExact) + ' units';
    if (ordersEl) ordersEl.textContent = fmtOneDec.format(ordersPerYear) + ' orders/yr';
    if (cycleEl) cycleEl.textContent = 'Every ' + fmtOneDec.format(cycleDays) + ' days';
    if (orderCostOutEl) orderCostOutEl.textContent = fmtCurrency.format(annualOrderCost) + '/yr';
    if (holdCostOutEl) holdCostOutEl.textContent = fmtCurrency.format(annualHoldingCost) + '/yr';
    if (totalCostEl) totalCostEl.textContent = fmtCurrency.format(totalInventoryCost) + '/yr';
  }

  /* ==========================================================================
     5. Calculator 2: Reorder Point (ROP)
     Formula: Reorder Point = (Average Daily Usage * Lead Time in Days) + Safety Stock
     ========================================================================== */
  function calculateROP() {
    const dailyUsageEl = document.getElementById('rop-daily-usage');
    const leadTimeEl = document.getElementById('rop-lead-time');
    const safetyStockEl = document.getElementById('rop-safety-stock');

    const dailyUsage = parsePositiveNumber(dailyUsageEl);
    const leadTime = parsePositiveNumber(leadTimeEl);
    const safetyStock = parsePositiveNumber(safetyStockEl);

    if (isNaN(dailyUsage) || dailyUsage <= 0) {
      setError('rop-error', 'Please enter an Average Daily Usage greater than 0 units/day.');
      return;
    }
    if (isNaN(leadTime) || leadTime <= 0) {
      setError('rop-error', 'Please enter a Lead Time greater than 0 days.');
      return;
    }
    if (isNaN(safetyStock) || safetyStock < 0) {
      setError('rop-error', 'Please enter a Safety Stock value of 0 or greater.');
      return;
    }

    setError('rop-error', '');

    const leadTimeDemand = dailyUsage * leadTime;
    const ropExact = leadTimeDemand + safetyStock;
    const ropRounded = Math.ceil(ropExact);
    const bufferPercentage = ropExact > 0 ? (safetyStock / ropExact) * 100 : 0;
    const coverageDays = ropExact / dailyUsage;

    const valueEl = document.getElementById('rop-result-value');
    const interpEl = document.getElementById('rop-result-interpretation');
    const ltdEl = document.getElementById('rop-metric-ltd');
    const ssEl = document.getElementById('rop-metric-ss');
    const shareEl = document.getElementById('rop-metric-share');
    const daysEl = document.getElementById('rop-metric-days');

    if (valueEl) valueEl.textContent = fmtInt.format(ropRounded);
    if (interpEl) {
      interpEl.textContent =
        'Place a new replenishment purchase order as soon as on-hand inventory drops to ' +
        fmtInt.format(ropRounded) +
        ' units (' +
        fmtInt.format(Math.round(leadTimeDemand)) +
        ' units consumed during lead time + ' +
        fmtInt.format(Math.round(safetyStock)) +
        ' safety stock units).';
    }
    if (ltdEl) ltdEl.textContent = fmtDec.format(leadTimeDemand) + ' units';
    if (ssEl) ssEl.textContent = fmtDec.format(safetyStock) + ' units';
    if (shareEl) shareEl.textContent = fmtOneDec.format(bufferPercentage) + '% of ROP';
    if (daysEl) daysEl.textContent = fmtOneDec.format(coverageDays) + ' days of stock';
  }

  /* ==========================================================================
     6. Calculator 3: Safety Stock
     Formula: Safety Stock = (Max Daily Usage * Max Lead Time) - (Average Daily Usage * Average Lead Time)
     ========================================================================== */
  function calculateSafetyStock() {
    const maxUsageEl = document.getElementById('ss-max-usage');
    const maxLeadEl = document.getElementById('ss-max-lead');
    const avgUsageEl = document.getElementById('ss-avg-usage');
    const avgLeadEl = document.getElementById('ss-avg-lead');

    const maxUsage = parsePositiveNumber(maxUsageEl);
    const maxLead = parsePositiveNumber(maxLeadEl);
    const avgUsage = parsePositiveNumber(avgUsageEl);
    const avgLead = parsePositiveNumber(avgLeadEl);

    if (isNaN(maxUsage) || maxUsage <= 0 || isNaN(maxLead) || maxLead <= 0) {
      setError('ss-error', 'Please enter positive numbers for Maximum Daily Usage and Maximum Lead Time.');
      return;
    }
    if (isNaN(avgUsage) || avgUsage <= 0 || isNaN(avgLead) || avgLead <= 0) {
      setError('ss-error', 'Please enter positive numbers for Average Daily Usage and Average Lead Time.');
      return;
    }
    if (maxUsage < avgUsage) {
      setError('ss-error', 'Max Daily Usage must be greater than or equal to Average Daily Usage.');
      return;
    }
    if (maxLead < avgLead) {
      setError('ss-error', 'Max Lead Time must be greater than or equal to Average Lead Time.');
      return;
    }

    setError('ss-error', '');

    const maxDemandDuringLead = maxUsage * maxLead;
    const avgDemandDuringLead = avgUsage * avgLead;
    const safetyStockExact = maxDemandDuringLead - avgDemandDuringLead;
    const safetyStockRounded = Math.ceil(safetyStockExact);
    const bufferDays = safetyStockExact / avgUsage;
    const impliedROP = avgDemandDuringLead + safetyStockExact;

    const valueEl = document.getElementById('ss-result-value');
    const interpEl = document.getElementById('ss-result-interpretation');
    const maxDemEl = document.getElementById('ss-metric-max-demand');
    const avgDemEl = document.getElementById('ss-metric-avg-demand');
    const daysEl = document.getElementById('ss-metric-days');
    const ropEl = document.getElementById('ss-metric-rop');

    if (valueEl) valueEl.textContent = fmtInt.format(safetyStockRounded);
    if (interpEl) {
      interpEl.textContent =
        'Hold ' +
        fmtInt.format(safetyStockRounded) +
        ' buffer units in reserve to absorb demand surges up to ' +
        fmtInt.format(maxUsage) +
        ' units/day and supplier delays up to ' +
        fmtInt.format(maxLead) +
        ' days without a stockout.';
    }
    if (maxDemEl) maxDemEl.textContent = fmtDec.format(maxDemandDuringLead) + ' units';
    if (avgDemEl) avgDemEl.textContent = fmtDec.format(avgDemandDuringLead) + ' units';
    if (daysEl) daysEl.textContent = fmtOneDec.format(bufferDays) + ' days at avg usage';
    if (ropEl) ropEl.textContent = fmtInt.format(Math.ceil(impliedROP)) + ' units';
  }

  /* ==========================================================================
     7. Calculator 4: Inventory Turnover
     Formula: Inventory Turnover = Cost of Goods Sold / Average Inventory Value
     ========================================================================== */
  function calculateTurnover() {
    const cogsEl = document.getElementById('it-cogs');
    const avgInvEl = document.getElementById('it-avg-inventory');

    const cogs = parsePositiveNumber(cogsEl);
    const avgInv = parsePositiveNumber(avgInvEl);

    if (isNaN(cogs) || cogs <= 0) {
      setError('it-error', 'Please enter an Annual Cost of Goods Sold (COGS) greater than $0.');
      return;
    }
    if (isNaN(avgInv) || avgInv <= 0) {
      setError('it-error', 'Please enter an Average Inventory Value greater than $0.');
      return;
    }

    setError('it-error', '');

    const turnover = cogs / avgInv;
    const dsi = 365 / turnover;
    const monthlyTurns = turnover / 12;

    const valueEl = document.getElementById('it-result-value');
    const interpEl = document.getElementById('it-result-interpretation');
    const dsiEl = document.getElementById('it-metric-dsi');
    const monthlyEl = document.getElementById('it-metric-monthly');
    const cogsOutEl = document.getElementById('it-metric-cogs');
    const invOutEl = document.getElementById('it-metric-inv');

    if (valueEl) valueEl.textContent = fmtDec.format(turnover);
    if (interpEl) {
      interpEl.textContent =
        'Your inventory cycles completely ' +
        fmtDec.format(turnover) +
        ' times per year. On average, a dollar of inventory remains in storage for ' +
        fmtOneDec.format(dsi) +
        ' days before being sold.';
    }
    if (dsiEl) dsiEl.textContent = fmtOneDec.format(dsi) + ' days (DSI)';
    if (monthlyEl) monthlyEl.textContent = fmtDec.format(monthlyTurns) + ' turns/month';
    if (cogsOutEl) cogsOutEl.textContent = fmtCurrency.format(cogs);
    if (invOutEl) invOutEl.textContent = fmtCurrency.format(avgInv);
  }

  /* ==========================================================================
     8. Sample Presets & Form Event Wiring
     ========================================================================== */
  const PRESETS = {
    eoq: { 'eoq-demand': '12000', 'eoq-order-cost': '150', 'eoq-holding-cost': '4.50' },
    rop: { 'rop-daily-usage': '45', 'rop-lead-time': '8', 'rop-safety-stock': '120' },
    ss: { 'ss-max-usage': '65', 'ss-max-lead': '12', 'ss-avg-usage': '45', 'ss-avg-lead': '8' },
    it: { 'it-cogs': '1800000', 'it-avg-inventory': '225000' }
  };

  function applyPreset(calcType) {
    const map = PRESETS[calcType];
    if (!map) return;
    Object.keys(map).forEach((id) => {
      const input = document.getElementById(id);
      if (input) input.value = map[id];
    });
    runCalculator(calcType);
  }

  function runCalculator(calcType) {
    if (calcType === 'eoq') calculateEOQ();
    else if (calcType === 'rop') calculateROP();
    else if (calcType === 'ss') calculateSafetyStock();
    else if (calcType === 'it') calculateTurnover();
  }

  /* ==========================================================================
     9. Progressive Web App (PWA) Service Worker & Install Prompt
     ========================================================================== */
  let deferredInstallPrompt = null;

  function initPWA() {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Fallback relative path for sub-directory static hosting (e.g., GitHub Pages)
          navigator.serviceWorker.register('./sw.js').catch(() => {});
        });
      });
    }

    const installBtn = document.getElementById('pwa-install-btn');
    const modalBackdrop = document.getElementById('pwa-modal-backdrop');
    const modalCloseBtn = document.getElementById('pwa-modal-close');

    // Check if running in standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    if (isStandalone && installBtn) {
      installBtn.textContent = 'Offline Ready';
      installBtn.setAttribute('disabled', 'true');
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      if (installBtn) {
        installBtn.textContent = 'Install App';
      }
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      if (installBtn) {
        installBtn.textContent = 'App Installed';
      }
    });

    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (deferredInstallPrompt) {
          deferredInstallPrompt.prompt();
          await deferredInstallPrompt.userChoice;
          deferredInstallPrompt = null;
        } else if (modalBackdrop) {
          modalBackdrop.classList.add('open');
        }
      });
    }

    if (modalCloseBtn && modalBackdrop) {
      modalCloseBtn.addEventListener('click', () => {
        modalBackdrop.classList.remove('open');
      });
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          modalBackdrop.classList.remove('open');
        }
      });
    }

    // Offline connectivity status toast
    const offlineToast = document.getElementById('offline-toast');
    function updateOnlineStatus() {
      if (!offlineToast) return;
      if (navigator.onLine) {
        offlineToast.classList.remove('visible');
      } else {
        offlineToast.classList.add('visible');
      }
    }
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
  }

  /* ==========================================================================
     10. DOM Initialization
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Wire navigation links & calculator cards
    document.querySelectorAll('[data-nav-page]').forEach((el) => {
      el.addEventListener('click', (e) => {
        const targetPage = el.getAttribute('data-nav-page');
        if (targetPage && PAGE_META[targetPage]) {
          e.preventDefault();
          showPage(targetPage, true);
        }
      });
    });

    // 2. Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    // 3. History popstate handler
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.page) {
        showPage(e.state.page, false);
      } else {
        showPage(resolveInitialPage(), false);
      }
    });

    // 4. Wire Calculator Forms
    const forms = [
      { formId: 'form-eoq', type: 'eoq' },
      { formId: 'form-rop', type: 'rop' },
      { formId: 'form-ss', type: 'ss' },
      { formId: 'form-it', type: 'it' }
    ];

    forms.forEach(({ formId, type }) => {
      const formEl = document.getElementById(formId);
      if (formEl) {
        formEl.addEventListener('submit', (e) => {
          e.preventDefault();
          runCalculator(type);
        });
      }
    });

    // Wire "Load Worked Example" buttons
    document.querySelectorAll('[data-load-example]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-load-example');
        applyPreset(type);
      });
    });

    // Wire "Reset to Example" buttons
    document.querySelectorAll('[data-reset-calc]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-reset-calc');
        applyPreset(type);
      });
    });

    // 5. Run initial calculations so all results are immediately populated
    calculateEOQ();
    calculateROP();
    calculateSafetyStock();
    calculateTurnover();

    // 6. Activate initial page view
    showPage(resolveInitialPage(), false);

    // 7. Initialize PWA features
    initPWA();
  });
})();
