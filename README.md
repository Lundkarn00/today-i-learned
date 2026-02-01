# Today I Learned 🧠

A small fact-sharing web app. This repository contains a modern React implementation (in `src/`) and a legacy static version in `v1/` you can open directly.

## Quick Demo

- Open the app in development: run the React app (`npm start`).
- Or view the static legacy version in `v1/` by opening `v1/index.html` in a browser.

## What’s in this repo

- `public/` — static public files and favicon used by the React app
- `src/` — React source code (primary current app)
  - `src/App.js` — main app component and UI
  - `src/index.js` — React entry
  - `src/styles.css` — app styles
- `v1/` — legacy vanilla-JS/static version (keeps original learning code)
  - `v1/index.html`, `v1/script.js`, `v1/styles.css`, `v1/data.js`
- `package.json` — project scripts and dependencies

## Features

- Share short facts with a source and category
- Vote using three emoji categories: 👍 (interesting), 🤯 (mind-blowing), ⛔ (false)
- Filter facts by category
- Dark theme and responsive layout

## Data model

Each fact is an object like:

```javascript
{
   id: 1,
   text: "Fact description",
   source: "https://source-url.com",
   category: "technology",
   votesInteresting: 24,
   votesMindblowing: 9,
   votesFalse: 4,
   createdIn: 2021
}
```

Categories are defined (colors included) in the legacy `v1/data.js`, and the React app uses the same category list in `src/`.

## Local development (React)

Install and start the dev server:

```bash
npm install
npm start
```

The React app runs at `http://localhost:3000` by default. Edit `src/App.js` and `src/styles.css` for UI changes.

## View the legacy static version

Open `v1/index.html` directly in the browser, or serve it with a simple static server:

```bash
# from project root
npx http-server v1 -p 8080
# then open http://localhost:8080
```

## Contributing notes

- Add new categories in `v1/data.js` (and mirror in the React `src/` code if necessary).
- Form, validation, and voting are implemented in `src/` — prefer editing React code for new features.

## License

MIT

## Credits

- Initial project and learning materials adapted from a frontend tutorial and sample data (see `.github/copilot-instructions.md`).
