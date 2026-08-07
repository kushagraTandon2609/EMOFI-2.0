import { useEffect, useState } from "react";
import {
  Bell,
  BrainCircuit,
  Search,
} from "lucide-react";

import { motion } from "framer-motion";

export default function Topbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hour = time.getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const currentDate = time.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      className="
      sticky
      top-0
      z-40
      border-b
      border-slate-800
      bg-[#050816]/90
      backdrop-blur-3xl
      "
    >
      <div
        className="
        flex
        items-center
        justify-between
        px-8
        py-6
        "
      >
        {/* LEFT */}

        <div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
            text-3xl
            font-black
            text-white
            "
          >
            {greeting},{" "}
            <span
              className="
              bg-gradient-to-r
              from-violet-400
              to-cyan-400
              bg-clip-text
              text-transparent
              "
            >
              {user?.name || "User"}
            </span>
            👋
          </motion.h1>

          <p className="mt-1 text-slate-400">
            {currentDate}
          </p>

        </div>
                {/* RIGHT */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="relative hidden lg:block">

            <Search
              className="
              absolute
              left-4
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-slate-500
              "
            />

            <input
              type="text"
              placeholder="Search history, emotions..."
              className="
              h-12
              w-[320px]
              rounded-2xl
              border
              border-slate-700
              bg-white/5
              pl-11
              pr-4
              text-sm
              text-white
              outline-none
              transition-all
              placeholder:text-slate-500
              focus:border-violet-500
              focus:bg-white/10
              "
            />

          </div>

          {/* AI Status */}

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-emerald-500/20
            bg-emerald-500/10
            px-4
            py-3
            "
          >

            <BrainCircuit className="h-5 w-5 text-emerald-400" />

            <div>

              <p className="text-xs text-slate-400">
                AI Status
              </p>

              <div className="flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

                <span className="text-sm font-semibold text-emerald-400">
                  Online
                </span>

              </div>

            </div>

          </motion.div>

          {/* Notification */}

          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: .95,
            }}
            className="
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-700
            bg-white/5
            transition-all
            hover:border-violet-500
            hover:bg-violet-500/10
            "
          >

            <Bell className="h-5 w-5 text-white" />

            <span
              className="
              absolute
              right-3
              top-3
              h-2.5
              w-2.5
              rounded-full
              bg-red-500
              "
            />

          </motion.button>
                    {/* Live Clock */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
            hidden
            xl:flex
            flex-col
            items-end
            rounded-2xl
            border
            border-slate-700
            bg-white/5
            px-5
            py-3
            "
          >

            <span className="text-xs text-slate-500">
              Local Time
            </span>

            <span className="font-semibold tracking-wide text-white">
              {time.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>

          </motion.div>

          {/* User */}

          <motion.div
            whileHover={{
              scale: 1.04,
            }}
            className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-slate-700
            bg-white/5
            px-3
            py-2
            transition-all
            hover:border-violet-500/40
            "
          >

            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-violet-600
              via-fuchsia-500
              to-cyan-500
              text-lg
              font-bold
              text-white
              shadow-lg
              "
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="hidden md:block">

              <p className="font-semibold text-white">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-slate-400">
                AI Explorer
              </p>

            </div>

          </motion.div>

        </div>

      </div>
            {/* Bottom Gradient */}

      <div
        className="
        absolute
        bottom-0
        left-0
        h-px
        w-full
        bg-gradient-to-r
        from-transparent
        via-violet-500/50
        to-transparent
        "
      />

      {/* Background Glow */}

      <div
        className="
        pointer-events-none
        absolute
        -left-24
        top-0
        h-40
        w-40
        rounded-full
        bg-violet-600/10
        blur-[100px]
        "
      />

      <div
        className="
        pointer-events-none
        absolute
        right-0
        top-0
        h-40
        w-40
        rounded-full
        bg-cyan-500/10
        blur-[100px]
        "
      />

    </header>
  );
}