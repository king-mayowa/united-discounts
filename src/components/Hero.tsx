interface HeroProps {
  totalCount: number;
  dropsCount: number;
  biggestDrop: number;
}

export function Hero({ totalCount, dropsCount, biggestDrop }: HeroProps) {
  return (
    <section className="border-b border-border bg-bg-secondary py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
          London Rental Drops
        </div>
        <h2 className="mb-8 font-heading text-[clamp(36px,5vw,72px)] leading-none text-text-primary">
          FIND THE BIGGEST
          <br />
          <span className="text-gold">RENTAL PRICE DROPS</span>
        </h2>

        <div className="flex flex-wrap gap-4">
          <StatBox label="Listings" value={totalCount.toString()} />
          <StatBox label="Price Drops" value={dropsCount.toString()} />
          <StatBox
            label="Biggest Drop"
            value={biggestDrop > 0 ? `${biggestDrop.toFixed(1)}%` : "—"}
            highlight
          />
        </div>
      </div>
    </section>
  );
}

function StatBox({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-5 py-3 ${
        highlight
          ? "border-gold/40 bg-gold/5"
          : "border-border bg-bg-card"
      }`}
    >
      <div
        className={`font-heading text-3xl ${
          highlight ? "text-gold" : "text-text-primary"
        }`}
      >
        {value}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
        {label}
      </div>
    </div>
  );
}
