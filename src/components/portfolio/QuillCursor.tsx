import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Animated quill-pen cursor.
 * A small ink dot tracks the pointer exactly; a feather nib trails behind,
 * tilting in the direction of movement. Only enabled on fine pointers
 * (mouse/trackpad) and hidden on touch devices.
 */
export function QuillCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Dot — fast, follows the pointer almost exactly
  const dotX = useSpring(x, { stiffness: 1400, damping: 60, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1400, damping: 60, mass: 0.2 });

  // Nib — slower, trails behind
  const nibX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.7 });
  const nibY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.7 });

  // Tilt the nib in the direction of travel
  const vx = useVelocity(x);
  const vy = useVelocity(y);
  const rotateRaw = useTransform(() => {
    const a = Math.atan2(vy.get(), vx.get());
    return (a * 180) / Math.PI + 90;
  });
  const rotate = useSpring(rotateRaw, { stiffness: 120, damping: 22, mass: 0.6 });

  const scale = useSpring(hovering ? 1.25 : pressed ? 0.85 : 1, {
    stiffness: 260,
    damping: 20,
  });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("pen-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest("a, button, [role='button'], [data-cursor]"),
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);

    return () => {
      document.documentElement.classList.remove("pen-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      {/* Ink dot at the exact pointer */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{ opacity: visible ? 1 : 0 }}
          className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/90 mix-blend-multiply"
        />
      </motion.div>

      {/* Trailing quill nib */}
      <motion.div
        style={{ x: nibX, y: nibY, rotate }}
        className="absolute left-0 top-0"
      >
        <motion.div
          style={{ scale }}
          animate={{ opacity: visible ? 1 : 0 }}
          className="-translate-x-1/2 -translate-y-1/2"
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            className="drop-shadow-sm"
          >
            {/* feather */}
            <path
              d="M9 26C13 24 17 20 20 16C23 12 24.5 8.5 24 6C23.5 3.5 25 2 25 2C25 2 26.5 3.5 26 6C25.5 8.5 24 11.5 21 14C18 16.5 14.5 19.5 11.5 23L9 26Z"
              fill="#7a3b2e"
            />
            <path
              d="M13 23C15.5 20.5 18 17.5 20.5 15"
              stroke="#f0eee6"
              strokeWidth="0.9"
              opacity="0.7"
            />
            {/* shaft */}
            <path
              d="M9.5 26.5L14 18.5"
              stroke="#26231d"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
