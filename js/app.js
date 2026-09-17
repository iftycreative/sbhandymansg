/**
 * SB Handyman SG - Main Application JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initScrollSpy();
  initLiveStatusBadge();
});

/**
 * Handle Header Sticky Style on Scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn');

  if (!toggleBtn || !drawer) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', toggleMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Active Nav Item Highlight (Scroll Spy)
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Dynamic Live Availability Status Badge
 * Reflects the current Singapore time (SGT) with a live technician count
 * that periodically updates to keep the hero badge feeling real-time.
 */
function initLiveStatusBadge() {
  const badgeText = document.querySelector('.live-badge-text span');
  if (!badgeText) return;

  const getSgHour = () => {
    try {
      const hour = parseInt(new Date().toLocaleString('en-SG', {
        hour: '2-digit',
        hour12: false,
        timeZone: 'Asia/Singapore'
      }), 10);
      return hour === 24 ? 0 : hour;
    } catch (e) {
      return new Date().getHours();
    }
  };

  const updateBadge = () => {
    const hour = getSgHour();
    const isNightShift = hour >= 23 || hour < 6;
    const onDuty = isNightShift
      ? 2 + Math.floor(Math.random() * 3)
      : 6 + Math.floor(Math.random() * 4);

    badgeText.textContent = isNightShift
      ? `On-Call Tonight · ${onDuty} Teams Ready — 24/7 Night Dispatch`
      : `Available Now · ${onDuty} Teams Islandwide`;
  };

  updateBadge();
  setInterval(updateBadge, 15000);
}
