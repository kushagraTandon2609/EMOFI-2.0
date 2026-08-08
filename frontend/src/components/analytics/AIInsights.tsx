import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  Clock3,
  Smile,
  Target,
} from "lucide-react";

interface AIInsightsProps {
  mostCommonEmotion?: string | null;
  averageConfidence?: number | null;
  totalDetections?: number;
  activeDays?: number;
}

export default function AIInsights({
  mostCommonEmotion,
  averageConfidence,
  totalDetections = 0,
  activeDays = 0,
}: AIInsightsProps) {
  const hasData =
    totalDetections > 0 ||
    mostCommonEmotion !== null ||
    averageConfidence !== null;

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
      overflow-hidden
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
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-gradient-to-br
          from-violet-600
          to-cyan-500
          shadow-lg
          shadow-violet-500/20
          "
        >
          <BrainCircuit className="h-6 w-6 text-white" />
        </div>

        <div>

          <div className="flex items-center gap-2">

            <h2 className="text-xl font-bold text-white">
              AI Insights
            </h2>

            <Sparkles className="h-4 w-4 text-violet-400" />

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Personalized insights based on your emotion activity
          </p>

        </div>

      </div>

      {/* Empty State */}

      {!hasData ? (

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

          <BrainCircuit className="mx-auto h-10 w-10 text-slate-600" />

          <p className="mt-4 font-medium text-slate-400">
            Your AI insights will appear here
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Start detecting emotions to give EMOFI enough
            data to understand your activity.
          </p>

        </div>

      ) : (
                <div className="mt-7 grid gap-4 md:grid-cols-2">

          {/* Dominant Emotion */}

          <div
            className="
            rounded-2xl
            border
            border-slate-800
            bg-white/5
            p-5
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-violet-500/10
                "
              >
                <Smile className="h-5 w-5 text-violet-400" />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Dominant Emotion
                </p>

                <p className="mt-1 text-lg font-bold text-white">
                  {mostCommonEmotion || "Not enough data"}
                </p>
              </div>

            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              This is the emotion detected most frequently
              across your recorded activity.
            </p>

          </div>

          {/* Confidence */}

          <div
            className="
            rounded-2xl
            border
            border-slate-800
            bg-white/5
            p-5
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/10
                "
              >
                <Target className="h-5 w-5 text-emerald-400" />
              </div>

              <div>

                <p className="text-xs text-slate-500">
                  Detection Confidence
                </p>

                <p className="mt-1 text-lg font-bold text-white">
                  {averageConfidence !== null &&
                  averageConfidence !== undefined
                    ? `${averageConfidence}%`
                    : "--"}
                </p>

              </div>

            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Average confidence across your recorded
              emotion predictions.
            </p>

          </div>

          {/* Activity */}

          <div
            className="
            rounded-2xl
            border
            border-slate-800
            bg-white/5
            p-5
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-cyan-500/10
                "
              >
                <TrendingUp className="h-5 w-5 text-cyan-400" />
              </div>

              <div>

                <p className="text-xs text-slate-500">
                  Detection Activity
                </p>

                <p className="mt-1 text-lg font-bold text-white">
                  {totalDetections} detections
                </p>

              </div>

            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              You have recorded {totalDetections} emotion
              detection{totalDetections === 1 ? "" : "s"} so far.
            </p>

          </div>

          {/* Active Days */}

          <div
            className="
            rounded-2xl
            border
            border-slate-800
            bg-white/5
            p-5
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-orange-500/10
                "
              >
                <Clock3 className="h-5 w-5 text-orange-400" />
              </div>

              <div>

                <p className="text-xs text-slate-500">
                  Active Days
                </p>

                <p className="mt-1 text-lg font-bold text-white">
                  {activeDays} days
                </p>

              </div>

            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Number of days where EMOFI recorded at least
              one emotion detection.
            </p>

          </div>

        </div>

      )}

    </motion.section>
  );
}