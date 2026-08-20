export function CapacitiLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy-foreground/10 ring-1 ring-navy-foreground/25">
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
          <path
            d="M12 2 3 7v6c0 5 3.8 8.2 9 9 5.2-.8 9-4 9-9V7l-9-5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="text-navy-foreground"
          />
          <path
            d="M8 12.5l2.7 2.7L16.5 9.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-gold"
          />
        </svg>
      </div>
      <div className="leading-tight">
        <p className="font-display text-base font-bold tracking-tight text-navy-foreground">
          CAPACITI <span className="text-gold">WorkSmart AI</span>
        </p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-navy-foreground/65">
          Unlock your potential
        </p>
      </div>
    </div>
  );
}
