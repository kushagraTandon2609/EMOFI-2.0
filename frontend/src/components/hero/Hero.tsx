import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Globe,
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
                <Globe className="mr-2 h-5 w-5" />

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

                        {/* Emotion Card */}

            <motion.div
              {...floating}
              transition={{
                duration: 6,
                delay: 0.5,
                repeat: Infinity,
              }}
              className="absolute left-0 top-16 w-60 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20">
                  <BrainCircuit className="h-6 w-6 text-violet-400" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Current Emotion
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    Happy
                  </p>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{
                    duration: 2,
                    delay: 1,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                />
              </div>

              <p className="mt-3 text-sm text-slate-300">
                Confidence 92%
              </p>
            </motion.div>

            {/* Playlist Card */}

            <motion.div
              {...floating}
              transition={{
                duration: 6,
                delay: 1.2,
                repeat: Infinity,
              }}
              className="absolute bottom-14 right-0 w-64 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20">
                  <Music4 className="h-6 w-6 text-cyan-400" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    AI Playlist
                  </p>

                  <p className="font-bold">
                    Ready
                  </p>
                </div>
              </div>

              <Button
                className="mt-5 w-full rounded-xl bg-cyan-500 hover:bg-cyan-400"
              >
                <Play className="mr-2 h-4 w-4" />
                Play Now
              </Button>
            </motion.div>

            {/* Analytics Card */}

            <motion.div
              {...floating}
              transition={{
                duration: 7,
                delay: 2,
                repeat: Infinity,
              }}
              className="absolute -right-8 top-1/2 w-56 -translate-y-1/2 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-green-400" />

                <div>
                  <p className="text-sm text-slate-400">
                    Mood Trend
                  </p>

                  <p className="font-bold text-green-400">
                    +18%
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-end gap-2">
                {[40, 65, 55, 80, 70, 95].map((height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15,
                    }}
                    className="flex-1 rounded-full bg-gradient-to-t from-violet-500 to-cyan-400"
                  />
                ))}
              </div>
            </motion.div>

            {/* Decorative Glow Rings */}

            <div className="absolute h-[520px] w-[520px] rounded-full border border-violet-500/10" />

            <div className="absolute h-[640px] w-[640px] rounded-full border border-cyan-500/5" />

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[760px] w-[760px] rounded-full border border-dashed border-white/5"
            />

          </motion.div>

                  </div>

        <ScrollIndicator />
      </div>

      {/* Bottom Gradient Fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050816] via-[#050816]/80 to-transparent" />
    </section>
  );
}