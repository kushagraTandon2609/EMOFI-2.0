import { motion } from "framer-motion";
import { Target } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ConfidenceData {
  date: string;
  confidence: number;
}

interface ConfidenceChartProps {
  data?: ConfidenceData[];
}

export default function ConfidenceChart({
  data = [],
}: ConfidenceChartProps) {
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
          bg-emerald-500/10
          "
        >
          <Target className="h-5 w-5 text-emerald-400" />
        </div>

        <div>

          <h2 className="text-xl font-bold text-white">
            Confidence Trend
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Track the confidence of your emotion predictions
          </p>

        </div>

      </div>

      {/* Chart */}

      <div className="mt-6 h-[320px]">

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

            <Target className="h-10 w-10 text-slate-600" />

            <p className="mt-4 text-sm font-medium text-slate-400">
              No confidence data yet
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Continue detecting emotions to build this chart.
            </p>

          </div>
        ) : (
                      <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >

              <defs>
                <linearGradient
                  id="confidenceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#10b981"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="100%"
                    stopColor="#10b981"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

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
                domain={[0, 100]}
                stroke="#64748b"
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
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
                formatter={(value) => [
                  `${value}%`,
                  "Confidence",
                ]}
              />

              <Area
                type="monotone"
                dataKey="confidence"
                name="Confidence"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#confidenceGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                }}
              />

            </AreaChart>
          </ResponsiveContainer>
        )}

      </div>

      {/* Footer */}

      {data.length > 0 && (
        <div className="mt-5 flex items-center justify-between">

          <span className="text-xs text-slate-500">
            Prediction confidence
          </span>

          <span className="text-sm font-semibold text-emerald-400">
            Live Data
          </span>

        </div>
      )}

    </motion.section>
  );
}