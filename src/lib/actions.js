"use server";
import fs from "node:fs/promises";
import slugify from "slugify";
import { insertMeal } from "@/db/meals";

export async function submitMeal(prevState, formData) {
  console.log("prevState:", prevState);
  const title = formData.get("title");
  const slug = slugify(title, { lower: true });
  const image = formData.get("image");
  const imageName = `${slug}.${image.name.split(".")[1]}`;
  const imagePath = `public/images/${imageName}`;
  try {
    const imageBuffer = await image.arrayBuffer();
    await fs.writeFile(imagePath, Buffer.from(imageBuffer));
    await insertMeal({
      slug: slug,
      title: title,
      image: `/images/${imageName}`,
      summary: formData.get("summary"),
      instructions: formData.get("instructions"),
      creator: formData.get("creator"),
      creatorEmail: formData.get("creatorEmail"),
    });
    return {
      code: 200,
      message: "Meal submitted successfully!",
    };
  } catch (err) {
    return {
      code: 500,
      message: "Error saving meal. Please try again.",
    };
  }
}
