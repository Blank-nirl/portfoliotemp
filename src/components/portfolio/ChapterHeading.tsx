import { FadeIn } from "./FadeIn";

interface ChapterHeadingProps {
  chapter: string;
  title: string;
  subtitle?: string;
}

/** Book-style chapter heading: small caps chapter, display serif title, ornamented rule. */
export function ChapterHeading({ chapter, title, subtitle }: ChapterHeadingProps) {
  return (
    <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-oxblood">
        {chapter}
      </p>
      <h2 className="mt-4 font-display text-4xl font-medium text-ink sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-body text-lg italic text-ink-soft">{subtitle}</p>
      )}
      <div className="mt-6 flex items-center justify-center gap-3 text-gold">
        <span className="h-px w-14 bg-ink/30" aria-hidden />
        <span aria-hidden>❦</span>
        <span className="h-px w-14 bg-ink/30" aria-hidden />
      </div>
    </FadeIn>
  );
}
