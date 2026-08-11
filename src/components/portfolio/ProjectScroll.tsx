import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { PROJECTS, roman } from "@/lib/portfolio-data";

const FACE_CLASSES =
  "backface-hidden absolute inset-0 flex flex-col justify-between p-6 sm:p-8";

function ProjectBody({
  project,
  folio,
  total,
}: {
  project: (typeof PROJECTS)[number];
  folio: number;
  total: number;
}) {
  return (
    <div className={FACE_CLASSES}>
      {/* top rule */}
      <div className="flex items-center justify-between border-b border-ink/25 pb-3">
        <span className="font-display text-lg italic text-oxblood">
          Folio {roman(folio)}
        </span>
        <span className="text-xs uppercase tracking-[0.3em] text-ink-soft">
          of {roman(total)}
        </span>
      </div>

      <div className="my-4 flex-1 overflow-hidden">
        <h3 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-1 font-hand text-xl text-oxblood sm:text-2xl">
          {project.tagline}
        </p>
        <p className="mt-4 font-body text-[1.05rem] leading-relaxed text-ink/85 sm:text-lg">
          {project.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-ink/25 bg-paper/40 px-3 py-1 font-body text-sm italic text-ink"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-ink/25 pt-3">
          <span className="font-hand text-lg text-ink-soft">the works ·</span>
          <span className="flex items-center gap-1.5 text-sm tracking-wide text-oxblood">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              data-cursor
              className="border-b border-oxblood/40 pb-0.5 transition-colors hover:border-oxblood"
            >
              view the code
            </a>
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

function ScrollRod({ className }: { className?: string }) {
  return (
    <div className={`wood-rod relative h-5 rounded-full sm:h-6 ${className ?? ""}`}>
      {/* knobs */}
      <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#3c2a12] shadow-[inset_0_1px_2px_rgba(255,240,200,0.4)]" />
      <span className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#3c2a12] shadow-[inset_0_1px_2px_rgba(255,240,200,0.4)]" />
    </div>
  );
}

/** Ancient scroll of works — click to turn the page and reveal the next project. */
export function ProjectScroll() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [instant, setInstant] = useState(false);
  const direction = useRef<1 | -1>(1);

  const total = PROJECTS.length;
  const current = PROJECTS[index];
  const peek = PROJECTS[(index + direction.current + total) % total];

  const turn = (dir: 1 | -1) => {
    if (flipped) return;
    direction.current = dir;
    setFlipped(true);
  };

  const handleComplete = () => {
    if (!flipped) {
      if (instant) setInstant(false);
      return;
    }
    setIndex((i) => (i + direction.current + total) % total);
    setInstant(true);
    setFlipped(false);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative" style={{ perspective: 2200 }}>
        <ScrollRod className="relative z-20 mx-auto -mb-2.5 w-[88%]" />
        <div className="relative z-10" data-cursor>
          <motion.div
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: flipped ? -direction.current * 180 : 0 }}
            transition={{
              duration: instant ? 0 : 1.15,
              ease: [0.6, 0.05, 0.2, 0.95],
            }}
            onAnimationComplete={handleComplete}
            className="relative min-h-[24rem] cursor-pointer sm:min-h-[21rem]"
            onClick={() => turn(1)}
            role="button"
            tabIndex={0}
            aria-label="Turn to the next project"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                turn(1);
              }
            }}
          >
            {/* Front face */}
            <div
              className="parchment-surface backface-hidden absolute inset-0 rounded-b-md shadow-[0_10px_30px_-10px_rgba(80,60,25,0.5),inset_0_0_50px_rgba(90,70,30,0.35)]"
              style={{ WebkitBackfaceVisibility: "hidden" }}
            >
              <ProjectBody project={current} folio={index + 1} total={total} />
            </div>

            {/* Back face (peek at next project) */}
            <div
              className="parchment-surface backface-hidden absolute inset-0 rounded-b-md shadow-[0_10px_30px_-10px_rgba(80,60,25,0.5),inset_0_0_50px_rgba(90,70,30,0.35)]"
              style={{
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <ProjectBody
                project={peek}
                folio={((index + direction.current + total) % total) + 1}
                total={total}
              />
            </div>
          </motion.div>
        </div>
        <ScrollRod className="relative z-20 mx-auto -mt-2.5 w-[88%]" />
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          data-cursor
          onClick={() => turn(-1)}
          className="group flex items-center gap-2 font-display text-lg italic text-ink-soft transition-colors hover:text-oxblood"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          previous
        </button>

        <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-ink-soft">
          {PROJECTS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? "bg-oxblood" : "bg-ink/20"
              }`}
            />
          ))}
        </span>

        <button
          type="button"
          data-cursor
          onClick={() => turn(1)}
          className="group flex items-center gap-2 font-display text-lg italic text-ink-soft transition-colors hover:text-oxblood"
        >
          next
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <p className="mt-6 text-center font-hand text-lg text-ink-soft">
        ~ tap the scroll to turn the page ~
      </p>
    </div>
  );
}
