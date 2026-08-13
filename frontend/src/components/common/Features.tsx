import { motion } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  Camera,
  Music4,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

function GlassCard({ className = "", children }: CardProps) {
  return (
    <motion.div
      variants={item}
      whileHover={{
        y: -8,
      }}
      className={`group relative overflow-hidden rounded-[36px]
      border border-white/10
      bg-[#0B1220]/80
      backdrop-blur-2xl
      transition-all duration-500
      hover:border-violet-500/40
      ${className}`}
    >
      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:42px_42px]" />

      {/* Glow */}

      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

      {children}
    </motion.div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#050816] py-32"
    >
      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[220px]" />

        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/8 blur-[180px]" />

        <div className="absolute left-0 bottom-0 h-[450px] w-[450px] rounded-full bg-fuchsia-500/8 blur-[180px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: .7,
          }}
          className="mx-auto mb-24 max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 backdrop-blur-xl">

            <Sparkles className="h-4 w-4 text-violet-400" />

            <span className="text-sm font-medium tracking-wide text-violet-300">
              Emotion Intelligence Platform
            </span>

          </div>

          <h2 className="text-5xl font-black leading-tight text-white md:text-6xl">

            Built Around

            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

              Human Emotions

            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">

            Experience real-time emotion detection, intelligent music
            recommendations, mood analytics and privacy-first AI
            crafted into one premium platform.

          </p>

        </motion.div>

        {/* Layout */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
          }}
          className="space-y-6"
        >
          
                    {/* Hero Card */}

          <GlassCard>
            <div className="grid gap-12 p-10 lg:grid-cols-[1.1fr_.9fr] lg:p-14">
              {/* Left */}

              <div className="flex flex-col justify-center">
                <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>

                  <span className="text-xs font-semibold tracking-[0.25em] text-emerald-300">
                    LIVE AI DETECTION
                  </span>
                </div>

                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-500 shadow-[0_0_60px_rgba(139,92,246,.35)]">
                  <BrainCircuit className="h-10 w-10 text-white" />
                </div>

                <h3 className="max-w-xl text-4xl font-black leading-tight text-white md:text-5xl">
                  Real-Time Emotion
                  <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                    Detection Engine
                  </span>
                </h3>

                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                  Detect facial emotions instantly using MediaPipe,
                  computer vision and deep learning with
                  production-grade performance and ultra-low latency.
                </p>

                

                
              </div>

              {/* Right */}

              <div className="flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-[430px]">
                  {/* Rings */}

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-full border border-dashed border-violet-500/30"
                  />

                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 14,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-8 rounded-full border border-cyan-400/30"
                  />

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 9,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-16 rounded-full border border-dashed border-fuchsia-400/30"
                  />

                  {/* Scan */}

                  <motion.div
                    animate={{
                      y: [-150, 320],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                    className="absolute left-6 right-6 h-20 rounded-full bg-cyan-400/15 blur-xl"
                  />

                  {/* Center */}

                  <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-500 shadow-[0_0_80px_rgba(139,92,246,.5)]">
                    <BrainCircuit className="h-16 w-16 text-white" />
                  </div>

                  {/* Nodes */}

                  {[
                    "left-[8%] top-[18%]",
                    "right-[10%] top-[22%]",
                    "left-[20%] bottom-[12%]",
                    "right-[14%] bottom-[18%]",
                  ].map((pos) => (
                    <motion.div
                      key={pos}
                      animate={{
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                      }}
                      className={`absolute ${pos} h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
                    {/* Row 2 */}

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Smart Music */}

            <GlassCard>
              <div className="flex h-full flex-col justify-between p-10">

                <div>

                  <div className="mb-6 flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-500">
                    <Music4 className="h-9 w-9 text-white" />
                  </div>

                  <h3 className="text-3xl font-black text-white">
                    Smart Music
                    <span className="block text-cyan-400">
                      Recommendation
                    </span>
                  </h3>

                  <p className="mt-5 max-w-lg text-lg leading-8 text-slate-400">
                    AI automatically understands your emotional state
                    and generates playlists that perfectly match your
                    current mood.
                  </p>

                </div>

                {/* Player */}

                <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">

                  <div className="mb-8 flex items-center gap-5">

                    <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500" />

                    <div>

                      <h4 className="text-2xl font-bold text-white">
                        Happy Vibes
                      </h4>

                      <p className="mt-1 text-slate-400">
                        AI Generated Playlist
                      </p>

                    </div>

                  </div>

                  <div className="flex h-28 items-end gap-3">

                    {[32, 70, 46, 88, 58, 98, 44, 82].map((height) => (

                      <motion.div
                        key={height}
                        animate={{
                          height: [
                            height,
                            height + 18,
                            height,
                          ],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          delay: height / 100,
                        }}
                        style={{
                          height,
                        }}
                        className="w-full rounded-full bg-gradient-to-t from-cyan-500 via-sky-400 to-violet-500"
                      />

                    ))}

                  </div>

                </div>

              </div>

            </GlassCard>

            {/* Analytics */}

            <GlassCard>

              <div className="flex h-full flex-col justify-between p-10">

                <div className="flex items-start justify-between">

                  <div>

                    <div className="mb-6 flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500">

                      <BarChart3 className="h-9 w-9 text-white" />

                    </div>

                    <h3 className="text-3xl font-black text-white">

                      Mood
                      <span className="block text-emerald-400">
                        Analytics
                      </span>

                    </h3>

                    <p className="mt-5 max-w-md text-lg leading-8 text-slate-400">

                      Understand emotional trends through
                      beautiful analytics and AI-powered
                      insights.

                    </p>

                  </div>

                  

                </div>

                {/* Chart */}

                <div className="mt-12">

                  <div className="mb-4 flex justify-between text-sm text-slate-500">

                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>

                  </div>

                  <div className="flex h-60 items-end gap-4">

                    {[52, 86, 68, 112, 84, 138, 102].map((height) => (

                      <motion.div
                        key={height}
                        initial={{
                          height: 0,
                        }}
                        whileInView={{
                          height,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: .8,
                        }}
                        style={{
                          height,
                        }}
                        className="w-full rounded-t-3xl bg-gradient-to-t from-emerald-500 to-cyan-400"
                      />

                    ))}

                  </div>

                </div>

              </div>

            </GlassCard>

          </div>
                    {/* Row 3 */}

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Live Webcam */}

            <GlassCard>

              <div className="grid h-full gap-10 p-10 lg:grid-cols-[1fr_220px]">

                <div className="flex flex-col justify-center">

                  <div className="mb-6 flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500 to-orange-500">

                    <Camera className="h-9 w-9 text-white" />

                  </div>

                  <h3 className="text-3xl font-black text-white">

                    Live
                    <span className="block text-orange-400">
                      Webcam
                    </span>

                  </h3>

                  <p className="mt-5 max-w-lg text-lg leading-8 text-slate-400">

                    Instant face detection with ultra-low latency
                    processing and real-time AI inference.

                  </p>

                  

                </div>

                {/* Camera Preview */}

                <div className="relative flex items-center justify-center">

                  <div className="relative h-[220px] w-[220px] rounded-[32px] border border-white/10 bg-black/30">

                    <div className="absolute inset-5 rounded-[22px] border border-cyan-400/30" />

                    <motion.div
                      animate={{
                        y: [20, 165, 20],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.8,
                        ease: "linear",
                      }}
                      className="absolute left-5 right-5 h-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
                    />

                    <div className="absolute left-4 top-4 flex items-center gap-2">

                      <motion.div
                        animate={{
                          opacity: [.4, 1, .4],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                        }}
                        className="h-3 w-3 rounded-full bg-red-500"
                      />

                      <span className="text-xs tracking-widest text-red-300">
                        LIVE
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </GlassCard>

            {/* Privacy */}

            <GlassCard>

              <div className="grid h-full gap-10 p-10 lg:grid-cols-[1fr_220px]">

                <div className="flex flex-col justify-center">

                  <div className="mb-6 flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-500">

                    <ShieldCheck className="h-9 w-9 text-white" />

                  </div>

                  <h3 className="text-3xl font-black text-white">

                    Privacy &
                    <span className="block text-violet-400">
                      Security
                    </span>

                  </h3>

                  <p className="mt-5 max-w-lg text-lg leading-8 text-slate-400">

                    Your emotions stay yours.
                    Authentication, encrypted history,
                    secure storage and privacy-first architecture.

                  </p>

                </div>

                {/* Shield */}

                <div className="flex items-center justify-center">

                  <motion.div
                    animate={{
                      scale: [1, 1.06, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                    className="relative flex h-[180px] w-[180px] items-center justify-center rounded-full border border-violet-500/20"
                  >

                    <div className="absolute inset-5 rounded-full border border-dashed border-violet-400/30" />

                    <div className="absolute inset-10 rounded-full border border-cyan-400/30" />

                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 shadow-[0_0_50px_rgba(139,92,246,.35)]">

                      <ShieldCheck className="h-12 w-12 text-white" />

                    </div>

                  </motion.div>

                </div>

              </div>

            </GlassCard>

          </div>
                    {/* Premium CTA */}

          <GlassCard className="overflow-hidden">
            <div className="relative p-12 md:p-16">

              {/* Glow */}

              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

              <div className="relative flex flex-col items-center text-center">

                <motion.div
                  animate={{
                    rotate: [0, 8, -8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                  }}
                  className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-500 shadow-[0_0_80px_rgba(139,92,246,.35)]"
                >
                  <Sparkles className="h-12 w-12 text-white" />
                </motion.div>

                <h3 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
                  Ready to Experience
                  <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                    Emotion Intelligence?
                  </span>
                </h3>

                <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400">
                  Discover how AI understands your emotions,
                  recommends the perfect music and gives you
                  meaningful insights — all in one seamless
                  experience.
                </p>

                <div className="mt-12 flex flex-wrap justify-center gap-4">

                  <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300">
                    ⚡ Real-Time AI
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300">
                    🔒 Privacy First
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300">
                    🎵 Smart Recommendations
                  </div>

                </div>

                

              </div>

            </div>

          </GlassCard>

        </motion.div>

      </div>

    </section>

  );
}