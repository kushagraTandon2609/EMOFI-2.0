import { motion } from "framer-motion";
import {
  UserRound,
  Mail,
  ShieldCheck,
  Smile,
  Frown,
  Angry,
  Sparkles,
  Activity,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface ProfileCardProps {
  user: User;

  distribution?: Record<string, number>;
}

const emotionConfig: Record<
  string,
  {
    icon: typeof Smile;
    label: string;
    gradient: string;
  }
> = {
  happy: {
    icon: Smile,
    label: "Happy",
    gradient: "from-violet-500 to-fuchsia-500",
  },

  sad: {
    icon: Frown,
    label: "Sad",
    gradient: "from-cyan-400 to-blue-500",
  },

  angry: {
    icon: Angry,
    label: "Angry",
    gradient: "from-orange-400 to-red-500",
  },

  surprise: {
    icon: Sparkles,
    label: "Surprise",
    gradient: "from-pink-500 to-fuchsia-500",
  },
};

export default function ProfileCard({
  user,
  distribution = {},
}: ProfileCardProps) {
  const total = Object.values(distribution).reduce(
    (sum, value) => sum + value,
    0
  );

  const emotions = Object.entries(distribution)
    .sort((a, b) => b[1] - a[1]);

  const dominantEmotion =
    emotions.length > 0
      ? emotions[0][0]
      : null;

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
        duration: 0.5,
      }}
      className="
      mt-6
      grid
      gap-6
      xl:grid-cols-2
      "
    >

      {/* Account Card */}

      <div
        className="
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-slate-800
        bg-white/[0.035]
        p-7
        backdrop-blur-3xl
        "
      >

        {/* Glow */}

        <div
          className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-violet-500/10
          blur-3xl
          "
        />

        <div className="relative">

          {/* Header */}

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold text-white">
                Account Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your EMOFI account
              </p>

            </div>

            <div
              className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-violet-500/10
              "
            >
              <UserRound className="h-5 w-5 text-violet-400" />
            </div>

          </div>

          {/* User */}

          <div
            className="
            mt-7
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-slate-800
            bg-black/20
            p-4
            "
          >

            <div
              className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-violet-600
              via-fuchsia-500
              to-cyan-500
              text-xl
              font-black
              text-white
              "
            >
              {user.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0">

              <h3 className="truncate text-lg font-bold text-white">
                {user.name}
              </h3>

              <p className="mt-1 truncate text-sm text-slate-500">
                {user.email}
              </p>

            </div>

          </div>

          {/* Details */}

          <div className="mt-5 space-y-3">

            <div
              className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-slate-800
              bg-white/[0.02]
              px-4
              py-3
              "
            >

              <div className="flex items-center gap-3">

                <Mail className="h-4 w-4 text-cyan-400" />

                <span className="text-sm text-slate-500">
                  Email
                </span>

              </div>

              <span className="max-w-[55%] truncate text-sm text-slate-300">
                {user.email}
              </span>

            </div>

            <div
              className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-slate-800
              bg-white/[0.02]
              px-4
              py-3
              "
            >

              <div className="flex items-center gap-3">

                <ShieldCheck className="h-4 w-4 text-emerald-400" />

                <span className="text-sm text-slate-500">
                  Account Status
                </span>

              </div>

              <span
                className="
                rounded-full
                border
                border-emerald-500/20
                bg-emerald-500/10
                px-3
                py-1
                text-xs
                font-semibold
                text-emerald-400
                "
              >
                Active
              </span>

            </div>

          </div>
        </div>
      </div>

        {/* Mood Profile */}

        <div
          className="
          relative
          overflow-hidden
          rounded-[26px]
          border
          border-slate-800
          bg-white/[0.035]
          p-7
          backdrop-blur-3xl
          "
        >

          {/* Glow */}

          <div
            className="
            pointer-events-none
            absolute
            -left-16
            -top-16
            h-40
            w-40
            rounded-full
            bg-cyan-500/10
            blur-3xl
            "
          />

          <div className="relative">

            {/* Header */}

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-white">
                  Mood Profile
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your emotional pattern
                </p>

              </div>

              {dominantEmotion && (
                <span
                  className="
                  rounded-full
                  border
                  border-violet-500/20
                  bg-violet-500/10
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  capitalize
                  text-violet-300
                  "
                >
                  {dominantEmotion}
                </span>
              )}

            </div>

            {/* Empty State */}

            {total === 0 ? (

              <div
                className="
                mt-7
                rounded-2xl
                border
                border-dashed
                border-slate-700
                p-8
                text-center
                "
              >

                <Activity
                  className="
                  mx-auto
                  h-8
                  w-8
                  text-slate-600
                  "
                />

                <p className="mt-3 text-sm text-slate-500">
                  No mood data yet
                </p>

                <p className="mt-1 text-xs text-slate-700">
                  Start emotion detection to build your profile.
                </p>

              </div>

            ) : (

              <div className="mt-7 space-y-5">

                {emotions.map(
                  ([emotion, count], index) => {

                    const config =
                      emotionConfig[
                        emotion.toLowerCase()
                      ];

                    if (!config) {
                      return null;
                    }

                    const Icon = config.icon;

                    const percentage =
                      (count / total) * 100;

                    return (
                      <motion.div
                        key={emotion}
                        initial={{
                          opacity: 0,
                          x: 15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.08,
                        }}
                      >

                        {/* Label */}

                        <div
                          className="
                          flex
                          items-center
                          justify-between
                          "
                        >

                          <div className="flex items-center gap-3">

                            <div
                              className={`
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-xl
                              bg-gradient-to-br
                              ${config.gradient}
                              `}
                            >
                              <Icon className="h-4 w-4 text-white" />
                            </div>

                            <div>

                              <p className="text-sm font-semibold capitalize text-white">
                                {config.label}
                              </p>

                              <p className="text-xs text-slate-600">
                                {count} detection
                                {count !== 1
                                  ? "s"
                                  : ""}
                              </p>

                            </div>

                          </div>

                          <span className="text-sm font-bold text-slate-300">
                            {percentage.toFixed(1)}%
                          </span>

                        </div>

                        {/* Progress */}

                        <div
                          className="
                          mt-3
                          h-2
                          overflow-hidden
                          rounded-full
                          bg-slate-800
                          "
                        >

                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: `${percentage}%`,
                            }}
                            transition={{
                              duration: 0.8,
                              delay: index * 0.08,
                            }}
                            className={`
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            ${config.gradient}
                            `}
                          />

                        </div>

                      </motion.div>
                    );
                  }
                )}

              </div>

            )}

          </div>

        </div>

      </motion.section>
  );
}