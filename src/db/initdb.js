const Database = require("better-sqlite3");
const path = require("path");

// Keep only database initialization logic here
let db;

function initializeDb() {
  if (db) return db; // singleton

  db = new Database(path.join(process.cwd(), "meals.db"));

  // Optional: better concurrency and durability
  try {
    db.pragma("journal_mode = WAL");
  } catch (_) {}

  // Ensure schema exists
  db.exec(`
    CREATE TABLE IF NOT EXISTS meals (
      mealId INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      instructions TEXT NOT NULL,
      image TEXT,
      creator TEXT NOT NULL,
      creatorEmail TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migrate: add image column if missing (for existing databases)
  try {
    const cols = db.prepare("PRAGMA table_info('meals')").all();
    const hasImage = cols.some((c) => c.name === "image");
    if (!hasImage) {
      db.exec("ALTER TABLE meals ADD COLUMN image TEXT");
    }
  } catch (_) {}

  // Seed default meals if table is empty
  const countStmt = db.prepare("SELECT COUNT(*) as count FROM meals");
  const { count } = countStmt.get();
  if (count === 0) {
    const seedMeals = [
      {
        slug: "classic-spaghetti-bolognese",
        title: "Classic Spaghetti Bolognese",
        summary: "Rich tomato and beef sauce served over al dente spaghetti.",
        instructions:
          "Brown minced beef. Add onions, garlic, carrots. Stir in tomatoes, simmer 45 min. Cook spaghetti. Combine and serve with parmesan.",
        image: "/images/classic-spaghetti-bolognese.svg",
        creator: "System",
        creatorEmail: "system@example.com",
      },
      {
        slug: "veggie-quinoa-bowl",
        title: "Veggie Quinoa Bowl",
        summary: "Protein-packed quinoa with roasted seasonal vegetables.",
        instructions:
          "Rinse quinoa, simmer until fluffy. Roast chopped vegetables with olive oil and salt. Toss together with lemon dressing.",
        image: "/images/veggie-quinoa-bowl.svg",
        creator: "System",
        creatorEmail: "system@example.com",
      },
      {
        slug: "lemon-herb-chicken",
        title: "Lemon Herb Chicken",
        summary:
          "Pan-seared chicken breasts with bright lemon and fresh herbs.",
        instructions:
          "Marinate chicken in lemon juice, garlic, and herbs. Sear both sides until cooked through. Deglaze pan with a splash of stock and reduce.",
        image: "/images/lemon-herb-chicken.svg",
        creator: "System",
        creatorEmail: "system@example.com",
      },
    ];

    const insertStmt = db.prepare(`
      INSERT INTO meals (slug, title, summary, instructions, image, creator, creatorEmail)
      VALUES (@slug, @title, @summary, @instructions, @image, @creator, @creatorEmail)
    `);
    const insertMany = db.transaction((meals) => {
      for (const meal of meals) insertStmt.run(meal);
    });
    insertMany(seedMeals);
  }

  return db;
}

module.exports = { initializeDb };
