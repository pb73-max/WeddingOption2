# PRERNA & ARPIT
## Wedding Website Design Direction

*A Minimalist Fusion of Indian Heritage & Contemporary Elegance*

---

## 1. Design Philosophy

This website embodies the concept of *"Less is More, More is Love"* — where minimalist design principles meet the rich visual heritage of Indian wedding traditions. The goal is to create an award-winning digital experience that feels simultaneously contemporary and culturally rooted.

### Core Design Principles

**Generous White Space:** Allow the vibrant color palette to breathe. White/cream backgrounds dominate, with color used as deliberate accent.

**Restrained Ornamentation:** Traditional motifs appear as subtle, elegant accents — not overwhelming patterns. Think single lotus, not lotus field.

**Asymmetrical Balance:** Modern layouts with off-center placements that feel fresh yet harmonious.

**Intentional Animation:** Motion design that serves storytelling, never gratuitous. Each animation should feel like unfolding, revealing, blooming.

---

## 2. Color Palette — Sunset Bloom

Inspired by the golden hour of an Indian summer evening — when marigolds glow, bougainvillea deepens, and garden greens turn lush against the warm sky.

### Primary Colors

| Color | Hex | Role |
|-------|-----|------|
| Hot Pink | `#D4366E` | Primary Accent |
| Sunset Orange | `#F26B3A` | Secondary Accent |
| Forest Green | `#1B4D3E` | Anchor/Contrast |
| Warm Cream | `#FFF8F0` | Background |

### Extended Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Soft Coral | `#F5A572` | Gradients and hover states |
| Deep Magenta | `#A82D5B` | Darker pink for text on light backgrounds |
| Sage Green | `#2D5A47` | Lighter green variant for sections |
| Gold Accent | `#C9A962` | Sparingly, for special elements |
| Charcoal Text | `#2C2C2C` | Primary body text |

### Color Application Rules

- Background should be predominantly warm cream (`#FFF8F0`) or white (`#FFFFFF`)
- Hot Pink is the hero — use for primary CTAs, names, key headings
- Forest Green grounds the design — navigation, footer, secondary elements
- Orange appears in gradients, floral motifs, and transitional moments

---

## 3. Typography System

Clean, contemporary fonts that allow the vibrant palette and motifs to shine. Typography should feel elegant but never fussy.

### Font Pairing

**Display/Headlines:** Cormorant Garamond (Google Fonts) — elegant serif with beautiful italics. Use for couple's names, section titles, and ceremonial text.

**Body Text:** Inter or DM Sans (Google Fonts) — highly legible, modern sans-serif. Use for navigation, descriptions, and all readable content.

**Accent Script (optional):** Lavishly Yours or Great Vibes — very sparingly, only for "&" symbol or single decorative words.

### Type Scale (Desktop)

| Element | Size | Font |
|---------|------|------|
| Hero Names | 72–96px | Cormorant Garamond, weight 500 |
| Section Headers | 48–56px | Cormorant Garamond, weight 400 |
| Subsection Headers | 24–32px | Inter, weight 600 |
| Body Text | 16–18px | Inter, weight 400 |
| Captions/Meta | 14px | Inter, weight 400 |

### CSS Custom Properties for Typography

```css
--font-display: 'Cormorant Garamond', Georgia, serif;
--font-body: 'Inter', -apple-system, sans-serif;
--font-accent: 'Lavishly Yours', cursive;
--line-height-tight: 1.1;
--line-height-normal: 1.6;
--letter-spacing-wide: 0.05em;
```

---

## 4. Visual Elements & Motifs

Traditional Indian motifs reimagined with modern restraint. Each element should feel hand-crafted, artisanal — never clipart or generic.

### Primary Motifs

**Lotus Flower:** Symbol of purity and new beginnings. Use as section dividers, corner accents, or animated reveals. Render in line art or flat color (pink/orange gradient).

**Marigold Blooms:** Represents celebration and auspiciousness. Use in border patterns and as floating/parallax elements. Orange with subtle gradient.

**Tropical Leaves:** Banana leaves, palm fronds, and monstera-inspired shapes. Forest green, used as frame elements and scroll-triggered reveals.

**Paisley (Buta):** Traditional Indian motif, abstracted into modern curves. Use sparingly as corner flourishes.

**Mughal Arch Frames:** Architectural element to frame photos, text blocks, or schedule cards. Simplified outline style.

### Motif Placement Strategy

| Section | Motif Treatment |
|---------|-----------------|
| Hero Section | Leaves frame the edges, lotus at bottom center as scroll indicator |
| Between Sections | Minimal botanical dividers (single stem, 3 leaves) |
| Event Cards | Arch frame around each event, small marigold accent |
| Footer | Dense but elegant botanical border as closure |

### Implementation Approach

**SVG Illustrations:** All motifs as optimized SVGs for crisp scaling and animation control. Use `currentColor` for easy theming.

**Lottie Animations:** For complex floral animations (blooming lotus, falling petals). Lightweight JSON-based animations.

**CSS Patterns:** Repeating background patterns for textured sections using SVG data URIs.

---

## 5. Animation & Interaction Design

Motion should feel organic, like nature unfolding. Key philosophy: *reveal, don't startle*.

### Scroll-Triggered Animations (Terminology)

| Term | Description |
|------|-------------|
| **Intersection Observer API** | Native browser API for detecting when elements enter viewport. Preferred for performance. |
| **ScrollTrigger (GSAP)** | GreenSock plugin for advanced scroll-linked animations. Use for complex sequences. |
| **Framer Motion (React)** | If building with React, use `whileInView` prop for scroll triggers. |
| **AOS (Animate On Scroll)** | Lightweight library for simple fade/slide reveals. Good for quick implementation. |
| **Lenis/Locomotive Scroll** | Smooth scroll libraries for that buttery, premium feel. |

### Animation Types & Specifications

#### 1. Fade & Rise (Default Entry)
Elements fade in while translating up 20–40px.
- Duration: 0.6–0.8s
- Easing: `ease-out` or `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

```css
/* Initial state */
transform: translateY(40px);
opacity: 0;

/* Final state */
transform: translateY(0);
opacity: 1;
```

#### 2. Staggered Reveal
Multiple elements animate sequentially with 0.1–0.15s delay between each.
- Use for: event cards, navigation links, gallery items

#### 3. Parallax Scroll
Background elements move at different rates than foreground.
- Decorative florals at 0.3–0.5x scroll speed
- Creates depth without distraction

```css
transform: translateY(calc(var(--scroll-y) * 0.3));
```

#### 4. Draw/Stroke Animation (SVG)
SVG paths animate as if being drawn.
- Perfect for: border reveals, motif illustrations, section dividers

```css
/* Initial */
stroke-dasharray: 1000;
stroke-dashoffset: 1000;

/* Final */
stroke-dashoffset: 0;
```

#### 5. Scale Bloom
Elements scale from 0.8 to 1 while fading in.
- Use for: lotus motifs, image reveals, modal appearances
- Mimics flower opening

#### 6. Horizontal Scroll Section
Vertical scroll triggers horizontal movement of a container.
- Ideal for: timeline/schedule section showing event progression

### Micro-interactions

| Element | Interaction |
|---------|-------------|
| Button Hover | Scale to 1.02, subtle shadow increase, 0.2s ease |
| Link Hover | Underline draws in from left, gradient color shift |
| Card Hover | Lift with shadow (translateY: -4px), border color intensifies |
| Form Focus | Border animates to pink, subtle glow effect |

---

## 6. Page-by-Page Design Direction

### 6.1 Home Page

The hero moment — elegant, impactful, emotionally resonant.

#### Hero Section (100vh)

Full viewport height with centered couple names. Background: warm cream with subtle texture or gradient (cream to soft pink at edges).

**Layout:** Names stacked vertically, "Prerna" and "Arpit" with decorative "&" between. Elegant script ampersand optional.

**Floral Frame:** Tropical leaves emerge from corners (position: fixed for subtle parallax). Leaves in forest green, soft shadow.

**Scroll Indicator:** Animated lotus or simple chevron at bottom, gentle pulse animation.

**Entry Animation:** Names fade in with stagger (Prerna → & → Arpit), leaves slide in from edges.

#### Welcome/Intro Section

Brief romantic message or quote. Clean typography, generous padding.

Consider: Photo of couple integrated with arch frame motif.

#### Quick Links/Navigation Cards

Grid of 3–4 cards linking to Schedule, RSVP, Travel. Each card: icon/illustration, title, brief text. Staggered reveal on scroll.

---

### 6.2 Schedule Page

Clear, scannable, celebratory. Two days of events presented beautifully.

#### Page Structure

Two main sections: Day 1 and Day 2. Consider horizontal scroll timeline OR vertical card stack.

#### Event Cards — Design

Each event in a card with Mughal arch frame. Card contains:
- Event name (Cormorant, large)
- Time
- Venue name
- Brief description
- Dress code hint (optional)

**Color coding:** Each event can have accent color — e.g., Haldi in orange, Mehndi in green, Pheras in pink.

**Animation:** Cards reveal with stagger as user scrolls. Arch frame draws in (stroke animation).

#### Events to Display

**Day 1:**
- **Bhaat + Mehendi** — afternoon celebration, henna artists
- **Cocktail Engagement Party** — evening, glamorous

**Day 2:**
- **Haldi** — morning, joyful yellow ceremony
- **Baarat + Pheras + Reception** — the main event, grand celebration

---

### 6.3 RSVP Section

Warm, welcoming, frictionless. Make guests feel the love while collecting necessary info.

#### Form Design

Clean form with floating labels.

**Fields:**
- Name
- Email
- Number of Guests
- Dietary Requirements (optional)
- Events Attending (checkbox for each)
- Message to Couple (textarea)

**Styling:** Minimal borders, focus states in pink. Submit button: solid pink with white text, hover scales slightly.

**Success State:** Confetti animation or lotus bloom with thank you message.

#### Layout

Two-column on desktop: Left has warm message and decorative illustration, Right has form. Single column on mobile.

---

### 6.4 Travel Section

Practical information presented beautifully. Help guests plan their journey.

#### Content Blocks

- Venue details with embedded map (Google Maps styled to match palette)
- Accommodation recommendations — card format with photos, links
- Transport tips (airport, local travel)
- Things to do nearby (optional tourism suggestions)

#### Design Notes

Accordion/expandable sections for dense info. Icons for each category. Maps should use custom styling (Snazzy Maps or Mapbox) to match color palette.

---

## 7. Technical Specifications for Development

### Recommended Tech Stack

| Component | Recommendation |
|-----------|----------------|
| Framework | Next.js (React) or Astro — excellent for static/hybrid sites with good animation support |
| Styling | Tailwind CSS with custom theme configuration |
| Animation | Framer Motion (React) or GSAP with ScrollTrigger |
| Forms | React Hook Form + Formspree/Netlify Forms for RSVP |
| Deployment | Vercel or Netlify |

### CSS Custom Properties (Full)

```css
:root {
  /* Colors */
  --color-pink: #D4366E;
  --color-pink-dark: #A82D5B;
  --color-orange: #F26B3A;
  --color-coral: #F5A572;
  --color-green: #1B4D3E;
  --color-sage: #2D5A47;
  --color-gold: #C9A962;
  --color-cream: #FFF8F0;
  --color-text: #2C2C2C;
  
  /* Typography */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  
  /* Spacing */
  --space-section: clamp(4rem, 10vw, 8rem);
  --space-element: clamp(1rem, 3vw, 2rem);
  
  /* Animation */
  --ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 0.2s;
  --duration-normal: 0.4s;
  --duration-slow: 0.8s;
}
```

### Animation Library Setup (Framer Motion)

```jsx
// Reusable animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

// Usage
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  <motion.div variants={fadeInUp}>Content</motion.div>
</motion.div>
```

### Key Development Notes

**Responsive Breakpoints:** Mobile-first. sm: 640px, md: 768px, lg: 1024px, xl: 1280px

**Image Optimization:** Use next/image or similar. WebP format. Lazy load below-fold images.

**SVG Implementation:** Inline SVGs for animatable motifs. Use SVGR for React.

**Accessibility:** `prefers-reduced-motion`: disable animations. Proper ARIA labels. Color contrast compliant.

**Performance Target:** Lighthouse 90+ on all metrics. Critical CSS inlined.

---

## 8. Quick Reference — Terminology Glossary

Key terms for effective communication with Claude Code or any developer.

### Animation & Scroll

| Term | Definition |
|------|------------|
| Scroll-triggered animation | Animation that starts when element enters viewport |
| Parallax | Elements moving at different speeds during scroll |
| Stagger | Sequential delay between multiple animating elements |
| Easing | Acceleration curve of animation (ease-out = fast start, slow end) |
| Intersection Observer | Browser API for detecting element visibility |
| GSAP/ScrollTrigger | Professional animation library |
| Framer Motion | React animation library |

### SVG & Graphics

| Term | Definition |
|------|------------|
| Stroke animation | SVG path appears to draw itself |
| currentColor | SVG inherits text color (easy theming) |
| Lottie | JSON-based animations from After Effects |
| Data URI | Embedded image/SVG in CSS |

### Layout & CSS

| Term | Definition |
|------|------------|
| CSS Grid | Two-dimensional layout system |
| Flexbox | One-dimensional layout (rows or columns) |
| CSS Custom Properties | Variables in CSS (--color-pink) |
| clamp() | Responsive value between min and max |
| Viewport units (vh/vw) | Size relative to browser window |

### Design Elements

| Term | Definition |
|------|------------|
| Hero section | Full-screen opening section |
| CTA (Call to Action) | Button prompting user action |
| Floating labels | Form labels that move above input on focus |
| Accordion | Collapsible content sections |
| Modal | Overlay popup/dialog |

---

*— End of Design Document —*

**Prerna & Arpit | Sunset Bloom Wedding**
