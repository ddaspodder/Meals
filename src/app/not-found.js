export default function NotFound() {
  return (
    <div style={{ padding: "48px 24px", minHeight: "calc(100vh - 80px)" }}>
      <main style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "24px" }}>
          404 - Page Not Found
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--muted)" }}>
          The page you are looking for does not exist.
        </p>
      </main>
    </div>
  );
}
