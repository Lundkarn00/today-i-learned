import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./styles.css";
import { Sun, Moon } from "lucide-react";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: "2021-06-01T12:00:00.000Z",
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: "2019-03-15T09:00:00.000Z",
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: "2015-01-01T08:00:00.000Z",
  },
];

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span style={{ fontSize: "40px" }}>{count}</span>
      <button className="btn btn-large" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  const [isSortingType, setIsSortingType] = useState(null);

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");
        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        // Default sort by newest if no sort selected
        query = query.order(isSortingType || "created_at", {
          ascending: false,
        });

        const { data: facts, error } = await query.limit(1000);
        if (!error) setFacts(facts);
        else alert("There was a problem getting data");
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory],
  );

  return (
    <>
      <Header
        showForm={showForm}
        setShowForm={setShowForm}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <div>
          <CategoryFilter setCurrentCategory={setCurrentCategory} />
          <SortFacts
            facts={facts}
            setFacts={setFacts}
            sortingType={isSortingType}
            setIsSortingType={setIsSortingType}
            darkMode={darkMode}
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <FactList
            facts={
              isSortingType && isSortingType !== "none"
                ? [...facts].sort((a, b) => b[isSortingType] - a[isSortingType])
                : facts
            }
            setFacts={setFacts}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm, darkMode, setDarkMode }) {
  const appTitle = "Today I Learned";

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>{appTitle}</h1>
      </div>
      <div className="logo">
        {/* Toggle Light and Dark Mode */}
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <button
          className="btn btn-large btn-open"
          onClick={() => setShowForm((show) => !show)}
        >
          {showForm ? "Close" : "Share a fact"}
        </button>
      </div>
    </header>
  );
}

function DarkModeToggle({ darkMode, setDarkMode }) {
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`theme-toggle ${darkMode ? "dark" : "light"}`}
        aria-label="Toggle dark mode"
      >
        <div className="icon-wrapper">
          <Sun className={`theme-icon sun ${darkMode ? "hidden" : ""}`} />
          <Moon className={`theme-icon moon ${darkMode ? "visible" : ""}`} />
        </div>
        <div className={`pulse-ring ${darkMode ? "dark" : "light"}`}></div>
      </button>
    </>
  );
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();

    // 2. Check if data is valid. If so, create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3. Upload fact to Supabase and receive the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([
          { text, source, category, created_at: new Date().toISOString() },
        ])
        .select();
      setIsUploading(false);

      // 4. Add the new fact to the UI: add the fact to state
      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      // 5. Reset input fields
      setText("");
      setSource("");
      setCategory("");

      // 6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <div className="fact-input-group">
        <input
          type="text"
          placeholder="Share a fact with the world..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isUploading}
          maxLength={200}
        />
        <span>{200 - textLength}</span>
        {textLength === 200 && alert("You have reached the character limit!")}
      </div>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy source..."
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function SortFacts({ sortingType, setIsSortingType, darkMode }) {
  function handleSort(e, columnName) {
    e.preventDefault(); // Prevent form submition

    //If clicking the same button again, remove the sort
    if (sortingType === columnName) {
      setIsSortingType("none");
    } else {
      setIsSortingType(columnName);
    }
  }

  return (
    <div className="sorting-buttons">
      <h3>Sorting Facts</h3>
      <div>
        <button
          type="button"
          className={`btn btn-category category sorting-btn ${
            darkMode ? "dark" : "light"
          }`}
          style={{
            background: sortingType === "votesInteresting" ? "#3b82f6" : "",
            color: sortingType === "votesInteresting" ? "white" : "",
            fontWeight: sortingType === "votesInteresting" ? "bold" : "normal",
          }}
          onClick={(e) => handleSort(e, "votesInteresting")}
        >
          Sort by Interesting
        </button>
        <button
          type="button"
          className={`btn btn-category category sorting-btn ${
            darkMode ? "dark" : "light"
          }`}
          style={{
            background: sortingType === "votesMindblowing" ? "#3b82f6" : "",
            color: sortingType === "votesMindblowing" ? "white" : "",
            fontWeight: sortingType === "votesMindblowing" ? "bold" : "normal",
          }}
          onClick={(e) => handleSort(e, "votesMindblowing")}
        >
          Sort by Mindblowing
        </button>
        <button
          type="button"
          className={`btn btn-category category sorting-btn ${
            darkMode ? "dark" : "light"
          }`}
          style={{
            background: sortingType === "votesFalse" ? "#3b82f6" : "",
            color: sortingType === "votesFalse" ? "white" : "",
            fontWeight: sortingType === "votesFalse" ? "bold" : "normal",
          }}
          onClick={(e) => handleSort(e, "votesFalse")}
        >
          Sort by False
        </button>
      </div>
    </div>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length === 0)
    return (
      <p className="message">
        No facts for this category yet! Create the first one 😜
      </p>
    );

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [votedButton, setVotedButton] = useState(null);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    if (isUpdating) return;
    if (votedButton === columnName) return;
    setIsUpdating(true);

    let updates = {};

    // If clicking the same button again, remove the vote
    if (votedButton === columnName) {
      updates[columnName] = fact[columnName] - 1;

      setIsUpdating(true);
      const { data: updatedFact, error } = await supabase
        .from("facts")
        .update({ [columnName]: fact[columnName] + 1 })
        .eq("id", fact.id)
        .select()
        .single();

      setIsUpdating(false);

      if (!error)
        setFacts((facts) =>
          facts.map((f) => (f.id === fact.id ? updatedFact[0] : f)),
        );
      setVotedButton(null); //Clear the vote
    }
    // If clicking a different button, move the vote
    else if (votedButton) {
      updates[votedButton] = fact[votedButton] - 1; // Remove from old button
      updates[columnName] = fact[columnName] + 1; // Add to new button

      const { data: updatedFact, error } = await supabase
        .from("facts")
        .update(updates)
        .eq("id", fact.id)
        .select()
        .single();

      setIsUpdating(false);

      if (!error) {
        setFacts((facts) =>
          facts.map((f) => (f.id === fact.id ? updatedFact : f)),
        );
        setVotedButton(columnName); // Update to new button
      }
    }
    // First time voting
    else {
      updates[columnName] = fact[columnName] + 1;

      const { data: updatedFact, error } = await supabase
        .from("facts")
        .update(updates)
        .eq("id", fact.id)
        .select()
        .single();

      setIsUpdating(false);

      if (!error) {
        setFacts((facts) =>
          facts.map((f) => (f.id === fact.id ? updatedFact : f)),
        );
        setVotedButton(columnName); // Set the voted button
      }
    }
  }

  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[⛔DISPUTED]</span> : null}
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
        <span className="time-ago">{getTimeAgo(fact.created_at)}</span>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

function getTimeAgo(timestamp) {
  if (!timestamp) return "unknown";
  const now = new Date();
  const factDate = new Date(timestamp);
  if (isNaN(factDate.getTime())) {
    console.warn("Invalid created_at value:", timestamp);
    return "unknown";
  }
  const diffInSeconds = Math.floor((now - factDate) / 1000);
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}d ago`;
  }
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}mo ago`;
  }
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y ago`;
}

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Lundkarn00 | All rights reserved.</p>
    </footer>
  );
}

export default App;
