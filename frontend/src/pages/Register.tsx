import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Input from "../components/common/Input";
import { Button } from "../components/ui/button";
import AuroraBackground from "../components/background/AuroraBackground";
import Container from "../components/ui/Container";
import { registerUser } from "../services/auth";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert(response.message);

      navigate("/login");
        } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
    
      alert(
        err.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      <AuroraBackground />

      <Container className="relative z-10 flex min-h-screen items-center py-16">

        <div className="grid w-full items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: .8,
            }}
            className="hidden lg:block"
          >

            <div className="inline-flex items-center gap-2 rounded-lg border border-violet-500/20 bg-white/5 px-4 py-2 backdrop-blur-xl">

              <Sparkles className="h-4 w-4 text-violet-400" />

              <span className="text-sm text-slate-300">
                Welcome to EMOFI
              </span>

            </div>

            <h1 className="mt-8 text-6xl font-black leading-tight">

              Join the Future

              <span className="mt-2 block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

                of Emotion AI

              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">

              Create your account to access
              AI-powered emotion detection,
              personalized music recommendations,
              analytics and much more.

            </p>
                        <div className="mt-12 space-y-6">

              {[
                {
                  icon: BrainCircuit,
                  title: "AI Emotion Detection",
                  desc: "Real-time facial emotion recognition powered by TensorFlow & MediaPipe.",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Authentication",
                  desc: "Your account and emotion history remain protected.",
                },
                {
                  icon: CheckCircle2,
                  title: "Personalized Experience",
                  desc: "Receive music recommendations based on your emotions.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    whileHover={{
                      x: 8,
                    }}
                    className="
                    flex
                    items-start
                    gap-5
                    rounded-xl
                    border
                    border-slate-800
                    bg-white/5
                    p-5
                    backdrop-blur-xl
                    "
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500">

                      <Icon className="h-6 w-6 text-white" />

                    </div>

                    <div>

                      <h3 className="font-semibold text-lg">

                        {item.title}

                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-400">

                        {item.desc}

                      </p>

                    </div>

                  </motion.div>
                );
              })}

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: .8,
              delay: .2,
            }}
            className="
            mx-auto
            w-full
            max-w-md
            rounded-2xl
            border
            border-slate-700
            bg-white/5
            p-8
            shadow-[0_20px_80px_rgba(0,0,0,.45)]
            backdrop-blur-3xl
            "
          >

            <h2 className="text-3xl font-black">

              Create Account

            </h2>

            <p className="mt-2 text-slate-400">

              Start your AI-powered emotional journey.

            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
                            <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Full Name
                </label>

                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-slate-700 bg-white/5 text-white placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email Address
                </label>

                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-slate-700 bg-white/5 text-white placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Password
                </label>

                <Input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border-slate-700 bg-white/5 text-white placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Confirm Password
                </label>

                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="border-slate-700 bg-white/5 text-white placeholder:text-slate-500 focus:border-violet-500"
                />
              </div>

              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Button
                  type="submit"
                  className="
                  h-14
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-600
                  via-fuchsia-500
                  to-cyan-500
                  text-base
                  font-semibold
                  transition-all
                  hover:opacity-95
                  "
                >
                  Create Account

                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
                            <div className="pt-2 text-center">

                <p className="text-sm text-slate-400">

                  Already have an account?{" "}

                  <Link
                    to="/login"
                    className="
                    font-semibold
                    text-violet-400
                    transition
                    hover:text-cyan-400
                    "
                  >
                    Login
                  </Link>

                </p>

              </div>

            </form>

          </motion.div>

        </div>

      </Container>

      {/* Floating Glow */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
        pointer-events-none
        absolute
        -left-40
        top-1/2
        h-[420px]
        w-[420px]
        -translate-y-1/2
        rounded-full
        bg-violet-600
        blur-[150px]
        "
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
        }}
        className="
        pointer-events-none
        absolute
        -right-32
        top-24
        h-[350px]
        w-[350px]
        rounded-full
        bg-cyan-500
        blur-[150px]
        "
      />

      {/* Bottom Link */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">

        <Link
          to="/Landing.tsx"
          className="
          text-sm
          text-slate-500
          transition
          hover:text-violet-400
          "
        >
          ← Back to Home
        </Link>

      </div>

    </section>
  );
}