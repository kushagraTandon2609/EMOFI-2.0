import { motion } from "framer-motion";
import {
  BrainCircuit,
  Camera,
  Music4,
  BarChart3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Emotion Detection",
    description:
      "Detect facial emotions instantly using deep learning and MediaPipe.",
  },
  {
    icon: Camera,
    title: "Real-time Webcam",
    description:
      "Live camera analysis with smooth, low-latency emotion recognition.",
  },
  {
    icon: Music4,
    title: "Smart Music",
    description:
      "Receive playlists tailored to your detected emotional state.",
  },
  {
    icon: BarChart3,
    title: "Mood Analytics",
    description:
      "Visualize emotional trends through interactive charts and history.",
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure",
    description:
      "Authentication and protected history keep your data safe.",
  },
  {
    icon: Sparkles,
    title: "Modern Experience",
    description:
      "Beautiful animations, glassmorphism and responsive design.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#050816] px-6 py-28 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle,#7c3aed20,transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="mb-4 text-violet-400 font-semibold tracking-widest uppercase">
            Features
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Built for the Future of
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Emotion AI
            </span>
          </h2>

          <p className="mt-6 text-slate-400">
            EMOFI combines artificial intelligence, computer vision, and music
            recommendation into one seamless experience.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:border-violet-500/40 hover:shadow-[0_0_50px_rgba(124,58,237,0.25)]"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 shadow-xl transition-transform duration-300 group-hover:rotate-6">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="mb-3 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="leading-7 text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
