// --------------------------------------------------
// BELLS NOTE – Enhanced Student Dashboard Script v3.0
// --------------------------------------------------
//  • Smooth page loader with fade-out
//  • Dark/Light theme with localStorage persistence
//  • Dynamic greeting banner with live clock
//  • Supabase integration for materials
//  • Advanced filter system with search
//  • Filter chips with remove functionality
//  • Scroll effects (progress bar, reveals, FAB)
//  • Ambient ripple click effects
//  • Responsive filter modal
//  • Performance optimized
// --------------------------------------------------

'use strict';

/* ───────────────────────── HELPER UTILITIES ───────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const onReady = (fn) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
};

const debounce = (fn, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

/* ───────────────────────── PAGE LOADER ───────────────────────────── */
class PageLoader {
  constructor() {
    this.loader = $('#loader');
    this.maxWaitTime = 8000; // Maximum wait time before force hide
    this.init();
  }

  init() {
    // Auto-hide after max wait time
    this.timeout = setTimeout(() => this.hide(), this.maxWaitTime);
  }

  hide() {
    if (!this.loader) return;

    this.loader.classList.add('fade-out');

    setTimeout(() => {
      this.loader.remove();
      clearTimeout(this.timeout);
    }, 500);
  }
}

/* ───────────────────────── THEME MANAGER ───────────────────────────── */
// ------------------------------
// Theme Manager (Slider Version)
// ------------------------------

class ThemeManager {
  constructor() {
    this.toggleInput = document.querySelector('.switch input');
    this.storageKey = 'bells-note-theme';
    this.init();
  }

  init() {
    // Load saved theme (default: dark)
    const savedTheme = localStorage.getItem(this.storageKey) || 'dark';
    this.apply(savedTheme);

    // Set input checked state based on theme
    this.toggleInput.checked = savedTheme === 'light';

    // Listen for changes on toggle slider
    this.toggleInput.addEventListener('change', () => this.switch());
  }

  apply(theme) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
  }

  switch() {
    const nextTheme = this.toggleInput.checked ? 'light' : 'dark';
    this.apply(nextTheme);
    localStorage.setItem(this.storageKey, nextTheme);
  }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => new ThemeManager());


/* ───────────────────────── GREETING & CLOCK ───────────────────────── */
class GreetingClock {
  constructor() {
    this.container = $('.container');
    this.init();
  }

  init() {
    if (!this.container) return;

    const greeting = this.createGreeting();
    const clock = this.createClock();

    greeting.appendChild(clock);

    // Insert after header
    const header = $('header');
    if (header && header.nextSibling) {
      this.container.insertBefore(greeting, header.nextSibling);
    } else {
      this.container.prepend(greeting);
    }

    this.startClock(clock);
  }

  createGreeting() {
    const div = document.createElement('div');
    div.className = 'greeting';
    div.setAttribute('aria-live', 'polite');

    const hour = new Date().getHours();
    let message = 'Good evening';

    if (hour < 12) message = 'Good morning';
    else if (hour < 18) message = 'Good afternoon';

    div.innerHTML = `${message}, <span style="font-weight: 300;">Brick Citizen</span>`;

    return div;
  }

  createClock() {
    const clock = document.createElement('div');
    clock.id = 'time-clock';
    clock.setAttribute('role', 'status');
    return clock;
  }

  startClock(element) {
    const update = () => {
      const now = new Date();
      element.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    };

    update();
    setInterval(update, 1000);
  }
}

/* ───────────────────────── SCROLL EFFECTS ───────────────────────────── */
class ScrollEffects {
  constructor() {
    this.ticking = false;
    this.progressBar = $('.scroll-progress');
    this.fab = $('.fab');
    this.materialsSection = $('.materials');

    this.init();
  }

  init() {
    if (!this.materialsSection) return;

    this.initProgressBar();
    this.initScrollReveal();
    this.initFAB();
    this.watchNewCards();
  }

  initProgressBar() {
    if (!this.progressBar) return;

    this.materialsSection.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.updateProgress();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });
  }

  updateProgress() {
    const { scrollTop, scrollHeight, clientHeight } = this.materialsSection;
    const scrollableHeight = scrollHeight - clientHeight;
    const scrollPercentage = scrollableHeight > 0
      ? (scrollTop / scrollableHeight) * 100
      : 0;

    this.progressBar.style.width = `${scrollPercentage}%`;
  }

  initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        root: this.materialsSection
      }
    );

    // Observe all animatable elements
    const elements = $$('.materials h2, .card-grid, .material-card, .empty-state');
    elements.forEach(el => observer.observe(el));

    this.revealObserver = observer;
  }

  initFAB() {
    if (!this.fab) return;

    this.materialsSection.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.toggleFAB();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });

    // Click handler
    this.fab.addEventListener('click', () => this.scrollToTop());

    this.toggleFAB();
  }

  toggleFAB() {
    if (this.materialsSection.scrollTop > 300) {
      this.fab.classList.add('show');
    } else {
      this.fab.classList.remove('show');
    }
  }

  scrollToTop() {
    this.materialsSection.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  watchNewCards() {
    const grid = $('.card-grid');
    if (!grid) return;

    const observer = new MutationObserver(() => {
      setTimeout(() => {
        const newCards = $$('.material-card:not(.animate-in)');
        newCards.forEach(card => this.revealObserver?.observe(card));
      }, 100);
    });

    observer.observe(grid, { childList: true, subtree: true });
  }
}

/* ───────────────────────── RIPPLE EFFECT ───────────────────────────── */
class RippleEffect {
  constructor() {
    this.container = $('#ambient-ripple-bg');
    this.init();
  }

  init() {
    if (!this.container) return;

    document.addEventListener('click', (e) => this.createRipple(e));
  }

  createRipple(event) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-circle';
    ripple.style.left = `${event.pageX}px`;
    ripple.style.top = `${event.pageY}px`;

    this.container.appendChild(ripple);

    setTimeout(() => ripple.remove(), 2500);
  }
}

/* ───────────────────────── FILTER SYSTEM ───────────────────────────── */
class FilterSystem {
  constructor(materialsData = []) {
    this.materials = materialsData;
    this.filters = {
      college: $('#collegeFilter'),
      department: $('#departmentFilter'),
      level: $('#levelFilter'),
      semester: $('#semesterFilter'),
      type: $('#typeFilter'),
      search: $('#searchInput')
    };

    this.chipsContainer = $('.filter-chips');
    this.emptyState = $('.empty-state');

    this.init();
  }

  init() {
    // Attach event listeners with debounced search
    Object.entries(this.filters).forEach(([key, element]) => {
      if (!element) return;

      if (key === 'search') {
        element.addEventListener('input', debounce(() => {
          this.applyFilters();
          this.updateChips();
        }, 300));
      } else {
        element.addEventListener('change', () => {
          this.applyFilters();
          this.updateChips();
        });
      }
    });

    // Focus search input
    this.filters.search?.focus();
  }

  applyFilters() {
    const filterValues = this.getFilterValues();
    let visibleCount = 0;

    $$('.material-card').forEach(card => {
      const isMatch = this.matchesFilters(card, filterValues);
      card.style.display = isMatch ? 'block' : 'none';
      if (isMatch) visibleCount++;
    });

    this.toggleEmptyState(visibleCount === 0);
  }

  getFilterValues() {
    return {
      college: this.filters.college?.value.trim().toLowerCase() || '',
      department: this.filters.department?.value.trim().toLowerCase() || '',
      level: this.filters.level?.value.trim().toLowerCase() || '',
      semester: this.filters.semester?.value.trim().toLowerCase() || '',
      type: this.filters.type?.value.trim().toLowerCase() || '',
      search: this.filters.search?.value.trim().toLowerCase() || ''
    };
  }

  matchesFilters(card, filterValues) {
    const { college, department, level, semester, type, search } = filterValues;

    // Check each filter
    if (college && card.dataset.college?.toLowerCase() !== college) return false;
    if (department && card.dataset.department?.toLowerCase() !== department) return false;
    if (level && card.dataset.level?.toLowerCase() !== level) return false;
    if (semester && card.dataset.semester?.toLowerCase() !== semester) return false;
    if (type && card.dataset.type?.toLowerCase() !== type) return false;

    // Search filter - check multiple fields
    if (search) {
      const searchableFields = [
        card.dataset.title,
        card.dataset.code,
        card.dataset.topic,
        card.dataset.college,
        card.dataset.department
      ].map(field => (field || '').toLowerCase());

      const matchesSearch = searchableFields.some(field => field.includes(search));
      if (!matchesSearch) return false;
    }

    return true;
  }

  updateChips() {
    if (!this.chipsContainer) return;

    this.chipsContainer.innerHTML = '';

    const activeFilters = ['college', 'department', 'level', 'semester', 'type'];

    activeFilters.forEach(key => {
      const value = this.filters[key]?.value.trim();
      if (value) {
        this.createChip(key, value);
      }
    });
  }

  createChip(filterKey, value) {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.innerHTML = `
      ${value} 
      <i class="fas fa-times" data-filter="${filterKey}"></i>
    `;

    chip.querySelector('i').addEventListener('click', () => {
      this.removeFilter(filterKey);
    });

    this.chipsContainer.appendChild(chip);
  }

  removeFilter(filterKey) {
    if (this.filters[filterKey]) {
      this.filters[filterKey].value = '';
      this.applyFilters();
      this.updateChips();
    }
  }

  reset() {
    Object.values(this.filters).forEach(filter => {
      if (filter) filter.value = '';
    });

    this.updateChips();
    this.applyFilters();
  }

  toggleEmptyState(show) {
    if (this.emptyState) {
      this.emptyState.style.display = show ? 'block' : 'none';
      if (show) {
        setTimeout(() => this.emptyState.classList.add('show'), 50);
      } else {
        this.emptyState.classList.remove('show');
      }
    }
  }
}

/* ───────────────────────── FILTER MODAL ───────────────────────────── */
class FilterModal {
  constructor() {
    this.modal = $('.filterModal');
    this.openBtn = $('.filterBtn');
    this.closeBtn = $('#closeModal');
    this.init();
  }

  init() {
    if (!this.modal || !this.openBtn) return;

    this.openBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.open();
    });

    this.closeBtn?.addEventListener('click', () => this.close());

    // Close on outside click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open() {
    this.modal.style.display = 'flex';
    setTimeout(() => this.modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    setTimeout(() => {
      this.modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
}

/* ───────────────────────── MATERIALS RENDERER ───────────────────────── */
class MaterialsRenderer {
  constructor() {
    this.grid = $('.card-grid');
    this.loader = new PageLoader();
  }

  render(materials) {
    if (!this.grid) return;

    this.grid.innerHTML = '';

    if (!materials || materials.length === 0) {
      this.showEmpty();
      this.loader.hide();
      return;
    }

    // Create intersection observer for lazy reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, root: $('.materials') }
    );

    materials.forEach((material, index) => {
      const card = this.createCard(material, index);
      this.grid.appendChild(card);
      observer.observe(card);

      // Prefetch PDF links
      if (material.download_link) {
        this.prefetchLink(material.download_link);
      }
    });

    // Trigger animations
    setTimeout(() => {
      this.grid.classList.add('animate-in');
      $('.materials-title')?.classList.add('animate-in');
    }, 100);

    this.loader.hide();
  }

  createCard(material, index) {
    const card = document.createElement('div');
    card.className = 'material-card';

    // Set data attributes for filtering
    const attributes = {
      college: material.college,
      department: material.department,
      level: material.level,
      semester: material.semester,
      type: material.type,
      code: material.code,
      title: material.title,
      topic: material.topic
    };

    Object.entries(attributes).forEach(([key, value]) => {
      card.dataset[key] = (value || '').toString().toLowerCase();
    });

    // Stagger animation
    card.style.animationDelay = `${index * 0.05}s`;

    // Determine tag class
    const tagClass = material.type?.toLowerCase() === 'note' ? 'note' : 'pq';

    card.innerHTML = `
      <h3>${this.escapeHtml(material.title || 'Untitled')}</h3>
      <span class="code">
        ${this.escapeHtml(material.code || 'N/A')}
        <span class="tag ${tagClass}">${this.escapeHtml(material.type || 'Resource')}</span>
      </span>
      ${material.topic ? `<p><strong>Topic:</strong> ${this.escapeHtml(material.topic)}</p>` : ''}
      <p><strong>Level:</strong> ${this.escapeHtml(material.level || 'N/A')}</p>
      <p><strong>Semester:</strong> ${this.escapeHtml(material.semester || 'N/A')}</p>
      <p><strong>College:</strong> ${this.escapeHtml(material.college || 'N/A')}</p>
      ${material.department ? `<p><strong>Department:</strong> ${this.escapeHtml(material.department)}</p>` : ''}
      <a href="${this.escapeHtml(material.download_link || '#')}" 
         class="btn" 
         ${!material.download_link ? 'onclick="event.preventDefault(); alert(\'Download link not available\');"' : ''}
         target="_blank"
         rel="noopener noreferrer">
        <i class="fas fa-download"></i> Download PDF
      </a>
    `;

    return card;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  prefetchLink(url) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }

  showEmpty() {
    const emptyState = $('.empty-state');
    if (emptyState) {
      emptyState.style.display = 'block';
      setTimeout(() => emptyState.classList.add('show'), 50);
    }
  }
}

/* ───────────────────────── SUPABASE INTEGRATION ───────────────────────── */
class SupabaseManager {
  constructor() {
    this.renderer = new MaterialsRenderer();
    this.init();
  }

  async init() {
    try {
      // Check if Supabase is available
      if (typeof supabase === 'undefined') {
        console.error('Supabase client not initialized');
        this.showError('Database connection not available');
        return;
      }

      await this.fetchMaterials();
    } catch (error) {
      console.error('Supabase initialization error:', error);
      this.showError('Failed to load materials');
    }
  }

  async fetchMaterials() {
    try {
      const { data: materials, error } = await supabase
        .from('materials')
        .select('*')
        .order('title', { ascending: true });

      if (error) throw error;

      if (!materials || materials.length === 0) {
        this.renderer.showEmpty();
        this.renderer.loader.hide();
        return;
      }

      // Render materials and initialize filter system
      this.renderer.render(materials);

      // Initialize filter system after render
      window.filterSystem = new FilterSystem(materials);

    } catch (error) {
      console.error('Failed to fetch materials:', error.message);
      this.showError(error.message);
    }
  }

  showError(message) {
    const emptyState = $('.empty-state');
    if (emptyState) {
      emptyState.innerHTML = `
        <i class="fas fa-exclamation-triangle" style="font-size:3rem; color: var(--error);"></i>
        <p style="color: var(--error);">Error: ${this.renderer.escapeHtml(message)}</p>
        <button  onclick="location.reload()">
          <i class="fas fa-redo"></i> Retry
        </button>
      `;
      emptyState.style.display = 'block';
      setTimeout(() => emptyState.classList.add('show'), 50);
    }
    this.renderer.loader.hide();
  }
}

/* ───────────────────────── INITIALIZATION ───────────────────────────── */
class App {
  constructor() {
    this.init();
  }

  init() {
    onReady(() => {
      // Initialize all modules
      new ThemeManager();
      new GreetingClock();
      new ScrollEffects();
      new RippleEffect();
      new FilterModal();
      new SupabaseManager();

      // Make reset function globally accessible
      window.resetFilters = () => {
        window.filterSystem?.reset();
      };

      // Make scroll to top globally accessible
      window.scrollToTop = () => {
        $('.materials')?.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

      console.log('✅ Bells Note Dashboard initialized successfully');
    });
  }
}

// Start the application
new App();

// Page load completion check
window.addEventListener('load', () => {
  console.log(' Page fully loaded - All resources ready');
});