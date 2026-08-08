import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MoodTrendData {
  date: string;
  happy: number;
  sad: number;
  angry: number;
  surprise: number;
}

interface MoodTrendChartProps {
  data?: MoodTrendData[];
}

export default function MoodTrendChart({
  data = [],
}: MoodTrendChartProps) {
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

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-cyan-500/10
            "
          >
            <TrendingUp className="h-5 w-5 text-cyan-400" />
          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              Mood Trend
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track how your emotions change over time
            </p>

          </div>

        </div>

      </div>

      {/* Chart */}

      <div className="mt-6 h-[340px]">

        {data.length === 0 ? (
          <div
            className="
            flex
            h-full
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-700
            "
          >

            <TrendingUp className="h-10 w-10 text-slate-600" />

            <p className="mt-4 text-sm font-medium text-slate-400">
              No mood trend data yet
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Continue using EMOFI to build your mood timeline.
            </p>

          </div>
        ) : (
                      <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                stroke="#64748b"
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                stroke="#64748b"
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b1220",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                labelStyle={{
                  color: "#94a3b8",
                  marginBottom: "6px",
                }}
              />

              <Line
                type="monotone"
                dataKey="happy"
                name="Happy"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                }}
              />

              <Line
                type="monotone"
                dataKey="sad"
                name="Sad"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                }}
              />

              <Line
                type="monotone"
                dataKey="angry"
                name="Angry"
                stroke="#f97316"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                }}
              />

              <Line
                type="monotone"
                dataKey="surprise"
                name="Surprise"
                stroke="#ec4899"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                }}
              />

            </LineChart>
          </ResponsiveContainer>
        )}

      </div>

      {/* Legend */}

      <div className="mt-5 flex flex-wrap justify-center gap-x-7 gap-y-3">

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
          <span className="text-sm text-slate-400">
            Happy
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
          <span className="text-sm text-slate-400">
            Sad
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
          <span className="text-sm text-slate-400">
            Angry
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />
          <span className="text-sm text-slate-400">
            Surprise
          </span>
        </div>

      </div>

    </motion.section>
  );
}