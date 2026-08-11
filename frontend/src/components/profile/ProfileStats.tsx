import { motion } from "framer-motion";
import {
  Activity,
  Target,
  Smile,
  Zap,
} from "lucide-react";

interface ProfileStatsData {
  total: number;
  mostCommon: string | null;
  latestEmotion: string | null;
  averageConfidence: number | null;
}

interface ProfileStatsProps {
  stats: ProfileStatsData;
}

export default function ProfileStats({
  stats,
}: ProfileStatsProps) {
  const cards = [
    {
      icon: Activity,
      value: stats.total,
      label: "Total Detections",
      gradient: "from-violet-500 to-fuchsia-500",
      glow: "bg-violet-500/20",
    },
    {
      icon: Target,
      value:
        stats.averageConfidence !== null
          ? `${stats.averageConfidence.toFixed(1)}%`
          : "—",
      label: "Avg. Confidence",
      gradient: "from-cyan-400 to-blue-500",
      glow: "bg-cyan-500/20",
    },
    {
      icon: Smile,
      value: stats.mostCommon || "—",
      label: "Most Detected Mood",
      gradient: "from-fuchsia-500 to-pink-500",
      glow: "bg-fuchsia-500/20",
    },
    {
      icon: Zap,
      value: stats.latestEmotion || "—",
      label: "Latest Emotion",
      gradient: "from-amber-400 to-orange-500",
      glow: "bg-orange-500/20",
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
        delay: 0.1,
      }}
      className="
      mt-6
      overflow-hidden
      rounded-[26px]
      border
      border-slate-800
      bg-white/[0.035]
      backdrop-blur-3xl
      "
    >

      <div
        className="
        grid
        divide-y
        divide-slate-800
        sm:grid-cols-2
        sm:divide-x
        sm:divide-y-0
        xl:grid-cols-4
        "
      >

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.label}
              whileHover={{
                backgroundColor:
                  "rgba(255,255,255,0.035)",
              }}
              className="
              relative
              overflow-hidden
              px-6
              py-7
              transition-colors
              "
            >

              {/* Ambient Glow */}

              <div
                className={`
                pointer-events-none
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                ${card.glow}
                blur-3xl
                `}
              />

              {/* Top Row */}

              <div className="relative flex items-center justify-between">

                <div
                  className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  ${card.gradient}
                  shadow-lg
                  `}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  EMOFI
                </span>

              </div>

              {/* Value */}
                            <div className="relative mt-5">

                <h2
                  className="
                  truncate
                  text-3xl
                  font-black
                  capitalize
                  tracking-tight
                  text-white
                  "
                >
                  {card.value}
                </h2>

                <p
                  className="
                  mt-2
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-slate-500
                  "
                >
                  {card.label}
                </p>

              </div>

              {/* Bottom Accent */}

              <div
                className={`
                absolute
                bottom-0
                left-6
                right-6
                h-px
                bg-gradient-to-r
                ${card.gradient}
                opacity-30
                `}
              />

            </motion.div>
          );
        })}

      </div>

    </motion.section>
  );
}