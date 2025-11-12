import styles from "./page.module.css";
import Link from "next/link";
import { samplePosts } from "./samplePosts";

export default function CommunityPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Community</h1>
          <p className={styles.heroDesc}>
            Share recipes, tips, and food adventures with fellow enthusiasts.
            Browse recent posts from the community or start your own.
          </p>
        </section>

        <section className={styles.postList}>
          {samplePosts.map((post) => (
            <article key={post.id} className={styles.post}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <div className={styles.postMeta}>
                {post.author} · {post.date}
              </div>
              <p className={styles.postText}>{post.body}</p>
              <Link href={`/community/${post.id}`} className={styles.readMore}>
                Read more
              </Link>
            </article>
          ))}
        </section>

        <div className={styles.joinBox}>
          <h3>Want to share your recipe?</h3>
          <p className={styles.heroDesc}>
            Join the community to post recipes, ask questions, and get feedback
            from other food lovers.
          </p>
          <Link href="/community/new" className={styles.joinButton}>
            Start a Post
          </Link>
        </div>
      </main>
    </div>
  );
}
