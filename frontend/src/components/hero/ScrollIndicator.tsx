import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 2,
        duration: 1,
      }}
      className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
    >
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-2"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-slate-400">
          Scroll
        </p>

        <div className="flex h-12 w-7 justify-center rounded-full border border-white/20">
          <motion.div
            animate={{
              y: [4, 22, 4],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            className="mt-2 h-2 w-2 rounded-full bg-violet-400"
          />
        </div>

        <ChevronDown className="h-5 w-5 text-violet-400" />
      </motion.div>
    </motion.div>
  );
}