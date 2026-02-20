export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="rounded-[var(--radius-card)] border border-border bg-card p-8 text-center">
        <h1 className="font-sans text-2xl font-bold text-text">IdeaForge</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Prompt builder for AI Business Research System
        </p>
        <p className="mt-4 font-mono text-xs text-text-muted">v0.1.0</p>
      </div>
    </div>
  );
}
