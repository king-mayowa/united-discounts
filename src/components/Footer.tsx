export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-primary py-8">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg text-gold">
              UNITED DISCOUNTS
            </span>
            <span className="text-xs text-text-muted">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
          <div className="text-xs text-text-muted">
            Tracking London rental price drops
          </div>
        </div>
      </div>
    </footer>
  );
}
