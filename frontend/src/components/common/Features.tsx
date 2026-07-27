import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Camera,
  Music4,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    title: "AI Emotion Detection",
    description:
      "Advanced facial emotion recognition powered by MediaPipe and deep learning for highly accurate real-time predictions.",
    icon: BrainCircuit,
    gradient: "from-violet-600 via-fuchsia-500 to-cyan-500",
    col: "xl:col-span-2",
    row: "xl:row-span-2",
  },
  {
    title: "Smart Music Recommendation",
    description:
      "Generate personalized playlists based on your detected emotions and instantly improve your mood.",
    icon: Music4,
    gradient: "from-cyan-500 via-sky-500 to-blue-500",
    col: "xl:col-span-2",
  },
  {
    title: "Live Webcam",
    description:
      "Low-latency live camera processing with beautiful animations.",
    icon: Camera,
    gradient: "from-pink-500 to-orange-500",
  },
  {
    title: "Mood Analytics",
    description:
      "Track emotional trends and visualize your mental wellbeing.",
    icon: BarChart3,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Private & Secure",
    description:
      "Your data stays protected with secure authentication and encrypted history.",
    icon: ShieldCheck,
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    title: "Premium Experience",
    description:
      "Modern UI crafted with smooth interactions, premium glassmorphism and delightful animations.",
    icon: Sparkles,
    gradient: "from-yellow-500 via-orange-500 to-pink-500",
    col: "xl:col-span-2",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#050816] px-6 py-32"
    >
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7c3aed18,transparent_60%)]" />

<div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

<div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-cyan-500/8 blur-[160px]" />

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: .8,
          }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-violet-400" />

            <span className="text-sm font-medium text-violet-300">
              Built for Emotion Intelligence
            </span>
          </div>

          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            AI That Understands

            <span className="mt-2 block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              How You Feel
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            EMOFI combines computer vision, artificial intelligence,
            emotion detection and personalized music recommendation
            into one beautiful experience.
          </p>
        </motion.div>

        {/* Bento Grid */}

        <div className="grid auto-rows-[260px] gap-6 xl:grid-cols-4">

          {features.slice(0, 3).map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/70 backdrop-blur-2xl ${feature.col ?? ""} ${feature.row ?? ""}`}
              >
                {/* Glow */}

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500 group-hover:opacity-20`}
                />

                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                <div className="relative flex h-full flex-col justify-between p-8">

                  <motion.div
                    whileHover={{
                      rotate: 10,
                      scale: 1.08,
                    }}
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-xl`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>

                  <div>
                    <h3 className="mb-4 text-3xl font-bold text-white">
                      {feature.title}
                    </h3>

                    <p className="max-w-md leading-7 text-slate-400">
                      {feature.description}
                    </p>

                    <div className="mt-8 flex items-center gap-2 font-medium text-violet-300">
                      Learn More

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
                                {/* Animated Border */}
                <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/5 transition-all duration-500 group-hover:border-violet-500/50" />
              </motion.div>
            );
          })}

          {features.slice(3).map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: (index + 3) * 0.08,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/70 backdrop-blur-2xl ${feature.col ?? ""}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500 group-hover:opacity-20`}
                />

                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-3xl" />

                <div className="relative flex h-full flex-col justify-between p-8">
                  <motion.div
                    whileHover={{
                      rotate: 8,
                      scale: 1.08,
                    }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient}`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </motion.div>

                  <div>
                    <h3 className="mb-3 text-2xl font-bold text-white">
                      {feature.title}
                    </h3>

                    <p className="leading-7 text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/5 transition-all duration-500 group-hover:border-violet-500/50" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}

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
            delay: 0.2,
          }}
          className="mt-24 text-center"
        >
          <div className="inline-flex flex-col items-center rounded-[32px] border border-white/10 bg-slate-900/70 px-10 py-10 backdrop-blur-2xl">
            <h3 className="text-3xl font-black text-white md:text-4xl">
              Experience Emotion AI
            </h3>

            <p className="mt-4 max-w-2xl text-slate-400">
              Discover how artificial intelligence can understand your emotions
              and recommend music that matches your mood in real time.
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="group mt-8 flex items-center rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,.35)]"
            >
              Get Started

              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}