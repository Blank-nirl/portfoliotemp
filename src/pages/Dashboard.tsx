import { motion } from "framer-motion";
import { ArrowRight, Feather, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { CONTACT_LINKS, PROFILE } from "@/lib/portfolio-data";

// Sample client engagement data — replace with real project data.
const CLIENT_PROJECTS = [
  {
    title: "TaskFlow",
    tagline: "a realtime kanban board",
    progress: 70,
    status: "In progress",
    note: "Live columns, drag-and-drop cards, and the auth flow — landing next week.",
  },
  {
    title: "Ledgerly",
    tagline: "a personal finance ledger",
    progress: 100,
    status: "Shipped",
    note: "Delivered and deployed. Enjoy the quiet dashboards.",
  },
  {
    title: "DevDeck",
    tagline: "a developer link-in-bio",
    progress: 25,
    status: "In review",
    note: "First paper theme drafted — awaiting your thoughts.",
  },
];

const MILESTONES = [
  { title: "Kickoff & discovery", done: true },
  { title: "First draft live", done: true },
  { title: "Review & polish", done: false, current: true },
  { title: "Launch & handover", done: false },
];

const STATUS_STYLE: Record<string, string> = {
  "In progress": "bg-coral text-paper",
  "In review": "bg-gold text-paper",
  Shipped: "bg-moss text-paper",
};

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const firstName =
    user?.name?.split(" ")[0] ??
    user?.email?.split("@")[0] ??
    "friend";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-paper text-ink">
      <div
        aria-hidden
        className="paper-noise pointer-events-none fixed inset-0 z-40 opacity-[0.09] mix-blend-multiply"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-10 sm:py-14">
        {/* header */}
        <header className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-2xl italic text-ink transition-colors hover:text-oxblood"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/30 font-hand text-base not-italic text-oxblood">
              {PROFILE.monogram}
            </span>
            Yashfolio
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="group flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2 font-body text-sm italic text-ink-soft transition-colors hover:border-oxblood hover:text-oxblood"
          >
            <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            Sign out
          </button>
        </header>

        {/* welcome */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-oxblood">
            Chapter I · Your Client Area
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium text-ink sm:text-6xl">
            Welcome back,{" "}
            <span className="italic text-oxblood">{firstName}</span>
          </h1>
          <p className="mt-3 max-w-xl font-body text-lg italic text-ink-soft">
            Here&apos;s where your projects with {PROFILE.name} live — progress,
            milestones and notes, all in one quiet place.
          </p>
        </motion.div>

        {/* projects */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-3xl font-medium text-ink">
              Your projects
            </h2>
            <span className="h-px flex-1 bg-ink/20" aria-hidden />
            <span className="rounded-full bg-coral/15 px-3 py-1 font-hand text-lg text-coral">
              {CLIENT_PROJECTS.length} active
            </span>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {CLIENT_PROJECTS.map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col rounded-sm border border-ink/20 bg-paper p-6 shadow-[0_2px_12px_-6px_rgba(38,35,29,0.15)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    {project.title}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 font-body text-xs tracking-wide ${STATUS_STYLE[project.status] ?? "bg-ink/15 text-ink"}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="mt-1 font-hand text-lg text-oxblood">
                  {project.tagline}
                </p>
                <p className="mt-3 flex-1 font-body leading-relaxed text-ink/80">
                  {project.note}
                </p>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs tracking-wide text-ink-soft">
                    <span>progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
                    <motion.div
                      className={`h-full rounded-full ${
                        project.progress === 100 ? "bg-moss" : "bg-coral"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                  </div>
                </div>
              </motion.article>
            ))}

            {/* write-to card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col justify-between rounded-sm border-2 border-dashed border-moss/50 bg-moss/10 p-6"
            >
              <div>
                <p className="font-hand text-2xl text-moss">questions?</p>
                <p className="mt-2 font-body leading-relaxed text-ink/80">
                  A thought, a tweak, or a very large idea — this little letter
                  box goes straight to my desk.
                </p>
              </div>
              <a
                href={`mailto:${PROFILE.email}?subject=About%20my%20project`}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-moss px-5 py-2.5 font-display text-base italic text-paper transition-all duration-300 hover:-translate-y-0.5"
              >
                <Feather className="h-4 w-4" />
                Write to Yash
              </a>
            </motion.div>
          </div>
        </section>

        {/* milestones + contact */}
        <section className="mt-14 grid gap-5 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-sm border border-ink/20 bg-paper p-6"
          >
            <h2 className="font-display text-3xl font-medium text-ink">
              Milestones
            </h2>
            <ol className="mt-6 space-y-5">
              {MILESTONES.map((m) => (
                <li key={m.title} className="flex items-start gap-4">
                  <span
                    className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      m.done
                        ? "border-moss bg-moss"
                        : m.current
                          ? "border-coral bg-coral/20"
                          : "border-ink/25"
                    }`}
                    aria-hidden
                  >
                    {m.done && (
                      <svg viewBox="0 0 12 12" className="h-3 w-3">
                        <path
                          d="M2.5 6.5 5 9l4.5-6"
                          fill="none"
                          stroke="#f0eee6"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <div className="flex-1">
                    <p
                      className={`font-display text-lg ${
                        m.done || m.current ? "text-ink" : "text-ink-soft"
                      }`}
                    >
                      {m.title}
                    </p>
                    {m.current && (
                      <p className="font-hand text-base text-coral">
                        we are here — review round is open
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-sm border border-ink/20 bg-paper p-6"
          >
            <h2 className="font-display text-3xl font-medium text-ink">
              Keep in touch
            </h2>
            <p className="mt-3 font-body italic text-ink-soft">
              Elsewhere in the margins — follow along, or peek at what&apos;s
              brewing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2 font-body text-sm italic text-ink transition-colors hover:border-oxblood hover:text-oxblood"
                >
                  {link.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
            <div className="mt-8 border-t border-ink/15 pt-5">
              <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">
                your account
              </p>
              <p className="mt-2 font-body italic text-ink">{user?.email ?? "signed in"}</p>
            </div>
          </motion.div>
        </section>

        {/* folio */}
        <p className="mt-16 text-center font-display text-sm italic tracking-[0.25em] text-ink-soft">
          — i —
        </p>
      </div>
    </div>
  );
}
