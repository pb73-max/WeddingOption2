/**
 * Prerna & Arpit Wedding Website
 * Sunset Bloom Theme
 */
(function() {
  'use strict';

  // ================================
  // Constants
  // ================================
  const STORAGE_KEYS = {
    SOUND: 'pa-wedding-sound'
  };

  const SECTIONS = ['home', 'events', 'rsvp', 'travel'];

  // Wedding date: April 23, 2026 at noon (first event)
  const WEDDING_DATE = new Date('2026-04-23T12:00:00').getTime();

  // ================================
  // State
  // ================================
  let state = {
    soundEnabled: false,
    audioContext: null,
    lastScrollY: 0,
    currentSection: 'home',
    helpBuffer: '',
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
    soundToggle: null,
    scrollTopBtn: null,
    toast: null,
    rsvpForm: null,
    rsvpSuccess: null,
    sections: null,
    countdown: {
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    }
  };

  // ================================
  // Audio System
  // ================================
  function initAudio() {
    if (!state.audioContext) {
      state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (state.audioContext.state === 'suspended') {
      state.audioContext.resume();
    }
  }

  function playSound(type) {
    if (!state.soundEnabled || !state.audioContext) return;

    const ctx = state.audioContext;
    const now = ctx.currentTime;

    switch (type) {
      case 'click': {
        // Soft bell sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }
      case 'success': {
        // Happy chord
        const frequencies = [523, 659, 784]; // C5, E5, G5
        frequencies.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.08, now + (i * 0.05));
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          osc.start(now + (i * 0.05));
          osc.stop(now + 0.35);
        });
        break;
      }
      case 'toggle': {
        // Quick click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }
    }
  }

  // ================================
  // Sound Toggle
  // ================================
  function setSoundEnabled(enabled) {
    state.soundEnabled = enabled;
    elements.soundToggle.setAttribute('aria-pressed', enabled);
    elements.soundToggle.setAttribute(
      'aria-label',
      `Toggle sound (currently ${enabled ? 'on' : 'off'})`
    );
    saveToStorage(STORAGE_KEYS.SOUND, enabled);

    if (enabled) {
      initAudio();
      playSound('toggle');
    }
  }

  function toggleSound() {
    setSoundEnabled(!state.soundEnabled);
    showToast(state.soundEnabled ? 'Sound enabled' : 'Sound disabled');
  }

  // ================================
  // Toast System
  // ================================
  function showToast(message, duration = 3000) {
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
        elements.countdown.minutes.textContent = '0';
        elements.countdown.seconds.textContent = '0';
      }
      if (state.countdownInterval) {
        clearInterval(state.countdownInterval);
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (elements.countdown.days) {
      elements.countdown.days.textContent = days;
      elements.countdown.hours.textContent = hours;
      elements.countdown.minutes.textContent = minutes;
      elements.countdown.seconds.textContent = seconds;
    }
  }

  function startCountdown() {
    updateCountdown();
    state.countdownInterval = setInterval(updateCountdown, 1000);
  }

  // ================================
  // Scroll to Top
  // ================================
  function handleScrollTopVisibility() {
    if (window.scrollY > 500) {
      elements.scrollTopBtn.classList.add('visible');
      elements.scrollTopBtn.hidden = false;
    } else {
      elements.scrollTopBtn.classList.remove('visible');
    }
  }

  function scrollToTop() {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    state.lastScrollY = scrollY;
  }

  function setActiveSection(sectionId) {
    elements.navLinks.forEach(link => {
      const href = link.getAttribute('href').slice(1);
      if (href === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    state.currentSection = sectionId;
  }

  function setupIntersectionObserver() {
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
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    });

    animateElements.forEach(el => observer.observe(el));
  }

  function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
      playSound('click');
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
    playSound('success');
    elements.rsvpForm.hidden = true;
    elements.rsvpSuccess.hidden = false;
    showToast('Thank you for your RSVP!');
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

    // Track "help" easter egg
    state.helpBuffer += key;
    if (state.helpBuffer.length > 4) {
      state.helpBuffer = state.helpBuffer.slice(-4);
    }
    if (state.helpBuffer === 'help') {
      showHelpToast();
      state.helpBuffer = '';
      return;
    }

    switch (key) {
      case 's':
        toggleSound();
        break;
      case '?':
        showHelpToast();
        break;
      case 'h':
        smoothScrollTo('home');
        break;
      case 'e':
        smoothScrollTo('events');
        break;
      case 'r':
        smoothScrollTo('rsvp');
        break;
      case 't':
        smoothScrollTo('travel');
        break;
      case 'escape':
        // Close mobile menu or reset focus
        closeMobileMenu();
        document.activeElement.blur();
        break;
    }
  }

  function showHelpToast() {
    showToast('Shortcuts: H=Home, E=Events, R=RSVP, T=Travel, S=Sound', 4000);
  }

  // ================================
  // Mobile Menu
  // ================================
  function toggleMobileMenu() {
    const isOpen = elements.navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    elements.navToggle.setAttribute('aria-expanded', 'true');
    elements.navToggle.setAttribute('aria-label', 'Close menu');
    elements.navList.classList.add('open');
    document.body.style.overflow = 'hidden';
    playSound('click');
  }

  function closeMobileMenu() {
    elements.navToggle.setAttribute('aria-expanded', 'false');
    elements.navToggle.setAttribute('aria-label', 'Open menu');
    elements.navList.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ================================
  // Storage
  // ================================
  function saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // Storage not available
    }
  }

  function loadFromStorage(key, defaultValue) {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? JSON.parse(value) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  // ================================
  // Event Listeners
  // ================================
  function bindEvents() {
    // Sound toggle
    elements.soundToggle.addEventListener('click', () => {
      initAudio(); // Initialize on first interaction
      toggleSound();
    });

    // Mobile menu toggle
    if (elements.navToggle) {
      elements.navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Navigation links
    elements.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        closeMobileMenu(); // Close menu on mobile
        smoothScrollTo(targetId);
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

    // Initialize audio on any user interaction (for browsers that require it)
    document.addEventListener('click', () => {
      if (state.soundEnabled && !state.audioContext) {
        initAudio();
      }
    }, { once: true });
  }

  // ================================
  // Initialization
  // ================================
  function init() {
    // Cache DOM elements
    elements.nav = document.querySelector('.nav');
    elements.navToggle = document.getElementById('nav-toggle');
    elements.navList = document.getElementById('nav-menu');
    elements.navLinks = document.querySelectorAll('.nav__link');
    elements.soundToggle = document.getElementById('sound-toggle');
    elements.scrollTopBtn = document.getElementById('scroll-top');
    elements.toast = document.getElementById('toast');
    elements.rsvpForm = document.getElementById('rsvp-form');
    elements.rsvpSuccess = document.getElementById('rsvp-success');
    elements.sections = document.querySelectorAll('.section');

    // Cache countdown elements
    elements.countdown.days = document.getElementById('countdown-days');
    elements.countdown.hours = document.getElementById('countdown-hours');
    elements.countdown.minutes = document.getElementById('countdown-minutes');
    elements.countdown.seconds = document.getElementById('countdown-seconds');

    // Load saved preferences
    const savedSound = loadFromStorage(STORAGE_KEYS.SOUND, false);
    if (savedSound) {
      // Don't auto-play sound, but set the state
      state.soundEnabled = savedSound;
      elements.soundToggle.setAttribute('aria-pressed', 'true');
      elements.soundToggle.setAttribute('aria-label', 'Toggle sound (currently on)');
    }

    // Setup observers
    setupIntersectionObserver();
    setupScrollAnimations();

    // Bind events
    bindEvents();

    // Start countdown timer
    startCountdown();

    // Mark elements for scroll animation
    document.querySelectorAll('.event-card, .travel-card, .welcome__message').forEach((el, i) => {
      el.classList.add('animate-on-scroll');
      el.classList.add(`stagger-${(i % 6) + 1}`);
    });

    // Re-setup scroll animations after marking elements
    setupScrollAnimations();
  }

  // Start app when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
