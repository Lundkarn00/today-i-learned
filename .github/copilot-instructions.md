# Today I Learned - AI Coding Agent Instructions

## Project Overview
A fact-sharing web application where users submit interesting facts with sources and vote using three categories: interesting (👍), mind-blowing (🤯), and false (⛔). Facts are displayed by category in a sidebar filter view.

## Architecture & Data Flow

### Fact Data Model (data.js)
- Facts have properties: `id`, `text`, `source`, `category`, `votesInteresting`, `votesMindblowing`, `votesFalse`, `createdIn`
- Categories stored as constants array with color mapping: `technology`, `science`, `finance`, `society`, `entertainment`, `health`, `history`, `news`
- Initial facts are hardcoded in `initialFacts` array (reference: Google Sheets backup at link in data.js)

### UI Structure (index.html)
- **Header**: Logo + title + "Share a fact" button (opens fact-form when clicked)
- **Sidebar**: Category filter buttons (All + individual categories with background colors matching CATEGORIES)
- **Main content**: List of fact cards with vote buttons and category tags
- **Form**: Hidden form toggled by btn-open, contains: fact text input (200 char counter), source URL input, category dropdown, post button

### Styling System (styles.css)
- Dark theme: background `#292524`, text `#fafaf9`, cards `#44403c`
- Font families: "Coiny" for headings/tags, "Sono" for body
- Responsive grid: 250px sidebar + 1fr main on desktop; stacks on screens ≤1000px
- Fact cards use flexbox with gap; emoji buttons preserve emoji exactly (👍 🤯 ⛔)

## JavaScript Patterns

### Current Implementation (script.js)
- Form toggle: `.hidden` class addition/removal, button text updates
- Utility function: `calcFactAge(year)` validates year ≤ current year and calculates age
- Comments preserve learning code paths (e.g., if/else structures, string operations)

### Expected Enhancements
- Form submission handling: validate fact text length, capture source URL and category
- Category filter: toggle buttons to filter fact list by selected category
- Vote buttons: increment vote counts (likely DOM manipulation or state tracking)
- Fact rendering: convert `initialFacts` array into DOM fact items with proper tag colors

## Developer Conventions

1. **CSS Classes over IDs**: Use `.btn`, `.fact`, `.hidden` pattern for styling reusability
2. **Event Listeners**: Attach to buttons via `.addEventListener()` with function expressions
3. **DOM Selection**: Use `document.querySelector()` for single elements
4. **Data Attributes**: Facts in HTML currently hardcoded; future state likely needs data attribute linking or JavaScript rendering
5. **Color Mapping**: Never hardcode category colors; reference CATEGORIES array for consistency

## Key Files to Understand
- [data.js](data.js) - Category constants and initial facts (single source of truth for categories)
- [index.html](index.html#L30-L35) - Form structure and fact card layout template
- [styles.css](styles.css#L64-L80) - Fact card and tag styling rules
- [script.js](script.js#L1-L15) - Form toggle pattern (example for adding more interactivity)

## Common Tasks

- **Adding new category**: Add entry to CATEGORIES array, add `<option>` to form dropdown, add button to sidebar
- **Styling fact cards**: Modify `.fact` class; preserve flexbox layout for responsive behavior
- **Form submission**: Handle `click` on `.btn` inside `.fact-form`, validate inputs, create new fact object
