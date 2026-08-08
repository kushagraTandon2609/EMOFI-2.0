import { motion } from "framer-motion";
import {
  History as HistoryIcon,
  Sparkles,
} from "lucide-react";

export default function HistoryHero() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-800
      bg-white/5
      p-8
      backdrop-blur-3xl
      "
    >

      {/* Background Glow */}

      <div
        className="
        pointer-events-none
        absolute
        -right-24
        -top-24
        h-72
        w-72
        rounded-full
        bg-violet-600/10
        blur-[140px]
        "
      />

      <div
        className="
        pointer-events-none
        absolute
        -bottom-24
        -left-24
        h-72
        w-72
        rounded-full
        bg-cyan-500/10
        blur-[140px]
        "
      />

      <div className="relative z-10">

        {/* Badge */}

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
            Mood Journey
          </span>

        </div>

        {/* Heading */}

        <div className="mt-6 flex items-end justify-between">

          <div>

            <h1
              className="
              text-5xl
              font-black
              leading-tight
              text-white
              "
            >
              Your Emotion
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
                {" "}
                History
              </span>
            </h1>

            <p
              className="
              mt-5
              max-w-3xl
              text-lg
              leading-8
              text-slate-400
              "
            >
              Explore your past emotion detections and
              follow how your mood has changed over time.
            </p>

          </div>

          <div
            className="
            hidden
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-violet-600
            to-cyan-500
            shadow-lg
            shadow-violet-500/20
            lg:flex
            "
          >
            <HistoryIcon className="h-7 w-7 text-white" />
          </div>

        </div>
              </div>

      {/* Bottom Accent */}

      <div
        className="
        absolute
        bottom-0
        left-0
        h-px
        w-full
        bg-gradient-to-r
        from-transparent
        via-violet-500/60
        to-transparent
        "
      />

    </motion.section>
  );
}