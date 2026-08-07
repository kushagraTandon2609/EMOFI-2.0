import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDashboardStats } from "../../services/dashboard";
import {
  Activity,
  Clock3,
  BarChart3,
  SmilePlus,
} from "lucide-react";

interface DashboardStats {
  todayDetections: number;
  mostCommonEmotion: string | null;
  averageConfidence: number | null;
  lastDetection: string | null;
}

export default function WelcomeBanner() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [stats, setStats] = useState<DashboardStats>({
    todayDetections: 0,
    mostCommonEmotion: null,
    averageConfidence: null,
    lastDetection: null,
  });

  // Backend API will be connected here
  useEffect(() => {
  const loadStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.stats);
    } catch (e) {
      console.error(e);
    }
  };

  loadStats();
}, []);

  

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-800
      bg-white/5
      p-8
      backdrop-blur-3xl
      "
    >

      {/* Background Glow */}

      <div
        className="
        absolute
        -right-28
        -top-28
        h-80
        w-80
        rounded-full
        bg-violet-600/10
        blur-[150px]
        "
      />

      <div
        className="
        absolute
        -left-28
        -bottom-28
        h-80
        w-80
        rounded-full
        bg-cyan-500/10
        blur-[150px]
        "
      />

      <div className="relative z-10">

        

        <h1
          className="
          mt-6
          max-w-4xl
          text-5xl
          font-black
          leading-tight
          text-white
          "
        >

          Welcome

          <span
            className="
            bg-gradient-to-r
            from-violet-400
            via-fuchsia-400
            to-cyan-400
            bg-clip-text
            text-transparent
            "
          >
            {" "}
            {user?.name || "User"}
          </span>

          👋

        </h1>

        <p
          className="
          mt-6
          max-w-3xl
          text-lg
          leading-8
          text-slate-400
          "
        >
          Detect emotions in real time, discover mood-based
          playlists, monitor your emotion history, and explore
          personalized AI insights—all in one place.
        </p>

      
                {/* Dashboard Stats */}

        <div
          className="
          mt-14
          grid
          gap-5
          md:grid-cols-2
          xl:grid-cols-4
          "
        >

          {[
            {
              icon: Activity,
              value: stats.todayDetections,
              label: "Today's Detections",
              color: "from-violet-600 to-fuchsia-500",
            },
            {
              icon: SmilePlus,
              value:
                stats.mostCommonEmotion || "No Data",
              label: "Most Common Emotion",
              color: "from-cyan-500 to-blue-500",
            },
            {
              icon: BarChart3,
              value:
                stats.averageConfidence !== null
                  ? `${stats.averageConfidence}%`
                  : "No Data",
              label: "Average Confidence",
              color: "from-emerald-500 to-teal-500",
            },
            {
              icon: Clock3,
              value:
                stats.lastDetection || "No Data",
              label: "Last Detection",
              color: "from-orange-500 to-pink-500",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                group
                rounded-2xl
                border
                border-slate-700
                bg-white/5
                p-6
                backdrop-blur-xl
                transition-all
                hover:border-violet-500/30
                hover:bg-white/10
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
                    ${item.color}
                    shadow-lg
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
                    text-xs
                    font-medium
                    text-emerald-400
                    "
                  >
                    LIVE
                  </span>

                </div>

                <h2
                  className="
                  mt-7
                  text-3xl
                  font-black
                  text-white
                  transition-all
                  group-hover:text-violet-300
                  "
                >
                  {item.value}
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  {item.label}
                </p>

              </motion.div>
            );
          })}

        </div>
                {/* AI Tip */}

        

      </div>

      {/* Bottom Accent */}

      <div
        className="
        absolute
        bottom-0
        left-0
        h-px
        w-full
        bg-gradient-to-r
        from-transparent
        via-violet-500/60
        to-transparent
        "
      />

    </motion.section>
  );
}