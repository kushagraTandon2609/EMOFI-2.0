import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

const links = [
  { name: "Features", href: "#features" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2 rounded-2xl border transition-all ${
        scrolled
          ? "border-violet-500/20 bg-slate-900/80 shadow-2xl backdrop-blur-2xl"
          : "border-white/10 bg-slate-900/60 backdrop-blur-xl"
      }`}
    >
      <div className="flex h-18 items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wide text-white">
              EMOFI
            </h1>
            <p className="-mt-1 text-xs text-slate-400">
              Emotion Intelligence
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="text-sm text-slate-300 transition hover:text-violet-400"
            >
              {l.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90">
              Get Started
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-slate-900/95 md:hidden"
          >
            <div className="flex flex-col gap-3 p-5">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-slate-300"
                >
                  {l.name}
                </a>
              ))}

              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full text-white">
                  Login
                </Button>
              </Link>

              <Link to="/register" onClick={() => setOpen(false)}>
                <Button className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
