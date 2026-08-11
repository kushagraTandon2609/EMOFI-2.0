import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Activity,
  Music2,
} from "lucide-react";

interface ProfileHeroProps {
  name: string;
  email?: string;
}

export default function ProfileHero({
  name,
  email,
}: ProfileHeroProps) {
  const initial =
    name?.charAt(0)?.toUpperCase() || "U";

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
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
      rounded-[28px]
      border
      border-violet-500/30
      bg-gradient-to-br
      from-[#121025]
      via-[#0d1020]
      to-[#07131d]
      p-7
      shadow-[0_20px_80px_rgba(139,92,246,0.12)]
      sm:p-9
      "
    >

      {/* Ambient Glows */}

      <div
        className="
        pointer-events-none
        absolute
        -left-20
        -top-20
        h-72
        w-72
        rounded-full
        bg-violet-600/20
        blur-[110px]
        "
      />

      <div
        className="
        pointer-events-none
        absolute
        -right-20
        -bottom-24
        h-80
        w-80
        rounded-full
        bg-cyan-500/10
        blur-[120px]
        "
      />

      {/* Decorative Music Glow */}

      <div
        className="
        pointer-events-none
        absolute
        right-10
        top-1/2
        hidden
        -translate-y-1/2
        lg:block
        "
      >

        <div
          className="
          relative
          flex
          h-56
          w-56
          items-center
          justify-center
          "
        >

          <div
            className="
            absolute
            h-44
            w-44
            rounded-full
            border
            border-violet-500/20
            "
          />

          <div
            className="
            absolute
            h-32
            w-32
            rounded-full
            border
            border-cyan-400/20
            "
          />

          <div
            className="
            absolute
            h-20
            w-20
            rounded-full
            border
            border-fuchsia-500/30
            "
          />

          <div
            className="
            absolute
            inset-0
            rounded-full
            bg-violet-500/10
            blur-3xl
            "
          />

          <Music2
            className="
            relative
            z-10
            h-16
            w-16
            text-fuchsia-400
            drop-shadow-[0_0_25px_rgba(217,70,239,0.8)]
            "
          />

        </div>

      </div>

      <div className="relative z-10">

        {/* Small Label */}

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

          <span className="text-xs font-medium text-violet-300">
            EMOFI • Emotion Explorer
          </span>

        </div>

        {/* Main Profile */}

        <div
          className="
          mt-7
          flex
          flex-col
          gap-7
          lg:flex-row
          lg:items-center
          "
        >

          {/* Avatar */}

          <motion.div
            whileHover={{
              scale: 1.04,
            }}
            className="
            relative
            h-32
            w-32
            shrink-0
            "
          >

            {/* Outer Glow */}

            <div
              className="
              absolute
              inset-0
              rounded-[30px]
              bg-gradient-to-br
              from-violet-500
              via-fuchsia-500
              to-cyan-400
              opacity-40
              blur-xl
              "
            />

            {/* Avatar */}

            <div
              className="
              relative
              flex
              h-full
              w-full
              items-center
              justify-center
              rounded-[30px]
              border
              border-white/20
              bg-gradient-to-br
              from-violet-600
              via-fuchsia-500
              to-cyan-500
              text-5xl
              font-black
              text-white
              shadow-[0_0_40px_rgba(168,85,247,0.3)]
              "
            >
              {initial}
            </div>

            {/* Online */}

            <div
              className="
              absolute
              -bottom-2
              -right-2
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border-4
              border-[#101020]
              bg-emerald-400
              "
            >

              <span className="h-2.5 w-2.5 rounded-full bg-white" />

            </div>

          </motion.div>

          {/* Profile Details */}

          <div className="min-w-0 flex-1">
                        {/* Name */}

            <div className="flex flex-wrap items-center gap-3">

              <h1
                className="
                text-4xl
                font-black
                tracking-tight
                text-white
                sm:text-5xl
                "
              >
                {name}
              </h1>

              <span
                className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-violet-400/30
                bg-violet-500/15
                px-3
                py-1.5
                text-xs
                font-semibold
                text-violet-300
                "
              >
                <Sparkles className="h-3.5 w-3.5" />
                Emotion Explorer
              </span>

            </div>

            {/* Email */}

            {email && (
              <p className="mt-2 text-base text-slate-400">
                {email}
              </p>
            )}

            {/* Tagline */}

            <p
              className="
              mt-5
              max-w-xl
              text-base
              leading-7
              text-slate-300
              "
            >
              Discover your emotions, understand your
              mood patterns, and let EMOFI turn your
              feelings into a personalized music experience.
            </p>

            {/* Tags */}

            <div className="mt-5 flex flex-wrap gap-3">

              <div
                className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-700
                bg-black/20
                px-4
                py-2
                "
              >
                <ShieldCheck className="h-4 w-4 text-emerald-400" />

                <span className="text-xs text-slate-300">
                  Secure Account
                </span>
              </div>

              <div
                className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-700
                bg-black/20
                px-4
                py-2
                "
              >
                <Activity className="h-4 w-4 text-cyan-400" />

                <span className="text-xs text-slate-300">
                  Emotion Tracking Active
                </span>
              </div>

              <div
                className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-700
                bg-black/20
                px-4
                py-2
                "
              >
                <Music2 className="h-4 w-4 text-fuchsia-400" />

                <span className="text-xs text-slate-300">
                  Music Personalization
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Glow Line */}

      <div
        className="
        absolute
        bottom-0
        left-0
        h-px
        w-full
        bg-gradient-to-r
        from-transparent
        via-fuchsia-500/60
        to-transparent
        "
      />

    </motion.section>
  );
}