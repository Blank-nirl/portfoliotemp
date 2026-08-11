import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Feather, Github, Instagram, Linkedin, Mail } from "lucide-react";
import type { MouseEvent } from "react";
import { Link } from "react-router";
import { ChapterHeading } from "@/components/portfolio/ChapterHeading";
import { FadeIn } from "@/components/portfolio/FadeIn";
import { Ornament, Folio } from "@/components/portfolio/Ornament";
import { PenWriting } from "@/components/portfolio/PenWriting";
import { ProjectScroll } from "@/components/portfolio/ProjectScroll";
import { QuillCursor } from "@/components/portfolio/QuillCursor";
import { SkillMarquee } from "@/components/portfolio/SkillMarquee";
import { ABOUT_LINES, BRAND, CONTACT_LINKS, PROFILE } from "@/lib/portfolio-data";

/* ── Hero: the book's cover ─────────────────────────────── */

function Hero() {
  // subtle parallax on mouse move
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const x = useTransform(sx, (v) => v * 10);
  const y = useTransform(sy, (v) => v * 10);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24"
      onMouseMove={onMouseMove}
    >
      {/* soft ink washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-oxblood/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-16 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
      />

      <motion.div
        style={{ x, y }}
        className="relative w-full max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* book cover frame */}
        <div className="relative rounded-sm border border-ink/40 p-2">
          {/* playful sticker */}
          <div
            aria-hidden
            className="absolute -right-4 -top-4 rotate-6 rounded-sm bg-coral px-3 py-1 font-hand text-lg text-paper shadow-md"
          >
            hello there!
          </div>
          <div className="relative rounded-sm border border-ink/20 px-6 py-14 text-center sm:px-12 sm:py-16">
            {/* corner ornaments */}
            <CornerFlourish className="left-3 top-3" />
            <CornerFlourish className="right-3 top-3 rotate-90" />
            <CornerFlourish className="bottom-3 left-3 -rotate-90" />
            <CornerFlourish className="bottom-3 right-3 rotate-180" />

            <p className="text-xs font-medium uppercase tracking-[0.45em] text-ink-soft">
              The Portfolio of
            </p>

            <div className="mt-6 flex items-center justify-center gap-3 text-gold">
              <span className="h-px w-12 bg-ink/30" aria-hidden />
              <Feather className="h-4 w-4" aria-hidden />
              <span className="h-px w-12 bg-ink/30" aria-hidden />
            </div>

            <h1 className="mt-6 font-display text-6xl font-semibold leading-none text-ink sm:text-8xl">
              {PROFILE.name}
            </h1>

            <p className="mt-5 font-hand text-3xl text-oxblood sm:text-4xl">
              {PROFILE.role}
            </p>

            <p className="mt-4 font-body text-lg italic text-ink-soft">
              {PROFILE.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full border border-ink/25 px-4 py-1.5 text-sm text-ink">
                Full-stack craft
              </span>
              <span className="rounded-full border border-ink/25 px-4 py-1.5 text-sm text-ink">
                Clean code
              </span>
              <span className="rounded-full border border-moss/60 bg-moss/10 px-4 py-1.5 text-sm text-moss">
                Ink &amp; code
              </span>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#works"
                data-cursor
                className="group inline-flex items-center gap-2 rounded-full bg-oxblood px-7 py-3 font-display text-lg italic text-paper shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral hover:shadow-lg"
              >
                Browse the works
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#correspondence"
                data-cursor
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink/30 px-7 py-3 font-display text-lg italic text-ink transition-colors duration-300 hover:border-ink hover:text-oxblood"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        data-cursor
        className="absolute bottom-8 flex flex-col items-center gap-2 text-ink-soft transition-colors hover:text-oxblood"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        aria-label="Scroll to begin reading"
      >
        <span className="font-hand text-xl">begin reading</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}

function CornerFlourish({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute text-gold ${className ?? ""}`}
      style={{
        borderTop: "1.5px solid rgba(168,134,61,0.9)",
        borderLeft: "1.5px solid rgba(168,134,61,0.9)",
        width: "22px",
        height: "22px",
      }}
    />
  );
}

/* ── Top-left brand, top-right contact bookplate ─────────── */

function BrandMark() {
  return (
    <motion.div
      className="fixed left-4 top-4 z-50"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <Link
        to="/"
        data-cursor
        className="flex items-center gap-2 font-display text-xl italic text-ink transition-colors hover:text-oxblood"
        aria-label={`${BRAND} home`}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/30 font-hand text-base not-italic text-oxblood">
          {PROFILE.monogram}
        </span>
        <span>{BRAND}</span>
      </Link>
    </motion.div>
  );
}

const CORNER_ICONS = [Mail, Github, Linkedin] as const;

function ContactCorner() {
  const links = CONTACT_LINKS.slice(0, 3);
  return (
    <motion.div
      className="fixed right-4 top-4 z-50 flex items-center gap-1 rounded-full border border-ink/25 bg-paper/90 px-2 py-1.5 shadow-sm backdrop-blur-sm"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      {links.map((link, i) => {
        const Icon = CORNER_ICONS[i];
        const isExternal = link.href && link.href !== "#" && !("disabled" in link && link.disabled);
        return (
          <a
            key={link.label}
            href={isExternal ? link.href : "#"}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            onClick={isExternal ? undefined : (e) => e.preventDefault()}
            data-cursor
            title={link.handle}
            aria-label={`${link.label}: ${link.handle}`}
            className="group flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-300 hover:bg-oxblood hover:text-paper"
          >
            <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          </a>
        );
      })}
    </motion.div>
  );
}

/* ── Chapter I · About ───────────────────────────────────── */

function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <ChapterHeading
          chapter="Chapter I"
          title="About the Author"
          subtitle="a short introduction, written in ink"
        />

        <FadeIn delay={0.15}>
          {/* ruled paper block */}
          <div className="relative rounded-sm border border-ink/15 bg-paper-2/60 p-6 sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-sm opacity-60"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0, transparent 47px, rgba(38,35,29,0.07) 47px, rgba(38,35,29,0.07) 48px)",
              }}
            />
            <PenWriting lines={ABOUT_LINES} className="relative" />
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-10">
          <div className="grid gap-6 text-center sm:grid-cols-3">
            {[
              { n: "MERN", d: "React · Node · Mongo" },
              { n: "Python", d: "automation & data" },
              { n: "Docker + Linux", d: "ship anywhere" },
            ].map((item, i) => (
              <div
                key={item.n}
                className={`rounded-sm border px-4 py-6 ${
                  i === 2
                    ? "border-moss/40 bg-moss/10"
                    : "border-ink/15 bg-paper"
                }`}
              >
                <p
                  className={`font-display text-2xl font-semibold ${
                    i === 2 ? "text-moss" : "text-oxblood"
                  }`}
                >
                  {item.n}
                </p>
                <p className="mt-1 font-body italic text-ink-soft">{item.d}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <Folio label="i" />
      </div>
    </section>
  );
}

/* ── Chapter II · The Works ──────────────────────────────── */

function WorksSection() {
  return (
    <section id="works" className="relative scroll-mt-24 bg-paper-2/50 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <ChapterHeading
          chapter="Chapter II"
          title="The Works"
          subtitle="an ancient scroll of projects — turn the page"
        />

        <FadeIn delay={0.15}>
          <ProjectScroll />
        </FadeIn>

        <Folio label="ii" />
      </div>
    </section>
  );
}

/* ── Chapter III · The Toolbox ───────────────────────────── */

function ToolboxSection() {
  return (
    <section id="toolbox" className="relative scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <ChapterHeading
          chapter="Chapter III"
          title="The Toolbox"
          subtitle="the instruments I reach for, day after day"
        />

        <FadeIn delay={0.15} className="space-y-6">
          <SkillMarquee duration={40} />
          <SkillMarquee duration={55} reverse />
        </FadeIn>

        <Folio label="iii" />
      </div>
    </section>
  );
}

/* ── Chapter IV · Correspondence ─────────────────────────── */

const SECTION_ICONS = [Mail, Github, Linkedin, Instagram] as const;

function CorrespondenceSection() {
  return (
    <section
      id="correspondence"
      className="relative scroll-mt-24 bg-paper-2/50 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <ChapterHeading
          chapter="Chapter IV"
          title="Correspondence"
          subtitle="postscripts & pleasantries gladly received"
        />

        <FadeIn delay={0.15}>
          <p className="mx-auto max-w-xl text-center font-hand text-3xl leading-snug text-ink sm:text-4xl">
            Want to know more about me?
            <br />
            <span className="text-oxblood">Let&apos;s connect.</span>
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {CONTACT_LINKS.map((link, i) => {
            const Icon = SECTION_ICONS[i];
            const isExternal = link.href && link.href !== "#" && !("disabled" in link && link.disabled);
            return (
              <FadeIn key={link.label} delay={0.1 + i * 0.08}>
                <a
                  href={isExternal ? link.href : "#"}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  onClick={isExternal ? undefined : (e) => e.preventDefault()}
                  data-cursor
                  className={`group flex items-center gap-5 rounded-sm border border-ink/20 bg-paper p-5 transition-all duration-300 ${
                    isExternal
                      ? "hover:-translate-y-1 hover:border-oxblood/50 hover:shadow-[0_12px_30px_-12px_rgba(122,59,46,0.35)]"
                      : "opacity-80"
                  }`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/20 text-oxblood transition-colors duration-300 group-hover:border-oxblood group-hover:bg-oxblood group-hover:text-paper">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-hand text-2xl text-ink">
                      {link.label}
                    </span>
                    <span className="block truncate font-body text-sm italic text-ink-soft">
                      {link.handle}
                    </span>
                  </span>
                  <span className="ml-auto font-display text-xl italic text-ink-soft transition-transform duration-300 group-hover:translate-x-1 group-hover:text-oxblood">
                    {isExternal ? "✒" : "⏳"}
                  </span>
                </a>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.4} className="mt-14 text-center">
          <a
            href={`mailto:${PROFILE.email}?subject=Hello%20Yash`}
            data-cursor
            className="inline-flex items-center gap-3 rounded-full border-2 border-oxblood px-8 py-3.5 font-display text-lg italic text-oxblood transition-colors duration-300 hover:bg-oxblood hover:text-paper"
          >
            <Feather className="h-5 w-5" />
            write me a letter
          </a>
          <p className="mt-4 font-hand text-xl text-ink-soft">
            replies within a day or two — usually sooner
          </p>
        </FadeIn>



        <Folio label="iv" />
      </div>
    </section>
  );
}

/* ── Colophon / footer ───────────────────────────────────── */

function Colophon() {
  return (
    <footer className="px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <Ornament />
        <p className="mt-8 font-display text-3xl italic text-ink sm:text-4xl">
          Finis
        </p>
        <p className="mt-4 font-body italic text-ink-soft">
          {BRAND} — set in Cormorant Garamond, EB Garamond &amp; Caveat.
          <br />
          Inked on paper — printed on pixels.
        </p>
        <p className="mt-8 text-sm tracking-[0.3em] text-ink-soft">
          © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.role}
        </p>
      </div>
    </footer>
  );
}

/* ── Landing page ────────────────────────────────────────── */

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-paper text-ink">
      {/* paper grain overlay */}
      <div
        aria-hidden
        className="paper-noise pointer-events-none fixed inset-0 z-40 opacity-[0.09] mix-blend-multiply"
      />
      <QuillCursor />
      <BrandMark />
      <ContactCorner />
      <main>
        <Hero />
        <AboutSection />
        <WorksSection />
        <ToolboxSection />
        <CorrespondenceSection />
      </main>
      <Colophon />
    </div>
  );
}
