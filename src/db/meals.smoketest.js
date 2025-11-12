// Simple smoke test for CRUD operations
const {
  insertMeal,
  getAllMeals,
  getMealBySlug,
  getMealById,
  updateMeal,
  deleteMeal,
} = require("./meals");

function log(title, data) {
  console.log(`\n=== ${title} ===`);
  console.dir(data, { depth: null });
}

// 1. Insert
const slug = "test-meal-" + Date.now();
const created = insertMeal({
  slug,
  title: "Test Meal",
  summary: "Summary",
  instructions: "Do things",
  image: "https://picsum.photos/seed/test-meal/600/400",
  creator: "Tester",
  creatorEmail: "tester@example.com",
});
log("Inserted meal", created);

// 2. Fetch by slug
const fetchedBySlug = getMealBySlug(slug);
log("Fetched by slug", fetchedBySlug);

// 3. Update
const updated = updateMeal(created.mealId, {
  slug,
  title: "Updated Meal Title",
  summary: "Updated Summary",
  instructions: "Updated instructions",
  image: "https://picsum.photos/seed/test-meal-updated/600/400",
  creator: "Tester",
  creatorEmail: "tester@example.com",
});
log("Update result", updated);

// 4. Fetch by id
const fetchedById = getMealById(created.mealId);
log("Fetched by id after update", fetchedById);

// 5. Delete
const deleted = deleteMeal(created.mealId);
log("Delete result", deleted);

// 6. Confirm deletion
const afterDelete = getMealById(created.mealId);
log("Lookup after delete (should be undefined)", afterDelete);
