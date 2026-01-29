/**
 * Prerna & Arpit Wedding Website
 * Sunset Bloom Theme
 */
(function() {
  'use strict';

  // ================================
  // Constants
  // ================================
  const SECTIONS = ['home', 'events', 'rsvp'];

  // Wedding date: April 23, 2026 at noon (first event)
  const WEDDING_DATE = new Date('2026-04-23T12:00:00').getTime();

  // ================================
  // State
  // ================================
  let state = {
    lastScrollY: 0,
    currentSection: 'home',
    countdownInterval: null
  };

  // ================================
  // DOM Elements
  // ================================
  const elements = {
    nav: null,
    navToggle: null,
    navList: null,
    navLinks: null,
    scrollTopBtn: null,
    toast: null,
    rsvpForm: null,
    rsvpSuccess: null,
    sections: null,
    countdown: {
      days: null,
      hours: null
    }
  };

  // ================================
  // Toast System
  // ================================
  function showToast(message, duration = 3000) {
    if (!elements.toast) return;
    elements.toast.textContent = message;
    elements.toast.hidden = false;
    elements.toast.classList.add('show');

    setTimeout(() => {
      elements.toast.classList.remove('show');
      setTimeout(() => {
        elements.toast.hidden = true;
      }, 400);
    }, duration);
  }

  // ================================
  // Countdown Timer
  // ================================
  function updateCountdown() {
    const now = Date.now();
    const distance = WEDDING_DATE - now;

    if (distance < 0) {
      // Wedding has started/passed
      if (elements.countdown.days) {
        elements.countdown.days.textContent = '0';
        elements.countdown.hours.textContent = '0';
      }
      if (state.countdownInterval) {
        clearInterval(state.countdownInterval);
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (elements.countdown.days) {
      elements.countdown.days.textContent = days;
      elements.countdown.hours.textContent = hours;
    }
  }

  function startCountdown() {
    updateCountdown();
    // Update every minute since we only show days and hours
    state.countdownInterval = setInterval(updateCountdown, 60000);
  }

  // ================================
  // Scroll to Top
  // ================================
  function handleScrollTopVisibility() {
    if (!elements.scrollTopBtn) return;
    if (window.scrollY > 500) {
      elements.scrollTopBtn.classList.add('visible');
      elements.scrollTopBtn.hidden = false;
    } else {
      elements.scrollTopBtn.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ================================
  // Parallax Effect
  // ================================
  function updateParallax() {
    const scrollY = window.scrollY;
    const heroDecorElements = document.querySelectorAll('.hero__decor');
    const floatingMarigolds = document.querySelectorAll('.marigold');

    // Parallax for hero leaves - move at 0.3x scroll speed
    heroDecorElements.forEach((el, index) => {
      const speed = 0.3 + (index * 0.05); // Slight variation between elements
      const yOffset = scrollY * speed;
      el.style.transform = `translateY(${yOffset}px)`;
    });

    // Parallax for floating marigolds - move at 0.5x scroll speed
    floatingMarigolds.forEach((el, index) => {
      const speed = 0.4 + (index * 0.1);
      const yOffset = scrollY * speed;
      el.style.transform = `translateY(${yOffset}px)`;
    });
  }

  // ================================
  // Navigation
  // ================================
  function handleScroll() {
    const scrollY = window.scrollY;

    // Hide/show nav on scroll direction
    if (scrollY > 100) {
      elements.nav.classList.add('nav--scrolled');
      if (scrollY > state.lastScrollY && scrollY > 200) {
        elements.nav.classList.add('nav--hidden');
      } else {
        elements.nav.classList.remove('nav--hidden');
      }
    } else {
      elements.nav.classList.remove('nav--scrolled');
      elements.nav.classList.remove('nav--hidden');
    }

    // Scroll to top button visibility
    handleScrollTopVisibility();

    // Update parallax effects
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(updateParallax);
    }

    state.lastScrollY = scrollY;
  }

  function setActiveSection(sectionId) {
    elements.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const id = href.slice(1);
        if (id === sectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
    state.currentSection = sectionId;
  }

  function setupIntersectionObserver() {
    if (!elements.sections || elements.sections.length === 0) return;

    const options = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    elements.sections.forEach(section => {
      if (section.id) {
        observer.observe(section);
      }
    });
  }

  function setupScrollAnimations() {
    // Select all elements that should animate on scroll
    const animateElements = document.querySelectorAll(
      '.animate-on-scroll, .animate-scale-bloom, .animate-slide-left, .animate-slide-right, ' +
      '.section__title, .section-divider, .welcome__message, .events__day-title, .rsvp__layout, ' +
      '.event-card, .section-decor'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    animateElements.forEach(el => observer.observe(el));
  }

  function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ================================
  // RSVP Form
  // ================================
  function handleRSVPSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Basic validation
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const guests = formData.get('guests');

    if (!name || !email || !guests) {
      showToast('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address');
      return;
    }

    // If form action is set to a real endpoint, submit normally
    const action = form.getAttribute('action');
    if (action && action !== '#') {
      // For Formspree or other backends
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          showRSVPSuccess();
        } else {
          showToast('Something went wrong. Please try again.');
        }
      })
      .catch(() => {
        showToast('Something went wrong. Please try again.');
      });
    } else {
      // Demo mode - just show success
      showRSVPSuccess();
    }
  }

  function showRSVPSuccess() {
    if (elements.rsvpForm) elements.rsvpForm.hidden = true;
    if (elements.rsvpSuccess) elements.rsvpSuccess.hidden = false;
    showToast('Thank you for your RSVP!');
  }

  // ================================
  // Mobile Menu
  // ================================
  function toggleMobileMenu() {
    if (!elements.navToggle) return;
    const isOpen = elements.navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    if (!elements.navToggle || !elements.navList) return;
    elements.navToggle.setAttribute('aria-expanded', 'true');
    elements.navToggle.setAttribute('aria-label', 'Close menu');
    elements.navList.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!elements.navToggle || !elements.navList) return;
    elements.navToggle.setAttribute('aria-expanded', 'false');
    elements.navToggle.setAttribute('aria-label', 'Open menu');
    elements.navList.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ================================
  // Keyboard Shortcuts
  // ================================
  function handleKeyboard(e) {
    // Don't trigger shortcuts when typing in form fields
    if (e.target.matches('input, textarea, select')) {
      return;
    }

    const key = e.key.toLowerCase();

    switch (key) {
      case 'h':
        smoothScrollTo('home');
        break;
      case 'e':
        smoothScrollTo('events');
        break;
      case 'r':
        smoothScrollTo('rsvp');
        break;
      case 'escape':
        closeMobileMenu();
        document.activeElement.blur();
        break;
    }
  }

  // ================================
  // Event Listeners
  // ================================
  function bindEvents() {
    // Mobile menu toggle
    if (elements.navToggle) {
      elements.navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Navigation links
    elements.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        // Only handle hash links for smooth scroll
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.slice(1);
          closeMobileMenu();
          smoothScrollTo(targetId);
        } else {
          // External link or different page - close mobile menu
          closeMobileMenu();
        }
      });
    });

    // Scroll handler
    window.addEventListener('scroll', handleScroll, { passive: true });

    // RSVP form
    if (elements.rsvpForm) {
      elements.rsvpForm.addEventListener('submit', handleRSVPSubmit);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);

    // Scroll to top button
    if (elements.scrollTopBtn) {
      elements.scrollTopBtn.addEventListener('click', scrollToTop);
    }
  }

  // ================================
  // Initialization
  // ================================
  function init() {
    // Mark that JS is ready - enables CSS animations
    document.body.classList.add('js-ready');

    // Cache DOM elements
    elements.nav = document.querySelector('.nav');
    elements.navToggle = document.getElementById('nav-toggle');
    elements.navList = document.getElementById('nav-menu');
    elements.navLinks = document.querySelectorAll('.nav__link');
    elements.scrollTopBtn = document.getElementById('scroll-top');
    elements.toast = document.getElementById('toast');
    elements.rsvpForm = document.getElementById('rsvp-form');
    elements.rsvpSuccess = document.getElementById('rsvp-success');
    elements.sections = document.querySelectorAll('.section');

    // Cache countdown elements
    elements.countdown.days = document.getElementById('countdown-days');
    elements.countdown.hours = document.getElementById('countdown-hours');

    // Setup observers
    setupIntersectionObserver();
    setupScrollAnimations();

    // Bind events
    bindEvents();

    // Start countdown timer (if elements exist)
    if (elements.countdown.days) {
      startCountdown();
    }

    // Mark event cards for scroll animation with stagger
    document.querySelectorAll('.event-card').forEach((el, i) => {
      el.classList.add('animate-on-scroll');
      el.classList.add(`stagger-${(i % 4) + 1}`);
    });

    // Mark travel page cards for animation
    document.querySelectorAll('.travel-card, .venue-card, .accommodation-card, .transport-card').forEach((el, i) => {
      el.classList.add('animate-on-scroll');
      el.classList.add(`stagger-${(i % 6) + 1}`);
    });

    // Re-setup scroll animations after marking elements
    setupScrollAnimations();

    // Create floating marigold decorations
    createFloatingFlorals();
  }

  // ================================
  // Floating Floral Decorations
  // ================================
  function createFloatingFlorals() {
    // Check if we're not on mobile (to keep performance good)
    if (window.innerWidth < 768) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = document.createElement('div');
    container.className = 'floating-florals';
    container.setAttribute('aria-hidden', 'true');

    // Create 4 marigold decorations
    for (let i = 1; i <= 4; i++) {
      const marigold = document.createElement('div');
      marigold.className = `marigold marigold--${i}`;
      marigold.innerHTML = `
        <svg class="marigold-svg" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="marigoldGrad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#F26B3A"/>
              <stop offset="100%" style="stop-color:#F5A572"/>
            </linearGradient>
          </defs>
          <!-- Center -->
          <circle cx="25" cy="25" r="6" fill="#C9A962"/>
          <!-- Petals -->
          <ellipse cx="25" cy="10" rx="5" ry="10" fill="url(#marigoldGrad${i})" opacity="0.9"/>
          <ellipse cx="40" cy="25" rx="10" ry="5" fill="url(#marigoldGrad${i})" opacity="0.9"/>
          <ellipse cx="25" cy="40" rx="5" ry="10" fill="url(#marigoldGrad${i})" opacity="0.9"/>
          <ellipse cx="10" cy="25" rx="10" ry="5" fill="url(#marigoldGrad${i})" opacity="0.9"/>
          <!-- Diagonal petals -->
          <ellipse cx="36" cy="14" rx="5" ry="8" fill="url(#marigoldGrad${i})" opacity="0.8" transform="rotate(45 36 14)"/>
          <ellipse cx="36" cy="36" rx="5" ry="8" fill="url(#marigoldGrad${i})" opacity="0.8" transform="rotate(-45 36 36)"/>
          <ellipse cx="14" cy="36" rx="5" ry="8" fill="url(#marigoldGrad${i})" opacity="0.8" transform="rotate(45 14 36)"/>
          <ellipse cx="14" cy="14" rx="5" ry="8" fill="url(#marigoldGrad${i})" opacity="0.8" transform="rotate(-45 14 14)"/>
        </svg>
      `;
      container.appendChild(marigold);
    }

    document.body.insertBefore(container, document.body.firstChild);
  }

  // Start app when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
