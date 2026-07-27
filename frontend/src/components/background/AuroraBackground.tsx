import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";
import MouseGlow from "./MouseGlow";

export default function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <MouseGlow />

      {/* Base */}
      <div className="absolute inset-0 bg-[#050816]" />

      {/* Aurora */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.20),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(6,182,212,0.18),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.15),transparent_40%)]" />

      {/* Purple */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl"
      />

      {/* Cyan */}
      <motion.div
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 40, -60, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-250px] left-[-150px] h-[650px] w-[650px] rounded-full bg-cyan-500/20 blur-3xl"
      />

      {/* Pink */}
      <motion.div
        animate={{
          x: [0, 90, -70, 0],
          y: [0, 50, -20, 0],
          rotate: [0, 20, -20, 0],
          scale: [1, 1.1, 1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-180px] top-[10%] h-[550px] w-[550px] rounded-full bg-fuchsia-500/20 blur-3xl"
      />

      {/* Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <FloatingParticles />

      {/* Fade Bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050816]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(5,8,22,0.85)_100%)]" />
    </div>
  );
}