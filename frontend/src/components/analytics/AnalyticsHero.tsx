import { motion } from "framer-motion";
import {
  BarChart3,
  Sparkles,
  Activity,
} from "lucide-react";

export default function AnalyticsHero() {
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
            Emotion Analytics
          </span>

        </div>

        {/* Heading */}

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

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
                Analytics
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
              Understand your emotional patterns, explore detection
              trends, and discover meaningful insights from your
              EMOFI activity.
            </p>

          </div>
                    {/* Live Status */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
            flex
            shrink-0
            items-center
            gap-3
            rounded-2xl
            border
            border-emerald-500/20
            bg-emerald-500/10
            px-5
            py-4
            "
          >

            <div className="relative">

              <Activity className="h-5 w-5 text-emerald-400" />

              <span
                className="
                absolute
                -right-1
                -top-1
                h-2
                w-2
                rounded-full
                bg-emerald-400
                animate-pulse
                "
              />

            </div>

            <div>

              <p className="text-xs text-slate-500">
                Analytics Status
              </p>

              <p className="text-sm font-semibold text-emerald-400">
                Live
              </p>

            </div>

          </motion.div>

        </div>

        {/* Last Updated */}

        <div
          className="
          mt-8
          flex
          items-center
          gap-2
          text-sm
          text-slate-500
          "
        >

          <BarChart3 className="h-4 w-4" />

          <span>
            Insights are generated from your emotion detection history
          </span>

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