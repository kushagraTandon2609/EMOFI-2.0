import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import Input from "../components/common/Input";
import { Button } from "../components/ui/button";
import AuroraBackground from "../components/background/AuroraBackground";
import Container from "../components/ui/Container";
import { loginUser } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      

      navigate("/dashboard");
    } catch (error: unknown) {
      alert(
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
          "Login Failed"
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

        

            <h1 className="mt-8 text-6xl font-black leading-tight">

              Continue Your

              <span className="mt-2 block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

                Emotion Journey

              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">

              Sign in to access your dashboard,
              emotion history, analytics and
              AI-powered music recommendations.

            </p>
                        <div className="mt-12 space-y-6">

              {[
                {
                  icon: BrainCircuit,
                  title: "AI Emotion Detection",
                  desc: "Access real-time facial emotion recognition powered by TensorFlow & MediaPipe.",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Dashboard",
                  desc: "Your emotion history and analytics remain protected.",
                },
                {
                  icon: CheckCircle2,
                  title: "Personalized Recommendations",
                  desc: "Continue discovering music based on your emotions.",
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

                      <h3 className="text-lg font-semibold">

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

            <Link
              to="/"
              className="
              mb-6
              inline-flex
              items-center
              gap-2
              text-sm
              text-slate-400
              transition
              hover:text-violet-400
              "
            >
              ← Back to Home
            </Link>

            <h2 className="text-3xl font-black">

              Welcome Back

            </h2>

            <p className="mt-2 text-slate-400">

              Login to continue your EMOFI journey.

            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
      
            
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
                  className="
                  border-slate-700
                  bg-white/5
                  text-white
                  placeholder:text-slate-500
                  focus:border-violet-500
                  "
                />

              </div>

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label className="text-sm font-medium text-slate-300">
                    Password
                  </label>

                  

                </div>

                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="
                  border-slate-700
                  bg-white/5
                  text-white
                  placeholder:text-slate-500
                  focus:border-violet-500
                  "
                />

              </div>

              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: .98,
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

                  Login

                  <ArrowRight className="ml-2 h-5 w-5" />

                </Button>

              </motion.div>
                            <div className="pt-2 text-center">

                <p className="text-sm text-slate-400">

                  Don't have an account?{" "}

                  <Link
                    to="/register"
                    className="
                    font-semibold
                    text-violet-400
                    transition
                    hover:text-cyan-400
                    "
                  >
                    Create Account
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

    </section>
  );
}