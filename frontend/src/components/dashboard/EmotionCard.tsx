import { motion } from "framer-motion";
import {
  BrainCircuit,
  Activity,
  CheckCircle2,
} from "lucide-react";

interface EmotionCardProps {
  emotion: string;
  confidence: number;
}

const emotionConfig: Record<
  string,
  {
    emoji: string;
    color: string;
    glow: string;
  }
> = {
  happy: {
    emoji: "😊",
    color: "text-yellow-400",
    glow: "shadow-yellow-500/30",
  },
  sad: {
    emoji: "😢",
    color: "text-blue-400",
    glow: "shadow-blue-500/30",
  },
  angry: {
    emoji: "😠",
    color: "text-red-400",
    glow: "shadow-red-500/30",
  },
  surprise: {
    emoji: "😲",
    color: "text-violet-400",
    glow: "shadow-violet-500/30",
  },
};

export default function EmotionCard({
  emotion,
  confidence,
}: EmotionCardProps) {

  const key = emotion.toLowerCase();

  const current =
    emotionConfig[key] || {
      emoji: "🧠",
      color: "text-slate-300",
      glow: "",
    };

  return (
    <motion.section
      initial={{
        opacity: 0,
        x: 30,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="
      overflow-hidden
      rounded-2xl
      border
      border-slate-800
      bg-white/5
      backdrop-blur-3xl
      "
    >

      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between
        border-b
        border-slate-800
        px-6
        py-5
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-violet-600
            to-cyan-500
            "
          >

            <BrainCircuit className="h-6 w-6 text-white" />

          </div>

          <div>

            <h2 className="text-xl font-bold">

              Live Prediction

            </h2>

            <p className="text-sm text-slate-400">

              Current AI Result

            </p>

          </div>

        </div>

        <div
          className="
          flex
          items-center
          gap-2
          rounded-full
          border
          border-emerald-500/20
          bg-emerald-500/10
          px-4
          py-2
          "
        >

          <CheckCircle2 className="h-4 w-4 text-emerald-400" />

          <span className="text-xs text-emerald-400">

            LIVE

          </span>

        </div>

      </div>
            {/* Main Content */}

      <div className="flex flex-col items-center px-6 py-8">

        {/* Animated Emoji */}

        <motion.div
          key={emotion}
          initial={{
            scale: .7,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: .4,
          }}
          className={`
          flex
          h-32
          w-32
          items-center
          justify-center
          rounded-full
          bg-white/5
          text-6xl
          shadow-2xl
          ${current.glow}
          `}
        >

          {current.emoji}

        </motion.div>

        {/* Emotion */}

        <motion.h1
          key={emotion + "-text"}
          initial={{
            y: 10,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          className={`
          mt-8
          text-4xl
          font-black
          uppercase
          tracking-wide
          ${current.color}
          `}
        >

          {emotion}

        </motion.h1>

        <p className="mt-2 text-slate-400">

          Emotion detected by AI model

        </p>

        {/* Confidence Ring */}

        <div className="relative mt-10">

          <svg
            width="170"
            height="170"
            className="-rotate-90"
          >

            {/* Background */}

            <circle
              cx="85"
              cy="85"
              r="70"
              stroke="#1e293b"
              strokeWidth="12"
              fill="none"
            />

            {/* Progress */}

            <motion.circle
              cx="85"
              cy="85"
              r="70"
              stroke="url(#confidenceGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={440}
              animate={{
                strokeDashoffset:
                  440 -
                  (confidence / 100) * 440,
              }}
              transition={{
                duration: .8,
              }}
            />

            <defs>

              <linearGradient
                id="confidenceGradient"
              >
                <stop
                  offset="0%"
                  stopColor="#8b5cf6"
                />

                <stop
                  offset="100%"
                  stopColor="#06b6d4"
                />

              </linearGradient>

            </defs>

          </svg>

          <div
            className="
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
            "
          >

            <p className="text-xs text-slate-400">

              Confidence

            </p>

            <h2 className="mt-1 text-3xl font-black text-white">

              {confidence.toFixed(1)}%

            </h2>

          </div>

        </div>
      </div>

      {/* AI Insights */}

      

      {/* Footer Status */}

      
            {/* Bottom Accent */}

      <div
        className="
        h-px
        w-full
        bg-gradient-to-r
        from-transparent
        via-violet-500/60
        to-transparent
        "
      />

      {/* Background Glow */}

      <div
        className="
        pointer-events-none
        absolute
        -left-20
        top-20
        h-60
        w-60
        rounded-full
        bg-violet-600/10
        blur-[120px]
        "
      />

      <div
        className="
        pointer-events-none
        absolute
        -right-20
        bottom-16
        h-60
        w-60
        rounded-full
        bg-cyan-500/10
        blur-[120px]
        "
      />

    </motion.section>
  );
}