export default function Loading() {
  return (
    <div style={{ padding: "48px 24px", minHeight: "calc(100vh - 80px)" }}>
      <main style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "24px" }}>
          Loading Meals...
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--muted)" }}>
          Please wait while we fetch your delicious meals.
        </p>
      </main>
    </div>
  );
}
