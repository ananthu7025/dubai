// ==========================================================================
// Khattourism - Clean, Robust Interactive JavaScript & Lucide Icons
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Header scroll shadow toggle
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('shadow', window.scrollY > 30);
    }
  });

  // 2. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });

    // Close menu when clicking nav link
    document.querySelectorAll('.navbar a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
      });
    });
  }

  // 3. Arch-Pill Category Filters
  const archTabs = document.querySelectorAll('.arch-tab-btn');
  const archCards = document.querySelectorAll('.arch-pill-card');

  archTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      archTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      archCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });

      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  });

  // 4. FAQ Accordion Click Handler
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    if (header && body) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach((el) => {
          el.classList.remove('active');
          const b = el.querySelector('.faq-body');
          if (b) {
            b.classList.remove('open');
            b.style.maxHeight = '0';
          }
        });

        // Toggle clicked item
        if (!isActive) {
          item.classList.add('active');
          body.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 30 + 'px';
        }
      });
    }
  });

  // 6. Review Carousel Arrows
  const prevBtn = document.querySelector('.tc-nav-arrow[aria-label="Previous review"]');
  const nextBtn = document.querySelector('.tc-nav-arrow[aria-label="Next review"]');
  const reviewsRow = document.querySelector('.tc-reviews-row');

  if (prevBtn && nextBtn && reviewsRow) {
    prevBtn.addEventListener('click', () => {
      reviewsRow.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      reviewsRow.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // 7. Scroll-Reveal Animations
  const revealSelectors = [
    '.section-header',
    '.highlight-item',
    '.tour-gallery-item',
    '.itinerary-step-card',
    '.local-guide-banner',
    '.inclusions-card',
    '.pricing-card',
    '.upgrade-box',
    '.fleet-card-rich',
    '.audience-card',
    '.info-card',
    '.recommended-card',
    '.tc-review-card',
    '.faq-item',
    '.arch-pill-card',
    '.bento-card',
    '.staggered-card',
    '.destination-card',
    '.offer-card',
  ];

  const revealEls = document.querySelectorAll(revealSelectors.join(', '));

  if (revealEls.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach((el) => el.classList.add('reveal-on-scroll'));

    const groups = new Map();
    revealEls.forEach((el) => {
      const parent = el.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });
    groups.forEach((siblings) => {
      siblings.forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 70}ms`);
      });
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // 8. Text Reveal Animation (word-by-word mask sweep)
  const textRevealSelectors = [
    '.section-title',
    '.tour-hero-title',
    '.tour-hero-subtitle',
    '.hero-subheadline',
    '.upgrade-box h3',
    '.fleet-card-title',
    '.local-guide-name',
    '.inclusions-title',
    '.pricing-tier-name',
    '.info-card h3',
    '.audience-card h4',
    '.tc-love-title',
    '.staggered-title',
    '.bento-headline',
    '.discover-card-title',
  ];

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const textRevealEls = document.querySelectorAll(textRevealSelectors.join(', '));
  // Pre-marked-up headings (e.g. homepage hero with a <br> + colored span)
  // that already contain their own .text-reveal-mask/.text-reveal-word spans.
  const presetTextRevealEls = document.querySelectorAll('[data-text-reveal]');

  if ((textRevealEls.length || presetTextRevealEls.length) && 'IntersectionObserver' in window && !reducedMotion) {
    textRevealEls.forEach((heading) => {
      // Only split plain-text headings; skip ones with nested tags (icons, spans, <br>, etc.)
      if (heading.children.length > 0 || !heading.textContent.trim()) return;
      if (heading.dataset.textRevealDone) return;

      const words = heading.textContent.trim().split(/\s+/);
      heading.setAttribute('aria-label', heading.textContent.trim());
      heading.innerHTML = words
        .map((word, i) => {
          const delay = Math.min(i, 14) * 45;
          return `<span class="text-reveal-mask"><span class="text-reveal-word" style="transition-delay:${delay}ms">${word}</span></span>`;
        })
        .join(' ');
      heading.classList.add('text-reveal');
      heading.dataset.textRevealDone = 'true';
    });

    presetTextRevealEls.forEach((heading) => {
      heading.querySelectorAll('.text-reveal-word').forEach((wordEl, i) => {
        wordEl.style.transitionDelay = `${Math.min(i, 14) * 45}ms`;
      });
      heading.classList.add('text-reveal');
    });

    const textRevealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
    );

    textRevealEls.forEach((heading) => {
      if (heading.classList.contains('text-reveal')) {
        textRevealObserver.observe(heading);
      }
    });
    presetTextRevealEls.forEach((heading) => textRevealObserver.observe(heading));
  }
});