# Interactive Portfolio Website

An interactive, single-page portfolio website built with vanilla HTML, CSS, and JavaScript. It includes a sticky header, animated hero section, skills cards, interactive image gallery with lightbox, scroll-triggered animations, and a dark/light theme toggle.

## Structure

- `index.html` — Main layout with all sections and navigation.
- `styles.css` — Global styles, layout, responsive behavior, animations, and micro-interactions.
- `script.js` — Smooth scrolling, sticky header logic, scroll-triggered animations, gallery lightbox, and theme toggle.
- `assets/` — Place your profile image (`profile.jpg`), gallery images (`gallery-*.jpg` and `gallery-*-thumb.jpg`), favicon (`favicon.png`), and optional `resume.pdf`.

## Sections in `index.html`

- **Hero (`#hero`)**: Name, role, short tagline, and primary CTAs: "View Work" (scrolls to gallery) and "Download Resume" (expects `assets/resume.pdf`).
- **About (`#about`)**: Intro paragraphs and three fact cards (location, focus, interests).
- **Skills (`#skills`)**: Three skill groups (Frontend, UI/UX, Tools) with chip-style tags.
- **Gallery (`#gallery`)**: 6 image tiles that open in a lightbox; you can add/remove items by adjusting the buttons with the `gallery-item` class.
- **Contact (`#contact`)**: Simple contact copy, social/email links, and a non-functional contact form (you can later wire it to a backend or service).

## Interactions in `script.js`

- **Smooth scrolling & active nav**: Clicking navigation links smoothly scrolls to each section; the current section's nav link is highlighted based on scroll position using `IntersectionObserver`.
- **Sticky header behavior**: The header gains a solid background and shadow after scrolling past part of the hero section.
- **Scroll-triggered animations**: Elements with `[data-animate]` gain an `in-view` class when entering the viewport, enabling fade/slide-in effects via CSS.
- **Gallery lightbox**: Clicking a `.gallery-item` button opens a full-size image with caption in a lightbox; supports close, previous/next buttons, clicking the backdrop, and keyboard controls (ESC, ←, →).
- **Dark/light theme toggle**: The button in the header toggles a `dark-theme` class on `body` and persists the preference in `localStorage` (`portfolio-theme` key), defaulting to the system color scheme if no preference is stored.

## Customization

You can customize:

- **Text content**: Edit headings, paragraphs, and facts in `index.html` (search for placeholder text like "Your City, Country" or "you@example.com").
- **Profile & gallery images**: Replace the image `src` values in the hero and gallery sections with your own files placed in `assets/`.
- **Colors & typography**: Adjust CSS variables in the `:root` selector at the top of `styles.css`.
- **Skills & links**: Update skill chips in the `#skills` section and social links in the `#contact` section.

## Running Locally

No build step is required. Open `index.html` directly in a browser or use a simple static server (for example, VS Code Live Server) to view the site.

## Deployment

You can deploy this as a static site on GitHub Pages, Netlify, Vercel, or any static hosting provider by uploading `index.html`, `styles.css`, `script.js`, and the `assets/` directory.

