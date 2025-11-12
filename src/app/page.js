import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Welcome to Best Food Ever</h1>
          <p className={styles.heroText}>
            Discover a world of culinary delights, where every dish tells a
            story and every bite is an adventure. Join our community of food
            lovers!
          </p>
        </section>

        <section className={styles.featuredSection}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌟</div>
            <h2 className={styles.cardTitle}>Featured Meals</h2>
            <p className={styles.cardText}>
              Explore our handpicked selection of mouthwatering dishes from top
              chefs around the world.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>👨‍🍳</div>
            <h2 className={styles.cardTitle}>Expert Chefs</h2>
            <p className={styles.cardText}>
              Learn from professional chefs who share their secrets and
              signature recipes with our community.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>🤝</div>
            <h2 className={styles.cardTitle}>Join Community</h2>
            <p className={styles.cardText}>
              Connect with fellow food enthusiasts, share recipes, and
              participate in exciting culinary discussions.
            </p>
          </div>
        </section>

        <div className={styles.cta}>
          <a href="/meals" className={styles.ctaButton}>
            Explore Our Meals
          </a>
        </div>
      </main>
    </div>
  );
}
