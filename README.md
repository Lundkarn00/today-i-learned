# Today I Learned 🧠

A fact-sharing web app built with React, featuring a legacy static demo. Users can submit interesting facts, vote, and filter by category. Modern UI, dark theme, and responsive design.

## Demo

- Run the React app: `npm start`
- Or open the static demo: `v1/index.html`

## Project Structure

```
today-i-learned/
├── public/             # Static assets for React app
├── src/                # React app (main implementation)
├── v1/                 # Legacy static/vanilla-JS demo
├── package.json
└── README.md
```

### Key Files

- `src/App.js` — Main React app and components
- `src/styles.css` — Global styles and responsive rules
- `src/supabase.js` — Supabase client setup
- `v1/data.js` — Original category list and sample facts

## Data Model

Facts follow this shape:

```js
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

Categories and colors are defined in `v1/data.js` and mirrored in `src/`.

## Features

- Submit facts with source and category
- Vote on facts (👍 interesting, 🤯 mind-blowing, ⛔ false)
- Category filtering, disputed badge for high false votes
- Dark theme and responsive layout

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   npm install lucide-react
   ```
2. (Optional) Configure Supabase:
   - Create a Supabase project and a `facts` table matching the data model above.
   - Add your keys to `.env.local`:
     ```env
     REACT_APP_SUPABASE_URL=your-url
     REACT_APP_SUPABASE_KEY=your-key
     ```
3. Start the dev server:
   ```bash
   npm start
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Legacy Demo (v1)

Open `v1/index.html` in a browser, or serve with:

```bash
npx http-server v1 -p 8080
```

## Contributing

- Add categories in `v1/data.js` and update colors in `src/`
- Implement features in `src/`, keep legacy demo in `v1/` for reference
- Update Supabase queries in `src/App.js` if schema changes

## Troubleshooting

- Missing `REACT_APP_SUPABASE_*` env variables: app won’t fetch/persist data
- Syntax errors in `src/App.js` may crash components

## License

MIT
