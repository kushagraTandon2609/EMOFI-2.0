import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  History,
  Sparkles,
} from "lucide-react";

export default function WelcomeBanner() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: .7,
      }}
      className="
      relative
      overflow-hidden
      rounded-2xl
      border
      border-slate-800
      bg-white/5
      p-8
      backdrop-blur-3xl
      "
    >
      {/* Glow */}

      <div
        className="
        absolute
        -right-20
        -top-20
        h-60
        w-60
        rounded-full
        bg-violet-600/10
        blur-[120px]
        "
      />

      <div
        className="
        absolute
        -bottom-20
        -left-20
        h-52
        w-52
        rounded-full
        bg-cyan-500/10
        blur-[120px]
        "
      />

      <div className="relative z-10">

        <div
          className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-violet-500/20
          bg-violet-500/10
          px-4
          py-2
          "
        >

          <Sparkles className="h-4 w-4 text-violet-400" />

          <span className="text-sm text-violet-300">

            Emotion Intelligence Dashboard

          </span>

        </div>

        <h1
          className="
          mt-6
          text-5xl
          font-black
          leading-tight
          "
        >

          {greeting},{" "}

          <span
            className="
            bg-gradient-to-r
            from-violet-400
            via-fuchsia-400
            to-cyan-400
            bg-clip-text
            text-transparent
            "
          >
            {user?.name || "User"}
          </span>

          👋

        </h1>

        <p
          className="
          mt-6
          max-w-3xl
          text-lg
          leading-8
          text-slate-400
          "
        >
          Welcome back to EMOFI. Your AI-powered emotion
          recognition workspace is ready. Detect emotions,
          analyze trends and generate personalized music
          recommendations in real time.
        </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">

          {[
            "TensorFlow",
            "MediaPipe",
            "Flask API",
            "4 Supported Emotions",
          ].map((item) => (
            <div
              key={item}
              className="
              rounded-full
              border
              border-violet-500/20
              bg-violet-500/10
              px-4
              py-2
              text-sm
              text-violet-300
              "
            >
              {item}
            </div>
          ))}

        </div>

        <div className="mt-10 flex flex-wrap gap-4">

          <Link to="/dashboard">

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: .98,
              }}
              className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              via-fuchsia-500
              to-cyan-500
              px-7
              py-4
              font-semibold
              text-white
              shadow-[0_10px_40px_rgba(139,92,246,.35)]
              "
            >

              <BrainCircuit className="h-5 w-5" />

              Start Detection

              <ArrowRight className="h-5 w-5" />

            </motion.button>

          </Link>

          <Link to="/history">

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: .98,
              }}
              className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-700
              bg-white/5
              px-7
              py-4
              font-medium
              text-white
              backdrop-blur-xl
              transition-all
              hover:border-violet-500/40
              hover:bg-white/10
              "
            >

              <History className="h-5 w-5" />

              View History

            </motion.button>

          </Link>

        </div>

        <div
          className="
          mt-10
          grid
          gap-4
          border-t
          border-slate-800
          pt-8
          md:grid-cols-4
          "
        >

          {[
            {
              value: "4",
              label: "Supported Emotions",
            },
            {
              value: "510",
              label: "AI Landmarks",
            },
            {
              value: "TensorFlow",
              label: "Inference Engine",
            },
            {
              value: "MediaPipe",
              label: "Vision Framework",
            },
          ].map((item) => (

            <div key={item.label}>

              <h3 className="text-2xl font-black text-white">
                {item.value}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </motion.section>
  );
}