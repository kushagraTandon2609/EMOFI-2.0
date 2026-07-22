import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Heart, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="about"
      className="relative overflow-hidden border-t border-white/10 bg-[#050816] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7c3aed22,transparent_40%),radial-gradient(circle_at_bottom_right,#06b6d422,transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-14 lg:grid-cols-[2fr_1fr_1fr]"
        >
          <div>
            <h2 className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-4xl font-black text-transparent">
              EMOFI
            </h2>

            <p className="mt-6 max-w-md leading-8 text-slate-400">
              Experience the next generation of emotion recognition powered by
              artificial intelligence. Detect emotions, discover music, and
              understand yourself better.
            </p>

            <div className="mt-8 flex gap-4">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -6, scale: 1.08 }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:border-violet-500/40 hover:bg-violet-500/10"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-bold">Quick Links</h3>

            <div className="space-y-4 text-slate-400">
              <Link to="/" className="flex items-center gap-2 transition hover:text-white">
                Home <ArrowUpRight size={15} />
              </Link>

              <a href="#features" className="flex items-center gap-2 transition hover:text-white">
                Features <ArrowUpRight size={15} />
              </a>

              <Link to="/login" className="flex items-center gap-2 transition hover:text-white">
                Login <ArrowUpRight size={15} />
              </Link>

              <Link to="/register" className="flex items-center gap-2 transition hover:text-white">
                Register <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-bold">
              Built With
            </h3>

            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "TypeScript",
                "Flask",
                "TensorFlow",
                "MediaPipe",
                "MySQL",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-sm text-slate-500 md:flex-row">
          <p>© {year} EMOFI. All Rights Reserved.</p>

          <p className="flex items-center gap-2">
            Made with
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            using AI
          </p>
        </div>
      </div>
    </footer>
  );
}
