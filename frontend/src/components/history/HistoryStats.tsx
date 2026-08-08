import { motion } from "framer-motion";
import {
  Activity,
  Clock3,
  Smile,
  Target,
} from "lucide-react";

interface HistoryStatsData {
  total: number;
  mostCommon: string | null;
  latestEmotion: string | null;
  averageConfidence: number | null;
}

interface HistoryStatsProps {
  stats: HistoryStatsData;
}

export default function HistoryStats({
  stats,
}: HistoryStatsProps) {
  const cards = [
    {
      icon: Activity,
      value: stats.total,
      label: "Total Detections",
      description: "Recorded emotion sessions",
      gradient: "from-violet-600 to-fuchsia-500",
    },
    {
      icon: Smile,
      value: stats.mostCommon || "—",
      label: "Most Common Emotion",
      description: "Your most detected mood",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Clock3,
      value: stats.latestEmotion || "—",
      label: "Latest Emotion",
      description: "Most recent detection",
      gradient: "from-orange-500 to-pink-500",
    },
    {
      icon: Target,
      value:
        stats.averageConfidence !== null
          ? `${stats.averageConfidence.toFixed(1)}%`
          : "—",
      label: "Average Confidence",
      description: "Across your detection history",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div
      className="
      mt-8
      grid
      gap-5
      sm:grid-cols-2
      xl:grid-cols-4
      "
    >
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.label}
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
              delay: index * 0.08,
            }}
            whileHover={{
              y: -5,
            }}
            className="
            group
            rounded-2xl
            border
            border-slate-800
            bg-white/5
            p-6
            backdrop-blur-3xl
            transition-all
            hover:border-violet-500/30
            hover:bg-white/[0.07]
            "
          >

            <div className="flex items-center justify-between">

              <div
                className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                ${card.gradient}
                shadow-lg
                transition-transform
                duration-300
                group-hover:scale-105
                `}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>

              <span
                className="
                rounded-full
                border
                border-emerald-500/20
                bg-emerald-500/10
                px-3
                py-1
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-emerald-400
                "
              >
                Live
              </span>

            </div>
                        {/* Value */}

            <h2
              className="
              mt-7
              truncate
              text-3xl
              font-black
              capitalize
              text-white
              transition-colors
              duration-300
              group-hover:text-violet-300
              "
            >
              {card.value}
            </h2>

            {/* Label */}

            <p className="mt-2 text-sm font-medium text-slate-300">
              {card.label}
            </p>

            {/* Description */}

            <p className="mt-1 text-xs text-slate-500">
              {card.description}
            </p>

          </motion.div>
        );
      })}
    </div>
  );
}