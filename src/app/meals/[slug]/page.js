import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { getMealBySlug } from "../../../db/meals";
import Image from "next/image";

export default async function MealDetails({ params }) {
  // await params to safely access slug when params may be a Promise
  const { slug } = await params;

  const meal = await getMealBySlug(slug);
  if (!meal) {
    return notFound();
  }

  const createdAt = meal.createdAt ? new Date(meal.createdAt) : null;
  const formattedDate = createdAt
    ? createdAt.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <a className={styles.back} href="/meals">
          ← Back to meals
        </a>

        <div className={styles.header}>
          <div className={styles.imageWrap} width={800} height={520}>
            <Image
              src={meal.image}
              alt={meal.title}
              className={styles.image}
              fill
            />
          </div>

          <div className={styles.info}>
            <h1 className={styles.title}>{meal.title}</h1>
            <p className={styles.summary}>{meal.summary}</p>

            <div className={styles.meta}>
              <div>
                <div className={styles.creator}>By {meal.creator}</div>
                {formattedDate && (
                  <div className={styles.date}>{formattedDate}</div>
                )}
              </div>
              <div className={styles.email}>{meal.creatorEmail}</div>
            </div>
          </div>
        </div>

        <section className={styles.instructions}>
          <h2>Instructions</h2>
          <p
            dangerouslySetInnerHTML={{ __html: meal.instructions }}
            className={styles.instructionsText}
          ></p>
        </section>
      </main>
    </div>
  );
}
