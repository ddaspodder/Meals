import { getAllMeals } from "@/db/meals";
import styles from "./page.module.css";
import Image from "next/image";
import { Suspense } from "react";

async function MealsGrid() {
  const meals = await getAllMeals();
  return (
    <ul className={styles.grid}>
      {meals.map((meal) => (
        <li className={styles.card} key={meal.mealId}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={meal.image}
              alt={meal.title}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>

          <div className={styles.content}>
            <h2 className={styles.mealTitle}>{meal.title}</h2>
            <p className={styles.summary}>{meal.summary}</p>

            <div className={styles.meta}>
              <div className={styles.creator}>{meal.creator}</div>
              <div className={styles.actions}>
                <button className={styles.small}>View</button>
                <button className={styles.btn}>Favorite</button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function Meals() {
  const meals = await getAllMeals();
  console.log("meals:", meals);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Meals</h1>
        </div>
        <Suspense
          fallback={
            <h1 style={{ fontSize: "1rem", marginBottom: "24px" }}>
              Loading Meals...
            </h1>
          }
        >
          <MealsGrid />
        </Suspense>
      </main>
    </div>
  );
}
