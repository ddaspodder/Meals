"use client";
import { submitMeal } from "@/lib/actions";
import styles from "./page.module.css";
import { useActionState } from "react";

export default function MealsShare() {
  const [formState, formAction] = useActionState(submitMeal, {
    code: "",
    message: "",
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.heading}>Share your favourite meal</h1>
        {formState.message && (
          <p
            className={
              formState.code === 200
                ? styles.message + " " + styles.success
                : styles.message
            }
          >
            {formState.message}
          </p>
        )}
        <form className={styles.form} action={formAction}>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <input
            className={styles.input}
            id="title"
            type="text"
            name="title"
            required
          />

          <label className={styles.label} htmlFor="image">
            Image
          </label>
          <input
            className={styles.inputFile}
            id="image"
            type="file"
            name="image"
            required
            accept="image/jpeg, image/png"
          />

          <label className={styles.label} htmlFor="summary">
            Summary
          </label>
          <textarea
            className={styles.textarea}
            id="summary"
            name="summary"
            rows="3"
            required
          />

          <label className={styles.label} htmlFor="instructions">
            Instructions
          </label>
          <textarea
            className={styles.textarea}
            id="instructions"
            name="instructions"
            rows="5"
            required
          />

          <label className={styles.label} htmlFor="creator">
            Your Name
          </label>
          <input
            className={styles.input}
            id="creator"
            type="text"
            name="creator"
            required
          />

          <label className={styles.label} htmlFor="creatorEmail">
            Your Email
          </label>
          <input
            className={styles.input}
            id="creatorEmail"
            type="email"
            name="creatorEmail"
            required
          />

          <div className={styles.actions}>
            <button className={styles.button} type="submit">
              Share Meal
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
