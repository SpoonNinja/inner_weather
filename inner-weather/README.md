# Inner Weather

A mindfulness check-in web app for naming feelings before whatever comes next. Plain HTML, CSS, and vanilla JavaScript. No build step, no backend, no accounts, no analytics. Everything the user enters stays in their browser (localStorage).

## Run it locally

From this folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser. ES modules do not load from `file://`, so always use a local server.

## Deploy for free

### Option A: GitHub Pages (recommended)

1. Sign in at github.com and create a new public repository named `inner-weather`.
2. On the repo page, choose "Add file," then "Upload files," and drag in the contents of this folder so that `index.html` sits at the top level of the repo, not inside a subfolder. Commit.
3. Go to Settings, then Pages. Under "Build and deployment," set Source to "Deploy from a branch," choose `main` and `/ (root)`, and save.
4. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/inner-weather/`.
5. Open `js/config.js`, set `APP_URL` to that address, and commit again.
6. On your phone, open the link and add it to your home screen.

### Option B: Netlify Drop (fastest)

Go to app.netlify.com/drop and drag this folder onto the page, then create a free account to keep the site. Rename it under Site settings to get a friendlier URL. Update `APP_URL` in `js/config.js` and drag the folder again to redeploy.

## Changing the name or URL

Everything lives in one place: `js/config.js` (`APP_NAME`, `APP_URL`, `VERSION`). When you update the app after it's live, bump `VERSION` there and the `CACHE_NAME` in `sw.js` so installed copies pick up the update.

## What's included

- The full check-in flow: context, breathe, energy and body, the feelings wheel, understand cards, an optional "go deeper" step, and an intention step that names your "inner weather."
- The feelings wheel as an interactive SVG (overview and per-family focus views), plus a fully accessible list view.
- History with a 30-day summary, export to JSON/CSV, import, and delete.
- An Explore Feelings library covering all 89 entries, grouped as in the plan.
- A PWA manifest and service worker so it installs to a home screen and works offline after the first visit.
- Care callouts with the 988 Suicide & Crisis Lifeline and findahelpline.com, shown gently and never blocking the flow.

## What I could not fully complete in this pass

- The wheel's keyboard arrow-key navigation between segments (Tab/Enter/Space work; left/right/up/down ring navigation is not wired up).
- Full automated screenshot testing at 390x844 and 1280x800 for every milestone (the app was built and spot-checked, but a full Playwright screenshot pass across every screen was not run in this environment).
- Lighthouse PWA audit was not run here; the manifest and service worker follow the spec, but verify installability once deployed.
- The maskable icon uses a simple 70% scale-down for safe-zone padding rather than a hand-tuned crop.

Everything else in the plan (all three data files copied exactly, all milestones' functionality, the credits and safety copy, the deploy instructions) is implemented.
