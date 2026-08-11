import type { CSSProperties } from "react";
import { SKILLS } from "@/lib/portfolio-data";

interface SkillMarqueeProps {
  reverse?: boolean;
  duration?: number;
}

/** Infinite left-to-right marquee of skill icons (devicon CDN). */
export function SkillMarquee({ reverse = false, duration = 45 }: SkillMarqueeProps) {
  const items = reverse ? [...SKILLS].reverse() : SKILLS;
  const row = [...items, ...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="marquee-track flex w-max items-center gap-10"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        {row.map((skill, i) => (
          <span
            key={`${skill.name}-${i}`}
            data-cursor
            className="group flex items-center gap-3 whitespace-nowrap"
          >
            <img
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.slug}/${skill.slug}-original.svg`}
              alt={`${skill.name} icon`}
              loading="lazy"
              width={30}
              height={30}
              className="h-8 w-8 opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="font-display text-xl italic text-ink/80 transition-colors group-hover:text-ink">
              {skill.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
