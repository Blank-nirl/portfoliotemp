import { FadeIn } from "./FadeIn";

/** Decorative flourish used between sections — a printer's flower. */
export function Ornament() {
  return (
    <div className="flex items-center justify-center gap-4 text-gold" aria-hidden>
      <span className="h-px w-16 bg-ink/25" />
      <span className="text-xl leading-none">❦</span>
      <span className="h-px w-16 bg-ink/25" />
    </div>
  );
}

/** Small book-page folio number, centred at the foot of each chapter. */
export function Folio({ label }: { label: string }) {
  return (
    <p className="mt-16 text-center font-display text-sm italic tracking-[0.25em] text-ink-soft">
      — {label} —
    </p>
  );
}
