import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Github,
  Music4,
  Play,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Button } from "../ui/button";

import AuroraBackground from "../background/AuroraBackground";
import AIOrb from "./AIOrb";
import StatsCounter from "./StatsCounter";
import ScrollIndicator from "./ScrollIndicator";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const floating = {
  animate: {
    y: [0, -14, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden text-white">

      <AuroraBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 pt-32 pb-20">

        <div className="grid w-full items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-white/10 px-5 py-2 backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4 text-violet-400" />

              <span className="text-sm font-medium tracking-wide">
                AI Powered Emotion Intelligence
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl font-black leading-[1.05] md:text-7xl"
            >
              Understand

              <br />

              Your

              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

                Emotions

              </span>

              with AI
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-lg text-lg leading-8 text-slate-300"
            >
              Experience next-generation facial emotion recognition,
              real-time analytics, intelligent mood tracking,
              and personalized AI music recommendations,
              all powered by cutting-edge deep learning.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="group rounded-2xl bg-violet-600 px-8 py-7 text-base shadow-[0_0_40px_rgba(139,92,246,.35)] transition-all hover:scale-105 hover:bg-violet-500"
              >
                Start Detecting

                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-2xl border-white/15 bg-white/5 px-8 py-7 text-white backdrop-blur-xl hover:bg-white/10"
              >
                <Github className="mr-2 h-5 w-5" />

                View GitHub
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-16 grid grid-cols-3 gap-8"
            >
              <StatsCounter
                value={95}
                suffix="%"
                label="Accuracy"
              />

              <StatsCounter
                value={50}
                suffix="K+"
                label="Predictions"
              />

              <StatsCounter
                value={24}
                suffix="/7"
                label="Availability"
              />
            </motion.div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: .8,
            }}
            className="relative flex h-[650px] items-center justify-center"
          >

            <motion.div
              {...floating}
              className="absolute h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[120px]"
            />

            <motion.div
              {...floating}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
              className="absolute h-[280px] w-[280px] rounded-full bg-cyan-500/20 blur-[100px]"
            />

            <AIOrb />

            