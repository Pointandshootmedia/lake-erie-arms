# Lake Erie Arms Website

A replica of [learms.net](https://www.learms.net/) — indoor shooting complex site with full structure, content, and responsive layout.

## Run locally

1. Open the project folder in your editor or terminal.
2. Serve the files with any static server, or open `index.html` in a browser.

**Option A – Open directly**

- Double-click `index.html`, or drag it into a browser window.

**Option B – Local server (recommended)**

With Node.js and `npx`:

```bash
npx serve .
```

With Python 3:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` (or the port shown).

## Structure

- `index.html` – Main page (hero, about, services, contact)
- `styles.css` – Layout and styling (responsive, dark theme)
- `script.js` – Mobile menu toggle and footer year

## Images

All images are loaded from the **`images/`** folder. Add or replace files there to change what appears on the site. See `images/README.md` for the exact filenames (e.g. `logo.png`, `hero-graphic.png`, `25-yard-range.jpg`, etc.). Keep the same names when you swap images.

## Customize

- **Content**: Edit text and links in `index.html`.
- **Images**: Put your images in `images/` using the filenames listed in `images/README.md`.
- **Colors/fonts**: Change CSS variables at the top of `styles.css` (`:root`).
- **Contact info**: Update the address, phone, and email in the Contact section.

## Browser support

Works in current versions of Chrome, Firefox, Safari, and Edge.
