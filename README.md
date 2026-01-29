# Prerna & Arpit Wedding Website

A minimalist, elegant wedding website celebrating Prerna & Arpit's union on April 23-24, 2026 at Taj Ambad, Nashik.

## Features

- **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- **Smooth Animations** - Elegant scroll-triggered animations with reduced-motion support
- **RSVP Form** - Collect guest responses (configurable backend)
- **Event Schedule** - All ceremony details at a glance
- **Travel Information** - Venue details, maps, and accommodation info
- **Keyboard Shortcuts** - Quick navigation for power users
- **Optional Sound Effects** - Subtle audio feedback (disabled by default)

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `H` | Scroll to Home |
| `E` | Scroll to Events |
| `R` | Scroll to RSVP |
| `T` | Scroll to Travel |
| `S` | Toggle sound on/off |
| `?` | Show help toast |
| Type `help` | Show help toast (easter egg) |

## Local Development

No build tools required. Simply open `index.html` in your browser:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Or just double-click index.html
```

## RSVP Configuration

To connect the RSVP form to a backend:

1. **Formspree (Recommended)**
   - Create a form at [formspree.io](https://formspree.io)
   - Update the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

2. **Custom Backend**
   - Update the form action to your API endpoint
   - The form submits these fields: `name`, `email`, `guests`, `dietary`, `message`

## Deployment

### GitHub Pages

1. Push code to a GitHub repository
2. Go to Settings > Pages
3. Select "GitHub Actions" as the source
4. The site will deploy automatically on push to `main`

### Manual Deployment

Upload these files to any static hosting:
- `index.html`
- `styles.css`
- `app.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Accessibility

- Keyboard navigation support
- Screen reader friendly with ARIA labels
- Reduced motion support for users who prefer it
- Skip link for main content
- WCAG AA color contrast

## Color Palette - Sunset Bloom

| Color | Hex | Usage |
|-------|-----|-------|
| Hot Pink | `#D4366E` | Primary accent, CTAs |
| Sunset Orange | `#F26B3A` | Secondary accent |
| Forest Green | `#1B4D3E` | Navigation, footer |
| Warm Cream | `#FFF8F0` | Background |
| Gold | `#C9A962` | Special accents |

## File Structure

```
├── index.html      # Main HTML file
├── styles.css      # All styles
├── app.js          # JavaScript functionality
├── README.md       # This file
├── LICENSE         # MIT license
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment
```

## License

MIT License - Feel free to use this as a template for your own wedding website.

---

Made with love for Prerna & Arpit's wedding celebration.
