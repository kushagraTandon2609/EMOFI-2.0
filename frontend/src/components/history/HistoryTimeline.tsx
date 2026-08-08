import { motion } from "framer-motion";
import {
  Smile,
  Frown,
  Angry,
  Sparkles,
  Clock3,
} from "lucide-react";

interface HistoryItem {
  id: number;
  emotion: string;
  confidence: number;
  created_at: string;
}

interface HistoryTimelineProps {
  history: HistoryItem[];
  onDelete: (id: number) => void;
}

const emotionConfig: Record<
  string,
  {
    icon: typeof Smile;
    color: string;
    bg: string;
    border: string;
  }
> = {
  happy: {
    icon: Smile,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },

  sad: {
    icon: Frown,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },

  angry: {
    icon: Angry,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },

  surprise: {
    icon: Sparkles,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
};

export default function HistoryTimeline({
  history,
  onDelete,
}: HistoryTimelineProps) {
  if (history.length === 0) {
    return (
      <div
        className="
        mt-8
        rounded-3xl
        border
        border-dashed
        border-slate-700
        bg-white/[0.02]
        p-12
        text-center
        "
      >
        <Clock3 className="mx-auto h-10 w-10 text-slate-600" />

        <h3 className="mt-4 text-lg font-semibold text-slate-300">
          No emotion history found
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          Start detecting emotions to build your mood journey.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">

      <div className="mb-5 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            Mood Journey
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your recent emotion detections
          </p>
        </div>

        <span className="text-sm text-slate-500">
          {history.length} record
          {history.length !== 1 ? "s" : ""}
        </span>

      </div>

      {/* Timeline */}

      <div className="relative">

        {/* Vertical Line */}

        <div
          className="
          absolute
          bottom-6
          left-6
          top-6
          w-px
          bg-gradient-to-b
          from-violet-500/40
          via-slate-700
          to-transparent
          "
        />

        <div className="space-y-5">

          {history.map((item, index) => {
            const config =
              emotionConfig[
                item.emotion.toLowerCase()
              ] || {
                icon: Sparkles,
                color: "text-violet-400",
                bg: "bg-violet-500/10",
                border: "border-violet-500/20",
              };

            const Icon = config.icon;

            const date = new Date(
              item.created_at
            );

            const formattedDate =
              date.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

            const formattedTime =
              date.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              });

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="
                relative
                flex
                gap-5
                "
              >

                {/* Timeline Icon */}

                <div
                  className={`
                  relative
                  z-10
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  ${config.border}
                  ${config.bg}
                  `}
                >
                  <Icon
                    className={`
                    h-5
                    w-5
                    ${config.color}
                    `}
                  />
                </div>

                {/* Card */}
                                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  className="
                  min-w-0
                  flex-1
                  rounded-2xl
                  border
                  border-slate-800
                  bg-white/5
                  p-5
                  backdrop-blur-3xl
                  transition-all
                  hover:border-violet-500/30
                  hover:bg-white/[0.07]
                  "
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <div className="flex items-center gap-3">

                        <h3
                          className={`
                          text-lg
                          font-bold
                          capitalize
                          ${config.color}
                          `}
                        >
                          {item.emotion}
                        </h3>

                        <span
                          className="
                          rounded-full
                          border
                          border-slate-700
                          bg-slate-900/60
                          px-2.5
                          py-1
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wider
                          text-slate-500
                          "
                        >
                          Detection
                        </span>

                      </div>

                      <div
                        className="
                        mt-2
                        flex
                        flex-wrap
                        items-center
                        gap-2
                        text-xs
                        text-slate-500
                        "
                      >

                        <span>
                          {formattedDate}
                        </span>

                        <span className="text-slate-700">
                          •
                        </span>

                        <span>
                          {formattedTime}
                        </span>

                      </div>

                    </div>

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(item.id)
                      }
                      className="
                      shrink-0
                      rounded-xl
                      p-2
                      text-slate-600
                      transition
                      hover:bg-red-500/10
                      hover:text-red-400
                      "
                      title="Delete detection"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 6h18"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 6V4h8v2"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 6l-1 14H6L5 6"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 11v5M14 11v5"
                        />
                      </svg>
                    </button>

                  </div>

                  {/* Confidence */}

                  <div className="mt-5">

                    <div className="flex items-center justify-between">

                      <span className="text-xs text-slate-500">
                        AI Confidence
                      </span>

                      <span
                        className={`
                        text-sm
                        font-bold
                        ${config.color}
                        `}
                      >
                        {item.confidence.toFixed(1)}%
                      </span>

                    </div>

                    <div
                      className="
                      mt-2
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
                          width: `${Math.min(
                            Math.max(
                              item.confidence,
                              0
                            ),
                            100
                          )}%`,
                        }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.05,
                        }}
                        className={`
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        ${config.color
                          .replace(
                            "text-",
                            "from-"
                          )}
                        to-cyan-400
                        `}
                      />

                    </div>

                  </div>

                </motion.div>

              </motion.div>
            );
          })}

        </div>

      </div>

    </div>
  );
}