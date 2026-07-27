import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export default function AIOrb() {
  return (
    <div className="relative flex items-center justify-center h-[420px] w-[420px]">

      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[120px]"
      />

      {/* Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[360px] w-[360px] rounded-full border border-violet-500/20"
      />

      {/* Dashed Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[300px] w-[300px] rounded-full border-2 border-dashed border-cyan-400/30"
      />

      {/* Middle Ring */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.03, 1],
        }}
        transition={{
          rotate: {
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 4,
            repeat: Infinity,
          },
        }}
        className="absolute h-[240px] w-[240px] rounded-full border border-fuchsia-400/40"
      />

      {/* Glass Core */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="relative flex h-[180px] w-[180px] items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_0_80px_rgba(139,92,246,.4)]"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute h-[130px] w-[130px] rounded-full bg-gradient-to-br from-violet-500/40 via-fuchsia-500/30 to-cyan-500/40 blur-xl"
        />

        <BrainCircuit
          className="relative z-10 h-20 w-20 text-violet-300"
          strokeWidth={1.8}
        />
      </motion.div>

      {/* Orbit Dot 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[360px] w-[360px]"
      >
        <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_25px_#06b6d4]" />
      </motion.div>

      {/* Orbit Dot 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[300px] w-[300px]"
      >
        <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_25px_#ec4899]" />
      </motion.div>

      {/* Orbit Dot 3 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[240px] w-[240px]"
      >
        <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-violet-400 shadow-[0_0_20px_#8b5cf6]" />
      </motion.div>
    </div>
  );
}