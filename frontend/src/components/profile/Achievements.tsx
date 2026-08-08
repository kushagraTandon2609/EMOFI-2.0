import { motion } from "framer-motion";
import {
  Trophy,
  Sparkles,
  Target,
  Flame,
  Crown,
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
      description: "Complete your first emotion detection.",
      requirement: 1,
      icon: Sparkles,
      gradient: "from-violet-600 to-fuchsia-500",
    },
    {
      title: "Getting Started",
      description: "Reach 10 emotion detections.",
      requirement: 10,
      icon: Target,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Mood Explorer",
      description: "Reach 50 emotion detections.",
      requirement: 50,
      icon: Flame,
      gradient: "from-orange-500 to-pink-500",
    },
    {
      title: "Emotion Master",
      description: "Reach 100 emotion detections.",
      requirement: 100,
      icon: Crown,
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

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
      mt-8
      rounded-3xl
      border
      border-slate-800
      bg-white/5
      p-7
      backdrop-blur-3xl
      "
    >

      {/* Header */}

      <div className="flex items-center gap-4">

        <div
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
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

      {/* Achievement Grid */}

      <div className="mt-7 grid gap-4 sm:grid-cols-2">

              <div className="mt-7 grid gap-4 sm:grid-cols-2">

          {achievements.map((achievement, index) => {
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
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -3,
                }}
                className={`
                relative
                overflow-hidden
                rounded-2xl
                border
                p-5
                transition-all
                ${
                  unlocked
                    ? "border-violet-500/20 bg-white/5 hover:border-violet-500/40"
                    : "border-slate-800 bg-white/[0.02]"
                }
                `}
              >

                {/* Locked Overlay */}

                {!unlocked && (
                  <div
                    className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-slate-950/20
                    "
                  />
                )}

                <div className="relative z-10">

                  {/* Icon + Status */}

                  <div className="flex items-start justify-between">

                    <div
                      className={`
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-br
                      ${achievement.gradient}
                      shadow-lg
                      ${
                        unlocked
                          ? "opacity-100"
                          : "opacity-30 grayscale"
                      }
                      `}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <span
                      className={`
                      rounded-full
                      px-3
                      py-1
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-wider
                      ${
                        unlocked
                          ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          : "border border-slate-700 bg-slate-900 text-slate-600"
                      }
                      `}
                    >
                      {unlocked
                        ? "Unlocked"
                        : "Locked"}
                    </span>

                  </div>

                  {/* Title */}

                  <h3
                    className={`
                    mt-5
                    text-lg
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

                  {/* Description */}

                  <p
                    className={`
                    mt-2
                    text-sm
                    leading-6
                    ${
                      unlocked
                        ? "text-slate-500"
                        : "text-slate-700"
                    }
                    `}
                  >
                    {achievement.description}
                  </p>

                  {/* Progress */}

                  <div className="mt-5">

                    <div className="flex items-center justify-between">

                      <span className="text-xs text-slate-600">
                        {unlocked
                          ? "Completed"
                          : `${totalDetections} / ${achievement.requirement}`}
                      </span>

                      <span
                        className={`
                        text-xs
                        font-semibold
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
                          duration: 0.7,
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
          })}

        </div>

      </div>

    </motion.section>
  );
}