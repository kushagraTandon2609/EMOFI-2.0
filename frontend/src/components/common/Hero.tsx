import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Music4, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

const floating = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#7c3aed33,transparent_35%),radial-gradient(circle_at_bottom_left,#2563eb22,transparent_35%)]" />
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">
        <motion.div
          initial={{opacity:0,x:-40}}
          animate={{opacity:1,x:0}}
          transition={{duration:.7}}
          className="max-w-xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-white/10 px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-violet-400"/>
            AI Powered Emotion Intelligence
          </div>

          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            Understand Your
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Emotions.
            </span>
          </h1>

          <p className="mt-8 text-lg text-slate-300">
            Detect emotions using AI, analyze facial expressions in real time,
            and receive personalized music recommendations instantly.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-2xl">
              Start Detecting <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>

            <Button variant="outline" size="lg" className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10">
              View GitHub
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{opacity:0,x:40}}
          animate={{opacity:1,x:0}}
          transition={{duration:.7}}
          className="relative flex h-[500px] w-full max-w-lg items-center justify-center"
        >
          <motion.div
            {...floating}
            className="absolute h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"
          />

          <motion.div
            {...floating}
            className="relative flex h-80 w-80 items-center justify-center rounded-full border border-violet-500/30 bg-white/5 backdrop-blur-3xl"
          >
            <div className="absolute h-64 w-64 rounded-full border border-violet-500/20 animate-pulse"/>
            <div className="absolute h-48 w-48 rounded-full border border-cyan-500/20 animate-pulse"/>
            <BrainCircuit className="h-28 w-28 text-violet-400"/>
          </motion.div>

          <motion.div
            {...floating}
            transition={{delay:.4,duration:6,repeat:Infinity}}
            className="absolute left-0 top-12 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <BrainCircuit className="text-violet-400"/>
              <div>
                <p className="font-semibold">Emotion</p>
                <p className="text-sm text-slate-300">Happy • 97.8%</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...floating}
            transition={{delay:1,duration:6,repeat:Infinity}}
            className="absolute bottom-8 right-0 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <Music4 className="text-cyan-400"/>
              <div>
                <p className="font-semibold">Playlist Ready</p>
                <p className="text-sm text-slate-300">24 AI Picks</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
