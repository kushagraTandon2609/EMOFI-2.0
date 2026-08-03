import type { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

interface GradientButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function GradientButton({
  children,
  className = "",
  ...props
}: GradientButtonProps) {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-lg
        bg-gradient-to-r
        from-violet-600
        via-fuchsia-500
        to-cyan-500
        px-6
        py-3
        font-semibold
        text-white
        shadow-[0_12px_35px_rgba(139,92,246,.30)]
        transition-all
        duration-300
        hover:shadow-[0_18px_50px_rgba(139,92,246,.45)]
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}