# Today I Learned 🧠

A small fact-sharing web app. This repository contains a modern React implementation (in `src/`) and a legacy static version in `v1/` you can open directly.

## Quick Demo

- Open the app in development: run the React app (`npm start`).
- Or view the static legacy version in `v1/` by opening `v1/index.html` in a browser.

## What’s in this repo

- `public/` — static public files and favicon used by the React app
- `src/` — React source code (primary current app)
  - `src/App.js` — main app component and UI

  # Today I Learned 🧠

  Lightweight fact-sharing app with a modern React implementation (located in `src/`) and a legacy static version in `v1/` for quick demos.

  ## Quick start
  1. Install dependencies:

  ```bash
  npm install
  ```

  2. (Optional) Configure Supabase:
  - Create a free Supabase project and a `facts` table matching the data model below.
  - Set environment variables in a `.env.local` file at the project root:

  ```env
  REACT_APP_SUPABASE_URL=https://your-project.supabase.co
  REACT_APP_SUPABASE_KEY=public-anon-key
  ```

  3. Start the dev server:

  ```bash
  npm start
  ```

  4. Build for production:

  ```bash
  npm run build
  ```

  Run tests:

  ```bash
  npm test
  ```

  The React app runs at `http://localhost:3000` by default.

  ## Project layout

  ```
  today-i-learned/
  ├── public/             # static assets for React app
  ├── src/                # React app (current implementation)
  ├── v1/                 # legacy static/vanilla-JS demo
  ├── package.json
  └── README.md
  ```

  Key files:
  - `src/App.js` — main React app and components (Header, NewFactForm, FactList, Fact)
  - `src/styles.css` — global styles and responsive rules
  - `v1/data.js` — original category list and sample facts

  ## Data model

  Facts follow this shape (used by Supabase and the React UI):

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

  Categories and their colors are defined in `v1/data.js` and mirrored in `src/`.

  ## Features
  - Submit facts with a source and category
  - Vote on facts (👍 interesting, 🤯 mind-blowing, ⛔ false)
  - Category filtering, disputed badge when false votes exceed upvotes
  - Dark theme and responsive layout

  ## Development notes
  - The React app uses `@supabase/supabase-js` to persist facts and votes. See `src/supabase.js` for the client setup.
  - UI patterns: prefer `document`-free React components, use `useState` and `useEffect` for state and data fetching.
  - CSS: dark theme variables and responsive breakpoints are in `src/styles.css`.

  ## Legacy demo (v1)

  Open `v1/index.html` in a browser for the original static demo, or serve the folder with a simple static server:

  ```bash
  npx http-server v1 -p 8080
  # then open http://localhost:8080
  ```

  ## Contributing
  - Add categories by updating `v1/data.js` and mirroring colors in `src/`.
  - Implement new features in `src/` and keep the legacy demo in `v1/` as a reference.
  - When modifying Supabase schema, update client queries in `src/App.js`.

  ## Troubleshooting
  - If you see errors about components in the browser, open the developer console for stack traces.
  - Common issues:
    - Missing `REACT_APP_SUPABASE_*` env variables — the app won't fetch/persist data.
    - Syntax errors in `src/App.js` (e.g., incorrect hooks) will crash components — check the file for stray brackets or undefined identifiers.

  ## License

  MIT

  ***
