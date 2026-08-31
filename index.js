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
});