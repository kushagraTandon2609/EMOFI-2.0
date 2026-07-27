import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatsCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function StatsCounter({
  value,
  suffix = "",
  label,
  duration = 2,
}: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
        {count}
        {suffix}
      </h2>

      <p className="mt-2 text-sm text-slate-400 transition-colors group-hover:text-white">
        {label}
      </p>
    </motion.div>
  );
}