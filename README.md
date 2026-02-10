# Valentine Asking App

A small single-page React app (Vite) that playfully asks:
"Will you be my Valentine?"

## Quick start

Requirements: Node.js 16+ and npm.

Install and run the dev server:

```bash
npm install
npm run dev
```

Open the app at http://localhost:5173 (Vite default).

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

- `index.html` – app entry
- `src/main.jsx` – React bootstrap
- `src/App.jsx` – top-level app
- `src/components/Heart.jsx` – heart SVG + image clipping/animation
- `src/components/ValentineQuestion.jsx` – question, buttons, evasive No button logic
- `src/styles/` – CSS files
- `assets/us.jpg` – placeholder image (replace with your photo)

## Notes
- The No button uses a velocity-based requestAnimationFrame loop so it smoothly drifts away when the cursor or touch gets close.
- The Yes button triggers a cute success state with floating hearts and a livelier heart animation.
- Mobile-first and keyboard accessible: buttons are focusable and the Yes action works with Enter/Space.

## Replace the image
Drop your photo at `assets/us.jpg` (same path used by the app). If missing, a simple inline SVG fallback is used.

If you want any visual tweaks (colors, font, animations) or a local placeholder image added, tell me and I will add them.
