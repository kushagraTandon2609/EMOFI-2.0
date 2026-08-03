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

import AuroraBackground from "../background/AuroraBackground";
import AIOrb from "./AIOrb";
import StatsCounter from "./StatsCounter";
import ScrollIndicator from "./ScrollIndicator";

import Container from "../ui/Container";
import GradientButton from "../ui/GradientButton";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

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
    y: [0, -12, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function Hero() {
  const user = false;

  return (
    <section className="relative isolate overflow-hidden bg-[#050816] text-white">

      <AuroraBackground />

      <Container className="relative z-10">

        <div className="grid min-h-screen items-center gap-16 py-28 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-8 inline-flex items-center gap-2 rounded-md border border-violet-500/20 bg-white/5 px-4 py-2 backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4 text-violet-400" />

              <span className="text-sm font-medium tracking-wide text-slate-200">
                AI Powered Emotion Intelligence
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl font-black leading-none tracking-tight md:text-7xl xl:text-8xl"
            >
              Understand
              <br />

              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Your Emotions
              </span>

              <br />

              with AI
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-lg leading-8 text-slate-400"
            >
              Experience next-generation facial emotion recognition,
              real-time analytics, intelligent mood tracking,
              and personalized AI music recommendations
              powered by modern deep learning.
            </motion.p>

                        <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to={user ? "/dashboard" : "/login"}>
  <GradientButton className="px-8 py-6 text-base">
    Start Detecting
    <ArrowRight className="ml-2 h-5 w-5"/>
  </GradientButton>
</Link>

              <Button
onClick={()=>
window.open(
"https://github.com/kushagraTandon2609/EMOFI-2.0",
"_blank"
)}
                variant="outline"
                size="lg"
                className="
                rounded-lg
                border-slate-700
                bg-white/5
                px-8
                py-6
                text-white
                backdrop-blur-xl
                hover:bg-white/10
                hover:border-violet-500/40
                "
              >
                <Globe className="mr-2 h-5 w-5" />

                View GitHub
              </Button>
            </motion.div>

            {/* Stats */}

            <motion.div
              variants={fadeUp}
              className="mt-16 grid grid-cols-3 gap-8"
            >
              <StatsCounter
value={4}
suffix=""
label="Supported Emotions"
/>

<StatsCounter
value={510}
suffix=""
label="AI Landmarks"
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
              duration: 0.8,
            }}
            className="
            relative
            flex
            h-[620px]
            items-center
            justify-center
            "
          >

            {/* Background Glow */}

            <motion.div
              {...floating}
              className="
              absolute
              h-[420px]
              w-[420px]
              rounded-full
              bg-violet-600/20
              blur-[120px]
              "
            />

            <motion.div
              {...floating}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
              className="
              absolute
              h-[280px]
              w-[280px]
              rounded-full
              bg-cyan-500/20
              blur-[100px]
              "
            />

            {/* AI Orb */}

            <AIOrb />

            {/* Emotion Card */}

            <motion.div
              {...floating}
              transition={{
                duration: 6,
                delay: .5,
                repeat: Infinity,
              }}
              className="
              absolute
              left-8
top-14
              w-60
              rounded-xl
              border
              border-slate-700
              bg-white/10
              p-5
              shadow-2xl
              backdrop-blur-2xl
              "
            >
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/20">

                  <BrainCircuit className="h-6 w-6 text-violet-400" />

                </div>

                <div>

                  <p className="text-sm text-slate-400">
  AI Model
</p>

<p className="mt-1 text-lg font-bold">
  TensorFlow
</p>

                </div>

              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
  width:"100%"
}}
                  transition={{
                    duration: 2,
                    delay: 1,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                />

              </div>

              <p className="mt-3 text-sm text-slate-300">
                Model Ready
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
              className="
              absolute
              left-10
bottom-14
              w-64
              rounded-xl
              border
              border-slate-700
              bg-white/10
              p-5
              shadow-2xl
              backdrop-blur-2xl
              "
            >
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/20">

                  <Music4 className="h-6 w-6 text-cyan-400" />

                </div>

                <div>

                  <p className="text-sm text-slate-400">
                    Recommendation
                  </p>

                  <p className="font-bold text-white">
                    YouTube Music
                  </p>

                </div>

              </div>

              <Button
                className="
                mt-5
                w-full
                rounded-lg
                bg-cyan-500
                transition-all
                hover:bg-cyan-400
                "
              >
                <Play className="mr-2 h-4 w-4" />

                Generate Playlist
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
              className="
              absolute
              right-2
top-[42%]
              w-56
              -translate-y-1/2
              rounded-xl
              border
              border-slate-700
              bg-white/10
              p-5
              backdrop-blur-2xl
              "
            >
              <div className="flex items-center gap-3">

                <TrendingUp className="h-6 w-6 text-green-400" />

                <div>

                  <p className="text-sm text-slate-400">
  Detection Pipeline
</p>

<p className="font-bold text-cyan-400">
  Ready
</p>

                </div>

              </div>

              <div className="mt-5 flex items-end gap-2">

                {[40, 65, 55, 80, 70, 95].map((height, index) => (

                  <motion.div
                    key={index}
                    initial={{
                      height: 0,
                    }}
                    animate={{
                      height,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15,
                    }}
                    className="flex-1 rounded-full bg-gradient-to-t from-violet-500 to-cyan-400"
                  />

                ))}

              </div>

            </motion.div>

            {/* Decorative Rings */}

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
              className="
              absolute
              h-[760px]
              w-[760px]
              rounded-full
              border
              border-dashed
              border-white/5
              "
            />
                      </motion.div>

        </div>

        {/* Bottom Stats / Scroll */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.2,
            duration: 0.8,
          }}
          className="mt-10 flex justify-center lg:justify-start"
        >
          <ScrollIndicator />
        </motion.div>

      </Container>

      {/* Bottom Gradient */}

      <div
        className="
        pointer-events-none
        absolute
        inset-x-0
        bottom-0
        h-40
        bg-gradient-to-t
        from-[#050816]
        via-[#050816]/80
        to-transparent
        "
      />

      {/* Side Glow */}

      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-600/5 blur-[180px]" />

      <div className="pointer-events-none absolute right-0 top-1/3 h-[450px] w-[450px] rounded-full bg-cyan-500/5 blur-[180px]" />

    </section>
  );
}