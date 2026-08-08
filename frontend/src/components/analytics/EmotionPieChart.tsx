import { motion } from "framer-motion";
import { PieChart as PieChartIcon } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface EmotionData {
  emotion: string;
  count: number;
}

interface EmotionPieChartProps {
  data?: EmotionData[];
}

export default function EmotionPieChart({
  data = [],
}: EmotionPieChartProps) {
  const chartData = data.map((item) => ({
    name: item.emotion,
    value: item.count,
  }));

  const COLORS = [
    "#8b5cf6",
    "#06b6d4",
    "#ec4899",
    "#10b981",
    "#f97316",
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
            bg-violet-500/10
            "
          >
            <PieChartIcon className="h-5 w-5 text-violet-400" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Emotion Distribution
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Breakdown of your detected emotions
            </p>
          </div>

        </div>

      </div>

      {/* Chart */}
            <div className="mt-6 h-[320px]">

        {chartData.length === 0 ? (
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

            <PieChartIcon className="h-10 w-10 text-slate-600" />

            <p className="mt-4 text-sm font-medium text-slate-400">
              No emotion data yet
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Start detecting emotions to build your analytics.
            </p>

          </div>
        ) : (

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={115}
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
                stroke="none"
              >

                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b1220",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                formatter={(value, name) => [
                  value,
                  name,
                ]}
              />

            </PieChart>

          </ResponsiveContainer>

        )}

      </div>

      {/* Legend */}

      {chartData.length > 0 && (
        <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3">

          {chartData.map((item, index) => (

            <div
              key={item.name}
              className="flex items-center gap-2"
            >

              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor:
                    COLORS[index % COLORS.length],
                }}
              />

              <span className="text-sm text-slate-400">
                {item.name}
              </span>

              <span className="text-sm font-semibold text-white">
                {item.value}
              </span>

            </div>

          ))}

        </div>
      )}

    </motion.section>
  );
}