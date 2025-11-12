"use client";
export default function Error({ error }) {
  return (
    <div style={{ padding: "48px 24px", minHeight: "calc(100vh - 80px)" }}>
      <main style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "24px" }}>
          Oops! Something went wrong.
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--muted)" }}>
          We encountered an error while loading the meals. Please try again
          later.
        </p>
      </main>
    </div>
  );
}
