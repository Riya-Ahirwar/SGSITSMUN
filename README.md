# SGSITS MUN 2026 
## Run it

```bash
npm install
cp .env.local.example .env.local   # fill in Mongo + Cloudinary creds
npm run dev
```

## Structure

- `src/app/page.jsx` — assembles all homepage sections
- `src/components/` — Nav, Hero (with live countdown), ThemePillars, Committees,
  Secretariat, WaysIn, Footer
- `src/data/site.js` — all current copy/content as plain JS. Edit this directly
  for now; it's shaped to match the MongoDB schema below so swapping later is a
  find-and-replace of the import, not a rewrite.
- `src/models/PastEdition.js` — Mongoose schema for storing past-edition
  summaries + Cloudinary image references (cover + gallery)
- `src/lib/mongodb.js`, `src/lib/cloudinary.js` — connection helpers
- `src/app/api/past-editions/route.js` — GET past editions from Mongo
- `src/app/api/upload/route.js` — POST an image (base64) to Cloudinary, saves
  the resulting URL to a PastEdition's gallery

## Not built yet (next steps)

- A "Past Editions" page/section pulling from `/api/past-editions` — this is
  where your previous MUN photos/data go once you're ready to move off
  placeholders
- Multi-page structure (Our Story, Fees & Packages, Awards, Delegate Conduct,
  Secretariat page, etc.) — the reference site is a full multi-page site;
  this scaffold currently covers the homepage only, as a single-page layout
  matching your existing draft
- The "river filling" scroll-driven visual from the reference hero — skipped
  for now since it's decorative and CSS/JS heavy; can add as a later pass
- Registration form wiring (Google Form links vs. your own form + Mongo)

## Fill in your real content

Replace the placeholder entries in `src/data/site.js`:
- `secretariat` — add your remaining 6 leadership members (photos can point
  to Cloudinary URLs once uploaded, or stay as initials avatars)
- `event.email` / `instagram` — confirm these are correct
