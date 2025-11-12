const { initializeDb } = require("./initdb");

// Get the singleton DB connection
const db = initializeDb();

// utility: fake delay
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// Create a new meal
async function insertMeal(meal) {
  const stmt = db.prepare(`
    INSERT INTO meals (slug, title, summary, instructions, image, creator, creatorEmail)
    VALUES (@slug, @title, @summary, @instructions, @image, @creator, @creatorEmail)
  `);
  // fake delay to simulate latency
  await sleep(2000);
  const info = stmt.run(meal);
  return { changes: info.changes, mealId: Number(info.lastInsertRowid) };
}

// Read all meals
async function getAllMeals() {
  const stmt = db.prepare("SELECT * FROM meals ORDER BY createdAt DESC");
  await sleep(2000);
  return stmt.all();
}

// Read a single meal by slug
async function getMealBySlug(slug) {
  const stmt = db.prepare("SELECT * FROM meals WHERE slug = ?");
  await sleep(2000);
  return stmt.get(slug);
}

// Read a single meal by id (optional helper)
async function getMealById(mealId) {
  const stmt = db.prepare("SELECT * FROM meals WHERE mealId = ?");
  await sleep(2000);
  return stmt.get(mealId);
}

// Update a meal
async function updateMeal(mealId, meal) {
  const stmt = db.prepare(`
    UPDATE meals 
    SET slug = @slug,
        title = @title,
        summary = @summary,
        instructions = @instructions,
        image = @image,
        creator = @creator,
        creatorEmail = @creatorEmail
    WHERE mealId = @mealId
  `);
  await sleep(2000);
  const info = stmt.run({ ...meal, mealId });
  return { changes: info.changes };
}

// Delete a meal
async function deleteMeal(mealId) {
  const stmt = db.prepare("DELETE FROM meals WHERE mealId = ?");
  await sleep(2000);
  const info = stmt.run(mealId);
  return { changes: info.changes };
}

module.exports = {
  insertMeal,
  getAllMeals,
  getMealBySlug,
  getMealById,
  updateMeal,
  deleteMeal,
};
