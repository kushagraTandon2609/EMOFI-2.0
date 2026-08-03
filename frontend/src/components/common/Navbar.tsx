import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Menu,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "../ui/button";
import Container from "../ui/Container";
import GradientButton from "../ui/GradientButton";

const links = [
  { name: "Features", href: "#features" },
  { name: "About", href: "#about" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{
          y: -70,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className={`
        fixed
        inset-x-0
        top-5
        z-50
        `}
      >

        <Container>

          <div
            className={`
            flex
            h-16
            items-center
            justify-between
            rounded-xl
            border
            transition-all
            duration-500

            ${
              scrolled
                ? "border-slate-700 bg-slate-900/75 shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-3xl"
                : "border-slate-800 bg-slate-900/45 backdrop-blur-2xl"
            }
            `}
          >
            {/* Logo */}

            <Link
              to="/"
              className="group flex items-center gap-3 px-5"
            >
              <motion.div
                whileHover={{
                  rotate: 12,
                  scale: 1.08,
                }}
                transition={{
                  duration: .25,
                }}
                className="
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                overflow-hidden
                rounded-lg
                bg-gradient-to-br
                from-violet-600
                via-fuchsia-500
                to-cyan-500
                shadow-[0_0_35px_rgba(139,92,246,.35)]
                "
              >
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [.25, .5, .25],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                  className="absolute inset-0 rounded-full bg-white"
                />

                <Sparkles className="relative z-10 h-5 w-5 text-white" />
              </motion.div>

              <div>

                <h1 className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-lg font-black tracking-wide text-transparent">
                  EMOFI
                </h1>

                <p className="-mt-1 text-[10px] uppercase tracking-[0.3em] text-slate-400">
                  Emotion Intelligence
                </p>

              </div>

            </Link>
                        {/* Desktop Navigation */}

            <div className="hidden items-center gap-1 lg:flex">
              {links.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{
                    y: -2,
                  }}
                  className="
                  group
                  relative
                  rounded-lg
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-300
                  transition-all
                  duration-300
                  hover:text-white
                  hover:bg-white/5
                  "
                >
                  {link.name}

                  <span
                    className="
                    absolute
                    bottom-1
                    left-1/2
                    h-[2px]
                    w-0
                    -translate-x-1/2
                    rounded-full
                    bg-gradient-to-r
                    from-violet-500
                    to-cyan-400
                    transition-all
                    duration-300
                    group-hover:w-8
                    "
                  />
                </motion.a>
              ))}
            </div>

            {/* Desktop Actions */}

            <div className="hidden items-center gap-3 pr-4 lg:flex">

              <Link to="/login">

                <Button
                  variant="ghost"
                  className="
                  rounded-lg
                  px-5
                  text-white
                  hover:bg-white/10
                  hover:text-white
                  "
                >
                  Login
                </Button>

              </Link>

              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: .98,
                }}
              >

                <Link to="/register">

                  <GradientButton className="px-6 py-3">

                    <span className="flex items-center">

                      Get Started

                      <ArrowRight className="ml-2 h-4 w-4" />

                    </span>

                  </GradientButton>

                </Link>

              </motion.div>

            </div>

            {/* Mobile Button */}

            <motion.button
              whileTap={{
                scale: .92,
              }}
              onClick={() => setOpen(!open)}
              className="
              mr-3
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-lg
              border
              border-slate-700
              bg-white/5
              text-white
              backdrop-blur-xl
              lg:hidden
              "
            >
              <AnimatePresence mode="wait">

                {open ? (

                  <motion.div
                    key="close"
                    initial={{
                      rotate: -90,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: 90,
                      opacity: 0,
                    }}
                    transition={{
                      duration: .2,
                    }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>

                ) : (

                  <motion.div
                    key="menu"
                    initial={{
                      rotate: 90,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: -90,
                      opacity: 0,
                    }}
                    transition={{
                      duration: .2,
                    }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>

                )}

              </AnimatePresence>

            </motion.button>

          </div>
                  {/* Mobile Menu */}

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -15,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
              overflow-hidden
              border-t
              border-slate-800
              bg-slate-900/95
              backdrop-blur-3xl
              lg:hidden
              "
            >
              <div className="space-y-2 p-6">

                {links.map((link) => (

                  <motion.a
                    key={link.name}
                    href={link.href}
                    whileHover={{
                      x: 6,
                    }}
                    onClick={() => setOpen(false)}
                    className="
                    block
                    rounded-lg
                    px-4
                    py-3
                    text-base
                    font-medium
                    text-slate-300
                    transition-all
                    hover:bg-white/5
                    hover:text-white
                    "
                  >
                    {link.name}
                  </motion.a>

                ))}

                <div className="space-y-3 pt-5">

                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="
                      h-12
                      w-full
                      rounded-lg
                      border
                      border-slate-700
                      text-white
                      hover:bg-white/10
                      "
                    >
                      Login
                    </Button>
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                  >
                    <GradientButton className="h-12 w-full">

                      <span className="flex items-center justify-center">

                        Get Started

                        <ArrowRight className="ml-2 h-4 w-4" />

                      </span>

                    </GradientButton>
                  </Link>

                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

        {/* Ambient Glow */}

        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-xl">

          <div className="absolute -left-16 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="absolute -right-16 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        </div>

        </Container>

      </motion.nav>
            {/* Mobile Backdrop */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={() => setOpen(false)}
            className="
            fixed
            inset-0
            -z-10
            bg-black/30
            backdrop-blur-sm
            lg:hidden
            "
          />
        )}
      </AnimatePresence>

    </>
  );
}