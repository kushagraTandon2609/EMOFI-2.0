import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  Camera,
  BarChart3,
  History,
  User,
  LogOut,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Detect Emotion",
    icon: Camera,
    path: "/dashboard",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    title: "History",
    icon: History,
    path: "/history",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
];

export default function Sidebar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside
      className="
      fixed
      left-0
      top-0
      z-50
      flex
      h-screen
      w-[290px]
      flex-col
      border-r
      border-slate-800
      bg-[#070B18]/90
      backdrop-blur-3xl
      "
    >
      {/* LOGO */}

      <div className="border-b border-slate-800 p-7">

        <motion.div
          whileHover={{
            scale: 1.04,
          }}
          className="flex items-center gap-4"
        >

          <div
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-violet-600
            via-fuchsia-500
            to-cyan-500
            shadow-lg
            "
          >

            <Sparkles className="h-7 w-7 text-white" />

          </div>

          <div>

            <h1 className="text-3xl font-black">

              EMOFI

            </h1>

            <p className="text-xs tracking-[4px] text-slate-500">

              EMOTION AI

            </p>

          </div>

        </motion.div>

      </div>

      {/* MENU */}

      <nav className="flex-1 space-y-2 px-5 py-8">
                {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `
                group
                relative
                flex
                items-center
                gap-4
                overflow-hidden
                rounded-2xl
                px-5
                py-4
                transition-all
                duration-300

                ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/10 text-white border border-violet-500/30 shadow-[0_0_25px_rgba(139,92,246,.18)]"
                    : "border border-transparent text-slate-400 hover:border-slate-700 hover:bg-white/5 hover:text-white"
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Bar */}

                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="
                      absolute
                      left-0
                      top-2
                      bottom-2
                      w-1
                      rounded-r-full
                      bg-gradient-to-b
                      from-violet-500
                      to-cyan-400
                      "
                    />
                  )}

                  {/* Icon */}

                  <div
                    className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/5
                    transition-all
                    group-hover:bg-violet-500/20
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title */}

                  <span className="text-[15px] font-medium tracking-wide">
                    {item.title}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* AI MODEL CARD */}

      <div className="px-5">
        <div
          className="
          rounded-2xl
          border
          border-slate-800
          bg-gradient-to-br
          from-violet-500/10
          to-cyan-500/5
          p-5
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

              <h3 className="font-semibold">

                AI Model

              </h3>

              <p className="text-sm text-slate-400">

                TensorFlow + MediaPipe

              </p>

            </div>

          </div>

          <div className="mt-5 flex items-center justify-between">

            <span className="text-sm text-slate-400">
              Status
            </span>

            <div className="flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-sm font-medium text-emerald-400">
                Online
              </span>

            </div>

          </div>

        </div>
      </div>
            {/* USER PROFILE */}

      <div className="mt-6 px-5">

        <div
          className="
          rounded-2xl
          border
          border-slate-800
          bg-white/5
          p-5
          backdrop-blur-xl
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-violet-600
              via-fuchsia-500
              to-cyan-500
              text-xl
              font-bold
              text-white
              "
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0 flex-1">

              <h3 className="truncate font-semibold text-white">

                {user?.name || "Guest User"}

              </h3>

              <p className="truncate text-sm text-slate-400">

                {user?.email || "guest@emofi.ai"}

              </p>

            </div>

          </div>

          <button
            onClick={logout}
            className="
            mt-6
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-3
            font-medium
            text-red-400
            transition-all
            duration-300
            hover:bg-red-500/20
            hover:text-red-300
            "
          >

            <LogOut className="h-5 w-5" />

            Logout

          </button>

        </div>

      </div>

      {/* FOOTER */}

      <div className="mt-auto border-t border-slate-800 px-6 py-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold text-white">

              EMOFI v2.0

            </p>

            <p className="text-xs text-slate-500">

              Emotion Intelligence Platform

            </p>

          </div>

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
            h-3
            w-3
            rounded-full
            bg-emerald-400
            shadow-[0_0_15px_rgba(74,222,128,.9)]
            "
          />

        </div>

      </div>
            {/* Background Glow */}

      <div
        className="
        pointer-events-none
        absolute
        -left-24
        top-32
        h-64
        w-64
        rounded-full
        bg-violet-600/10
        blur-[120px]
        "
      />

      <div
        className="
        pointer-events-none
        absolute
        -right-24
        bottom-24
        h-56
        w-56
        rounded-full
        bg-cyan-500/10
        blur-[120px]
        "
      />

    </aside>
  );
}