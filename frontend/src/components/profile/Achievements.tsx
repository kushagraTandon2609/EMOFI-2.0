import { motion } from "framer-motion";
import {
  Trophy,
  Sparkles,
  Target,
  Flame,
  Crown,
  Check,
  Lock,
} from "lucide-react";

interface AchievementsProps {
  totalDetections: number;
}

export default function Achievements({
  totalDetections,
}: AchievementsProps) {
  const achievements = [
    {
      title: "First Detection",
      shortTitle: "FIRST",
      requirement: 1,
      icon: Sparkles,
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Getting Started",
      shortTitle: "10 MOODS",
      requirement: 10,
      icon: Target,
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      title: "Mood Explorer",
      shortTitle: "50 MOODS",
      requirement: 50,
      icon: Flame,
      gradient: "from-orange-400 to-pink-500",
    },
    {
      title: "Emotion Master",
      shortTitle: "100 MOODS",
      requirement: 100,
      icon: Crown,
      gradient: "from-emerald-400 to-teal-500",
    },
  ];

  const unlockedCount = achievements.filter(
    (achievement) =>
      totalDetections >= achievement.requirement
  ).length;

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
        delay: 0.2,
      }}
      className="
      relative
      mt-6
      overflow-hidden
      rounded-[26px]
      border
      border-slate-800
      bg-white/[0.035]
      p-7
      backdrop-blur-3xl
      "
    >

      {/* Background Glow */}

      <div
        className="
        pointer-events-none
        absolute
        -right-20
        -top-20
        h-52
        w-52
        rounded-full
        bg-violet-500/10
        blur-[90px]
        "
      />

      <div
        className="
        pointer-events-none
        absolute
        -bottom-20
        -left-20
        h-48
        w-48
        rounded-full
        bg-cyan-500/5
        blur-[90px]
        "
      />

      <div className="relative z-10">

        {/* Header */}

        <div
          className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-amber-500/20
              bg-amber-500/10
              "
            >
              <Trophy className="h-5 w-5 text-amber-400" />
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Achievements
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Milestones from your EMOFI journey
              </p>

            </div>

          </div>

          {/* Progress Counter */}

          <div
            className="
            flex
            items-center
            gap-3
            self-start
            rounded-full
            border
            border-slate-800
            bg-black/20
            px-4
            py-2
            sm:self-auto
            "
          >

            <span className="text-xs text-slate-500">
              Unlocked
            </span>

            <span className="text-sm font-bold text-white">
              {unlockedCount}
            </span>

            <span className="text-xs text-slate-600">
              / {achievements.length}
            </span>

          </div>

        </div>

        {/* Achievement Grid */}

        <div
          className="
          mt-7
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
          "
        >

          {achievements.map(
            (achievement, index) => {
              const Icon = achievement.icon;

              const unlocked =
                totalDetections >=
                achievement.requirement;

              const progress = Math.min(
                (totalDetections /
                  achievement.requirement) *
                  100,
                100
              );

              return (
                <motion.div
                  key={achievement.title}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className={`
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  p-5
                  transition-all
                  ${
                    unlocked
                      ? "border-violet-500/20 bg-white/[0.045] hover:border-violet-500/40"
                      : "border-slate-800 bg-black/10"
                  }
                  `}
                >

                  {/* Glow for unlocked */}

                  {unlocked && (
                    <div
                      className={`
                      pointer-events-none
                      absolute
                      -right-8
                      -top-8
                      h-24
                      w-24
                      rounded-full
                      bg-gradient-to-br
                      ${achievement.gradient}
                      opacity-10
                      blur-2xl
                      `}
                    />
                  )}

                  <div className="relative">

                    {/* Top */}

                    <div className="flex items-start justify-between">

                      <div
                        className={`
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        ${achievement.gradient}
                        shadow-lg
                        transition-transform
                        duration-300
                        ${
                          unlocked
                            ? "opacity-100 group-hover:scale-105"
                            : "opacity-20 grayscale"
                        }
                        `}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>

                      {/* Status */}

                      <div
                        className={`
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        ${
                          unlocked
                            ? "bg-emerald-500/10"
                            : "bg-slate-800"
                        }
                        `}
                      >

                        {unlocked ? (
                          <Check
                            className="
                            h-3.5
                            w-3.5
                            text-emerald-400
                            "
                          />
                        ) : (
                          <Lock
                            className="
                            h-3
                            w-3
                            text-slate-600
                            "
                          />
                        )}

                      </div>

                    </div>

                    {/* Title */}

                    <div className="mt-5">

                      <p
                        className={`
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        ${
                          unlocked
                            ? "text-violet-400"
                            : "text-slate-700"
                        }
                        `}
                      >
                        {achievement.shortTitle}
                      </p>

                      <h3
                        className={`
                        mt-1
                        text-base
                        font-bold
                        ${
                          unlocked
                            ? "text-white"
                            : "text-slate-600"
                        }
                        `}
                      >
                        {achievement.title}
                      </h3>

                    </div>

                    {/* Progress */}

                    <div className="mt-5">

                      <div className="flex items-center justify-between">

                        <span className="text-[11px] text-slate-600">
                          {unlocked
                            ? "Completed"
                            : `${Math.min(
                                totalDetections,
                                achievement.requirement
                              )} / ${
                                achievement.requirement
                              } detections`}
                        </span>

                        <span
                          className={`
                          text-[11px]
                          font-bold
                          ${
                            unlocked
                              ? "text-emerald-400"
                              : "text-slate-600"
                          }
                          `}
                        >
                          {Math.round(progress)}%
                        </span>

                      </div>

                      <div
                        className="
                        mt-2
                        h-1.5
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
                            width: `${progress}%`,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.08,
                          }}
                          className={`
                          h-full
                          rounded-full
                          bg-gradient-to-r
                          ${achievement.gradient}
                          `}
                        />

                      </div>

                    </div>

                  </div>

                </motion.div>
              );
            }
          )}

        </div>

      </div>

    </motion.section>
  );
}