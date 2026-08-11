import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface PenWritingProps {
  lines: string[];
  className?: string;
  speed?: number;
  startDelay?: number;
}

/**
 * Types a letter out line by line, like ink flowing from a pen.
 * Starts when the block scrolls into view; each line completes before
 * the next begins. Ends with a blinking caret.
 */
export function PenWriting({
  lines,
  className,
  speed = 22,
  startDelay = 300,
}: PenWritingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const [started, setStarted] = useState(false);
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);
  const done = line >= lines.length;

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setStarted(true), startDelay);
      return () => clearTimeout(t);
    }
  }, [inView, startDelay]);

  useEffect(() => {
    if (!started || line >= lines.length) return;
    const current = lines[line];

    if (char >= current.length) {
      const t = setTimeout(() => {
        setLine((l) => l + 1);
        setChar(0);
      }, 380);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setChar((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [started, line, char, lines, speed]);

  return (
    <div ref={ref} className={className}>
      {lines.map((text, i) => {
        const complete = i < line;
        const active = i === line;
        const shown = active ? text.slice(0, char) : text;
        return (
          <p
            key={i}
            className={`font-hand text-[1.55rem] leading-[1.55] text-ink sm:text-3xl ${
              active || complete ? "" : "opacity-0"
            } mb-6`}
            style={{ textWrap: "balance" }}
          >
            {shown}
            {active && (
              <span className="ink-caret ml-1 inline-block h-[1.15em] w-[3px] translate-y-[0.18em] rounded-full bg-oxblood" />
            )}
            {complete && <span className="text-oxblood">…</span>}
          </p>
        );
      })}
      {done && (
        <p className="mt-8 text-right font-hand text-3xl text-oxblood sm:text-4xl">
          — Yash
        </p>
      )}
    </div>
  );
}
