import { motion } from "framer-motion";
import {
  UserRound,
  Sparkles,
  CalendarDays,
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
            EMOFI Profile
          </span>

        </div>

        {/* Profile */}

        <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-center">

          {/* Avatar */}

          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 2,
            }}
            className="
            flex
            h-24
            w-24
            shrink-0
            items-center
            justify-center
            rounded-3xl
            bg-gradient-to-br
            from-violet-600
            via-fuchsia-500
            to-cyan-500
            text-4xl
            font-black
            text-white
            shadow-2xl
            shadow-violet-500/20
            "
          >
            {initial}
          </motion.div>

          <div>

                      <h1
              className="
              text-4xl
              font-black
              text-white
              sm:text-5xl
              "
            >
              {name}
            </h1>

            {email && (
              <p className="mt-2 text-sm text-slate-400">
                {email}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">

              <div
                className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-500/20
                bg-emerald-500/10
                px-3
                py-1.5
                "
              >
                <span
                  className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                  animate-pulse
                  "
                />

                <span className="text-xs font-medium text-emerald-400">
                  Active Member
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
                bg-white/5
                px-3
                py-1.5
                "
              >
                <UserRound className="h-3.5 w-3.5 text-slate-500" />

                <span className="text-xs text-slate-400">
                  EMOFI User
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
                bg-white/5
                px-3
                py-1.5
                "
              >
                <CalendarDays className="h-3.5 w-3.5 text-slate-500" />

                <span className="text-xs text-slate-400">
                  Emotion Tracking
                </span>
              </div>

            </div>

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