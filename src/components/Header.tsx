"use client";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <h1 className="font-heading text-2xl tracking-wide text-gold">
            UNITED DISCOUNTS
          </h1>
          <div className="hidden items-center gap-1 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-positive)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-positive)]" />
            </span>
            <span className="text-[11px] uppercase tracking-wider text-text-muted">
              Live
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <span className="rounded-full bg-bg-elevated px-3 py-1 text-xs text-text-muted">
            London
          </span>
          <span className="text-xs text-text-muted">
            Rent
          </span>
        </nav>
      </div>
    </header>
  );
}
