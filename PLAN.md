# Prerna & Arpit Wedding Website - Development Plan

## Overview
A minimalist, elegant wedding website for Prerna & Arpit's celebration on April 23-24, 2026 at Taj Ambad, Nashik. The design follows the "Sunset Bloom" palette—bright Indian colors (hot pink, sunset orange, forest green) on warm cream backgrounds—combining contemporary minimalism with Indian heritage motifs.

## Technical Constraints

| Constraint | Requirement |
|------------|-------------|
| Framework | None - Pure HTML/CSS/JS |
| Build Step | None - opens directly in browser |
| Total Size | Under 100KB (HTML + CSS + JS) |
| Browser Support | Modern browsers (Chrome, Firefox, Safari, Edge) |
| Deployment | GitHub Pages via GitHub Actions |
| Fonts | Google Fonts (Cormorant Garamond, Inter) loaded via CDN |

## File Structure

```
WeddingOption2/
├── PLAN.md                      # Master plan (this file)
├── PROGRESS.md                  # Phase completion tracking
├── RESTORE_POINTS.md            # Rollback instructions per phase
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages deployment
├── index.html                   # Single-page application
├── styles.css                   # All styles with CSS variables
├── app.js                       # All logic in single IIFE
├── README.md                    # Setup and deployment guide
├── LICENSE                      # MIT license
└── .gitignore                   # Standard web ignores
```

## Design Decisions

### Decision 1: Single Page Application
- **Context**: Wedding websites are typically short experiences with limited content
- **Options Considered**:
  - Option A: Multi-page (separate HTML files) - more traditional, requires navigation
  - Option B: Single page with sections - smoother UX, all content accessible via scroll
- **Decision**: Single page with smooth scroll navigation
- **Rationale**: Better user experience, easier to maintain, allows for elegant scroll animations

### Decision 2: SVG Motifs Inline vs External
- **Context**: Design calls for lotus, leaves, and arch motifs
- **Options Considered**:
  - Option A: External SVG files - cleaner HTML but more HTTP requests
  - Option B: Inline SVGs - larger HTML but animatable and no extra requests
- **Decision**: Inline SVGs for animated motifs, CSS-based patterns for decorative elements
- **Rationale**: Enables CSS animations, reduces HTTP requests, stays under size limit

### Decision 3: RSVP Form Backend
- **Context**: Need to collect guest RSVPs without a backend server
- **Options Considered**:
  - Option A: Formspree - simple, free tier available
  - Option B: Google Forms embed - free but less elegant
  - Option C: Netlify Forms - requires Netlify hosting
- **Decision**: Formspree integration (user will need to add their endpoint)
- **Rationale**: Works with GitHub Pages, elegant integration, free tier sufficient

### Decision 4: Theme System
- **Context**: Meta-prompt requires theme toggle, but wedding sites typically have fixed branding
- **Options Considered**:
  - Option A: Full dark/light themes - may clash with wedding aesthetic
  - Option B: Single elegant theme with accessibility options
- **Decision**: Single "Sunset Bloom" theme with reduced-motion support for accessibility
- **Rationale**: Wedding branding should be consistent; accessibility handled via prefers-reduced-motion

### Decision 5: Sound System
- **Context**: Meta-prompt requires sound, which can enhance Indian wedding atmosphere
- **Options Considered**:
  - Option A: No sound - simpler but misses opportunity
  - Option B: Subtle Indian bells/chimes - adds festive touch
- **Decision**: Optional soft bell sounds for interactions, disabled by default
- **Rationale**: Respects user preference, adds cultural ambiance when enabled

---

## Theme System

### CSS Variables Structure
```css
:root {
  /* Primary Colors - Sunset Bloom Palette */
  --color-pink: #D4366E;
  --color-pink-dark: #A82D5B;
  --color-orange: #F26B3A;
  --color-coral: #F5A572;
  --color-green: #1B4D3E;
  --color-sage: #2D5A47;
  --color-gold: #C9A962;
  --color-cream: #FFF8F0;
  --color-white: #FFFFFF;
  --color-text: #2C2C2C;
  --color-text-muted: #5C5C5C;

  /* Typography */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  --space-section: clamp(4rem, 10vw, 8rem);

  /* Animation */
  --ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 0.2s;
  --duration-normal: 0.4s;
  --duration-slow: 0.8s;

  /* Shadows */
  --shadow-soft: 0 4px 20px rgba(212, 54, 110, 0.1);
  --shadow-card: 0 8px 30px rgba(27, 77, 62, 0.08);
}
```

---

## Sound Design (Web Audio API)

| Action | Sound Type | Wave | Frequency | Duration | Notes |
|--------|------------|------|-----------|----------|-------|
| Navigation click | Soft bell | Sine | 800Hz | 150ms | Gentle chime |
| RSVP submit | Celebration | Sine chord | 523, 659, 784Hz | 300ms | Happy chord |
| Toggle sound | Click | Square | 600Hz | 50ms | Subtle feedback |
| Scroll milestone | Soft tone | Sine | 700Hz | 100ms | Section entry |

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| S | Toggle sound on/off |
| ? | Show help toast |
| H | Scroll to Home/Hero |
| E | Scroll to Events |
| R | Scroll to RSVP |
| T | Scroll to Travel |
| Escape | Close any open modal |

---

## Page Sections

### 1. Hero Section (100vh)
- Couple names: "Prerna" & "Arpit" in elegant display font
- Wedding date: "April 23-24, 2025"
- Venue: "Taj Ambad, Nashik"
- Decorative leaf SVGs framing corners
- Animated lotus scroll indicator
- Fade-in entry animation with stagger

### 2. Welcome Section
- Brief romantic welcome message
- Optional couple photo placeholder
- Mughal arch frame accent

### 3. Events/Schedule Section
- **Day 1 - April 23, 2026:**
  - Bhaat, Matki Pooja & Mehendi (Noon) - Residency Ball Room
  - Engagement Party (Night) - Grand Ball Room Hall
- **Day 2 - April 24, 2026:**
  - Haldi (Morning) - Poolside Lawn
  - Baarat (6 PM) - Internal Main Road
  - Jaimala & Reception (Evening) - Grand Ball Room Hall
  - Pheras (Evening) - Grand Ball Room Lawns
- Event cards with arch frames, color-coded accents
- Staggered reveal animation

### 4. RSVP Section
- Form fields: Name, Email, Number of Guests, Dietary Requirements, Events Attending, Message
- Two-column layout (message left, form right)
- Formspree integration
- Success state with celebration animation

### 5. Travel Section
- Venue details with map embed
- Accommodation recommendations
- Transport tips
- Accordion/expandable sections

### 6. Footer
- Couple names
- Dense botanical border
- Made with love message

---

## Development Phases

### Phase 1: Project Setup
**Status**: 🔴 Not Started

**Goals**:
- [x] Initialize git repository
- [ ] Create file structure
- [ ] Set up HTML boilerplate with Google Fonts
- [ ] Create CSS reset and variables
- [ ] Create empty JS IIFE structure
- [ ] Create documentation files

**Tasks**:
- [ ] 1.1 Create .gitignore with standard web ignores
- [ ] 1.2 Create LICENSE (MIT)
- [ ] 1.3 Create index.html with semantic structure and font links
- [ ] 1.4 Create styles.css with CSS variables and reset
- [ ] 1.5 Create app.js with IIFE scaffold
- [ ] 1.6 Create README.md skeleton

**Files to Create/Modify**:
| File | Purpose |
|------|---------|
| .gitignore | Ignore unnecessary files |
| LICENSE | MIT license |
| index.html | Main HTML structure |
| styles.css | CSS variables and base styles |
| app.js | JavaScript scaffold |
| README.md | Project documentation |

**Verification**:
- [ ] Page loads with no console errors
- [ ] Google Fonts load correctly
- [ ] CSS variables are applied (cream background visible)

---

### Phase 2: Hero Section
**Status**: 🔴 Not Started

**Goals**:
- [ ] Create stunning full-viewport hero
- [ ] Implement decorative SVG motifs (leaves)
- [ ] Add scroll indicator (lotus)
- [ ] Implement entry animations

**Tasks**:
- [ ] 2.1 Build hero HTML structure with names, date, venue
- [ ] 2.2 Create inline SVG leaf decorations for corners
- [ ] 2.3 Create lotus SVG scroll indicator with pulse animation
- [ ] 2.4 Style hero section (typography, layout, positioning)
- [ ] 2.5 Implement CSS entry animations (fade-in, stagger)

**Files to Create/Modify**:
| File | Purpose |
|------|---------|
| index.html | Add hero section markup and SVGs |
| styles.css | Hero styles and animations |

**Verification**:
- [ ] Hero fills viewport on desktop and mobile
- [ ] Names display in elegant Cormorant Garamond
- [ ] Leaves frame the corners elegantly
- [ ] Lotus pulses at bottom as scroll indicator
- [ ] Entry animations play on page load

---

### Phase 3: Navigation & Smooth Scroll
**Status**: 🔴 Not Started

**Goals**:
- [ ] Create fixed navigation bar
- [ ] Implement smooth scroll to sections
- [ ] Add active section highlighting

**Tasks**:
- [ ] 3.1 Build navigation HTML (Home, Events, RSVP, Travel)
- [ ] 3.2 Style navigation (forest green, minimal)
- [ ] 3.3 Implement smooth scroll JavaScript
- [ ] 3.4 Add Intersection Observer for active states
- [ ] 3.5 Hide/show nav on scroll direction

**Files to Create/Modify**:
| File | Purpose |
|------|---------|
| index.html | Navigation markup |
| styles.css | Navigation styles |
| app.js | Smooth scroll and intersection observer |

**Verification**:
- [ ] Navigation is fixed and visible
- [ ] Clicking nav links smoothly scrolls to section
- [ ] Active section is highlighted in nav
- [ ] Nav hides on scroll down, shows on scroll up

---

### Phase 4: Welcome & Events Sections
**Status**: 🔴 Not Started

**Goals**:
- [ ] Create welcome section with romantic message
- [ ] Build events timeline with 6 event cards (2 days)
- [ ] Implement scroll-triggered animations

**Tasks**:
- [ ] 4.1 Build welcome section HTML
- [ ] 4.2 Create event card component structure
- [ ] 4.3 Build all 6 event cards with details
- [ ] 4.4 Create Mughal arch SVG frame for cards
- [ ] 4.5 Style event cards with color-coded accents
- [ ] 4.6 Implement scroll-triggered reveal animations

**Files to Create/Modify**:
| File | Purpose |
|------|---------|
| index.html | Welcome and events sections |
| styles.css | Card styles, arch frames |
| app.js | Scroll-triggered animations |

**Verification**:
- [ ] Welcome message displays elegantly
- [ ] All 6 events display with correct details and venues
- [ ] Arch frames render around cards
- [ ] Cards animate in on scroll
- [ ] Color accents distinguish event types

---

### Phase 5: RSVP Section
**Status**: 🔴 Not Started

**Goals**:
- [ ] Create RSVP form with all required fields
- [ ] Implement form validation
- [ ] Add Formspree integration
- [ ] Create success state animation

**Tasks**:
- [ ] 5.1 Build RSVP section two-column layout
- [ ] 5.2 Create form HTML with all fields
- [ ] 5.3 Style form with floating labels
- [ ] 5.4 Implement client-side validation
- [ ] 5.5 Add Formspree form action
- [ ] 5.6 Create success state with celebration animation

**Files to Create/Modify**:
| File | Purpose |
|------|---------|
| index.html | RSVP section and form |
| styles.css | Form styles, success state |
| app.js | Form validation and submission handling |

**Verification**:
- [ ] Form displays correctly on desktop (2-col) and mobile (1-col)
- [ ] Validation prevents empty required fields
- [ ] Form submits to Formspree (or shows placeholder success)
- [ ] Success animation plays after submission

---

### Phase 6: Travel Section
**Status**: 🔴 Not Started

**Goals**:
- [ ] Create travel info section
- [ ] Add venue details with map
- [ ] Include accommodation recommendations
- [ ] Add expandable/accordion sections

**Tasks**:
- [ ] 6.1 Build travel section structure
- [ ] 6.2 Add venue details and Google Maps embed
- [ ] 6.3 Create accommodation cards
- [ ] 6.4 Add transport information
- [ ] 6.5 Implement accordion functionality
- [ ] 6.6 Style travel section

**Files to Create/Modify**:
| File | Purpose |
|------|---------|
| index.html | Travel section content |
| styles.css | Accordion styles, map container |
| app.js | Accordion toggle logic |

**Verification**:
- [ ] Map displays correctly
- [ ] Accordion sections expand/collapse
- [ ] All travel info is readable and accessible

---

### Phase 7: Sound System & Keyboard Shortcuts
**Status**: 🔴 Not Started

**Goals**:
- [ ] Implement Web Audio API sounds
- [ ] Add sound toggle control
- [ ] Implement keyboard shortcuts
- [ ] Create toast notification system

**Tasks**:
- [ ] 7.1 Create AudioContext and sound functions
- [ ] 7.2 Add sound toggle button (muted by default)
- [ ] 7.3 Wire sounds to interactions
- [ ] 7.4 Implement keyboard shortcuts
- [ ] 7.5 Create toast notification component
- [ ] 7.6 Add help toast with shortcuts list

**Files to Create/Modify**:
| File | Purpose |
|------|---------|
| index.html | Sound toggle button, toast container |
| styles.css | Toggle button, toast styles |
| app.js | Audio system, keyboard handlers, toasts |

**Verification**:
- [ ] Sound toggle appears and works
- [ ] Sounds play when enabled
- [ ] All keyboard shortcuts function
- [ ] Help toast displays shortcuts

---

### Phase 8: Footer & Polish
**Status**: 🔴 Not Started

**Goals**:
- [ ] Create elegant footer
- [ ] Add botanical border decoration
- [ ] Polish all hover/focus states
- [ ] Add micro-interactions

**Tasks**:
- [ ] 8.1 Build footer HTML
- [ ] 8.2 Create botanical border SVG
- [ ] 8.3 Polish button hover states
- [ ] 8.4 Add card hover effects
- [ ] 8.5 Implement custom selection colors
- [ ] 8.6 Add focus states for accessibility

**Files to Create/Modify**:
| File | Purpose |
|------|---------|
| index.html | Footer markup |
| styles.css | Footer styles, polish |

**Verification**:
- [ ] Footer displays with botanical border
- [ ] All interactive elements have hover states
- [ ] Focus states are visible for keyboard nav

---

### Phase 9: Responsive & Accessibility
**Status**: 🔴 Not Started

**Goals**:
- [ ] Ensure mobile responsiveness
- [ ] Implement accessibility features
- [ ] Add reduced motion support
- [ ] Test across breakpoints

**Tasks**:
- [ ] 9.1 Add mobile navigation (hamburger menu)
- [ ] 9.2 Adjust layouts for tablet/mobile
- [ ] 9.3 Add ARIA labels throughout
- [ ] 9.4 Implement prefers-reduced-motion
- [ ] 9.5 Test keyboard navigation
- [ ] 9.6 Verify color contrast

**Files to Create/Modify**:
| File | Purpose |
|------|---------|
| index.html | ARIA labels, mobile nav |
| styles.css | Responsive styles, reduced motion |
| app.js | Mobile menu toggle |

**Verification**:
- [ ] Site works on mobile devices
- [ ] Hamburger menu functions
- [ ] Screen reader can navigate
- [ ] Reduced motion users see no animations

---

### Phase 10: Deployment & Documentation
**Status**: 🔴 Not Started

**Goals**:
- [ ] Create GitHub Actions workflow
- [ ] Complete README documentation
- [ ] Optimize file sizes
- [ ] Final testing

**Tasks**:
- [ ] 10.1 Create .github/workflows/deploy.yml
- [ ] 10.2 Complete README with all sections
- [ ] 10.3 Minify inline where possible
- [ ] 10.4 Verify total size under 100KB
- [ ] 10.5 Browser testing
- [ ] 10.6 Final commit and tag

**Files to Create/Modify**:
| File | Purpose |
|------|---------|
| .github/workflows/deploy.yml | GitHub Pages deployment |
| README.md | Complete documentation |

**Verification**:
- [ ] GitHub Actions workflow passes
- [ ] Site deploys to GitHub Pages
- [ ] Total size under 100KB
- [ ] Works in all major browsers

---

## Accessibility Checklist

- [ ] Keyboard navigation works for all interactive elements
- [ ] Proper ARIA labels on buttons and controls
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA (pink on cream tested)
- [ ] Screen reader friendly
- [ ] Reduced motion support (@media prefers-reduced-motion)
- [ ] Form labels properly associated
- [ ] Skip link for main content

## Performance Checklist

- [ ] Total size under 100KB
- [ ] Smooth 60fps animations
- [ ] No layout shifts
- [ ] Fast first paint
- [ ] Fonts preloaded
- [ ] Images lazy loaded (if any)

## Browser Testing

| Browser | Status |
|---------|--------|
| Chrome | 🔴 |
| Firefox | 🔴 |
| Safari | 🔴 |
| Edge | 🔴 |
| Mobile Chrome | 🔴 |
| Mobile Safari | 🔴 |

---

## Event Details Reference

### Day 1 - April 23, 2026

| Event | Time | Venue | Color Accent |
|-------|------|-------|--------------|
| Bhaat, Matki Pooja & Mehendi | Noon | Residency Ball Room | Sage Green |
| Engagement Party | Night | Grand Ball Room Hall | Coral |

### Day 2 - April 24, 2026

| Event | Time | Venue | Color Accent |
|-------|------|-------|--------------|
| Haldi | Morning | Poolside Lawn | Orange |
| Baarat | 6:00 PM | Internal Main Road | Gold |
| Jaimala & Reception | Evening | Grand Ball Room Hall | Hot Pink |
| Pheras | Evening | Grand Ball Room Lawns | Hot Pink |

---

*Plan created for Prerna & Arpit's Sunset Bloom Wedding Website*
