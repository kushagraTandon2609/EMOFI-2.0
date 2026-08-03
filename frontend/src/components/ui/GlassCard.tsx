import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        transition: {
          duration: 0.25,
        },
      }}
      className={`
        relative
        overflow-hidden
        rounded-xl
        border
        border-slate-800
        bg-[#0B1220]/80
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-violet-500/40
        hover:shadow-[0_0_40px_rgba(139,92,246,.12)]
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 opacity-0 transition-opacity duration-300 hover:opacity-100" />

      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
}