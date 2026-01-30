# Today I Learned 🧠

A community-driven fact-sharing web application where users submit interesting facts with sources and vote on their credibility and impact using three categories.

## Features

✨ **Share Facts** - Submit interesting facts with trustworthy sources
👍 **Vote on Credibility** - Three voting categories:
  - **Interesting** (👍) - Everyday learnings and cool insights
  - **Mind-blowing** (🤯) - Surprising or shocking discoveries
  - **False** (⛔) - Facts that seem questionable or incorrect

📂 **Filter by Category** - Browse facts organized by topic:
  - Technology, Science, Finance, Society, Entertainment, Health, History, News

🎨 **Dark Theme** - Easy on the eyes with a modern dark interface

📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or build process required!

### How to Use

1. **Open the app** - Simply open `index.html` in your web browser
2. **Share a fact** - Click "Share a fact" to open the form:
   - Enter fact text (up to 200 characters)
   - Add a trustworthy source URL
   - Select a category
   - Click "Post"
3. **Vote on facts** - Click the emoji buttons to vote:
   - 👍 for interesting
   - 🤯 for mind-blowing
   - ⛔ if you think it's false
4. **Filter facts** - Use the sidebar buttons to filter by category

## Project Structure

```
today-i-learned/
├── index.html          # Main HTML structure
├── styles.css          # Dark theme styling & responsive layout
├── script.js           # Interactive features (form toggle, voting)
├── data.js             # Category definitions & initial facts
├── .github/
│   └── copilot-instructions.md  # AI agent guidance
└── README.md           # This file
```

## Data Model

Each fact contains:
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

### Categories
- `technology` - Tech and software facts
- `science` - Scientific discoveries
- `finance` - Money and economics
- `society` - Social and cultural topics
- `entertainment` - Movies, music, games
- `health` - Medical and wellness facts
- `history` - Historical events
- `news` - Current affairs

## Development

### Key Technologies
- **HTML5** - Semantic structure
- **CSS3** - Grid layout, flexbox, responsive design
- **Vanilla JavaScript** - No frameworks, pure DOM manipulation
- **Google Fonts** - "Coiny" (headings) and "Sono" (body)

### Styling Conventions
- Dark theme: `#292524` (background), `#fafaf9` (text), `#44403c` (cards)
- Categories use distinct colors (see `data.js`)
- Responsive breakpoint at 1000px

### JavaScript Patterns
- Event listeners with `.addEventListener()` and function expressions
- DOM selection with `document.querySelector()`
- CSS class toggling (`.hidden`) for visibility control
- Helper functions like `calcFactAge(year)` for logic

## Roadmap

Potential enhancements:
- ✅ Persist facts to local storage or backend database
- ✅ Implement category filtering
- ✅ Auto-increment vote counts
- ✅ Dynamic fact rendering from data array
- ✅ Prevent duplicate fact submissions
- ✅ Sort facts by vote count or recency

## License

This project is open source and available under the MIT License.

## Credits

- "Crash Course: Build a Full-Stack Web App in a Weekend!" by Jonas Schmedtmann
- Data reference: [Google Sheets backup](https://docs.google.com/spreadsheets/d/1eeldcA_OwP4DHYEvjG0kDe0cRys-cDPhc_E9P9G1e3I/edit)
- Built with vanilla web technologies
