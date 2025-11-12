import styles from "../../page.module.css";

export default async function Meal({ params }) {
  // await params to safely access slug when params may be a Promise
  const { slug } = await params;

  return (
    <div className={styles.page}>
      <main>
        <h1>Meal: {slug}</h1>
      </main>
    </div>
  );
}
