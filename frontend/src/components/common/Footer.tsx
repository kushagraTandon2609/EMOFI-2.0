import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  Mail,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

import Container from "../ui/Container";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="about"
      className="relative overflow-hidden border-t border-slate-800 bg-[#050816] text-white"
    >
      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7c3aed18,transparent_45%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#06b6d418,transparent_35%)]" />

      </div>

      {/* Top Gradient */}

      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

      <Container className="relative py-20">

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
            duration: .6,
          }}
          className="grid gap-16 lg:grid-cols-[2fr_1fr_1fr]"
        >

          {/* Brand */}

          <div>

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-500 shadow-[0_0_35px_rgba(139,92,246,.35)]">

                <Sparkles className="h-7 w-7 text-white" />

              </div>

              <div>

                <h2 className="text-3xl font-black tracking-wide">
                  EMOFI
                </h2>

                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Emotion Intelligence
                </p>

              </div>

            </div>

            <p className="mt-8 max-w-lg leading-8 text-slate-400">
              AI-powered emotion recognition platform that detects
              facial expressions in real time and recommends music
              based on your emotional state using TensorFlow,
              MediaPipe and computer vision.
            </p>

            <div className="mt-8 flex gap-4">

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                href="https://github.com/kushagraTandon2609/EMOFI-2.0"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-700 bg-white/5 transition hover:border-violet-500/40 hover:bg-violet-500/10"
              >
                <FaGithub className="h-5 w-5" />
              </motion.a>

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                href="https://www.linkedin.com/in/kushagra-tandon-94905b288/"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-700 bg-white/5 transition hover:border-cyan-500/40 hover:bg-cyan-500/10"
              >
                <FaLinkedin className="h-5 w-5" />
              </motion.a>

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                href="mailto:kushagratandonvsec@gmail.com"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-700 bg-white/5 transition hover:border-violet-500/40 hover:bg-violet-500/10"
              >
                <Mail className="h-5 w-5" />
              </motion.a>

            </div>

          </div>
                    {/* Project */}

          <div>

            <h3 className="mb-8 text-xl font-bold">
              Project
            </h3>

            <div className="space-y-5">

              <Link
                to="/"
                className="group flex items-center gap-2 text-slate-400 transition hover:text-white"
              >
                Home

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <a
                href="#features"
                className="group flex items-center gap-2 text-slate-400 transition hover:text-white"
              >
                Features

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <Link
                to="/dashboard"
                className="group flex items-center gap-2 text-slate-400 transition hover:text-white"
              >
                Dashboard

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <motion.a
                href="https://github.com/kushagraTandon2609/EMOFI-2.0"
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  x: 3,
                }}
                className="group flex items-center gap-2 text-slate-400 transition hover:text-white"
              >
                GitHub Repository

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.a>

            </div>

          </div>

          {/* Tech Stack */}

          <div>

            <h3 className="mb-8 text-xl font-bold">
              Technology
            </h3>

            <div className="flex flex-wrap gap-3">

              {[
                "React 19",
                "TypeScript",
                "Tailwind CSS",
                "Flask",
                "TensorFlow",
                "MediaPipe",
                "OpenCV",
                "MySQL",
              ].map((tech) => (

                <motion.span
                  key={tech}
                  whileHover={{
                    y: -3,
                  }}
                  className="
                  rounded-lg
                  border
                  border-violet-500/20
                  bg-violet-500/10
                  px-4
                  py-2
                  text-sm
                  text-violet-300
                  transition-all
                  hover:border-violet-400/40
                  hover:bg-violet-500/15
                  "
                >
                  {tech}
                </motion.span>

              ))}

            </div>

          </div>

        </motion.div>
                {/* Bottom */}

        <div className="mt-16 border-t border-slate-800 pt-8">

          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

            <div>

              <p className="text-sm text-slate-500">
                © {year} EMOFI. All Rights Reserved.
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Designed & Developed by{" "}
                <span className="font-semibold text-white">
                  Kushagra Tandon
                </span>
              </p>

            </div>

            <div className="flex flex-wrap items-center gap-3">

              <span className="rounded-lg border border-slate-700 bg-white/5 px-4 py-2 text-sm text-slate-300">
                Version 2.0
              </span>

              <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                Production Ready
              </span>

            </div>

          </div>

        </div>

      </Container>

    </footer>
  );
}