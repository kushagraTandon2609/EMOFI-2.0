import {
  LayoutDashboard,
  ChartColumn,
  History,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Analytics",
    icon: ChartColumn,
    path: "/analytics",
  },
  {
    title: "History",
    icon: History,
    path: "/history",
  },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{
        x: -30,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        sticky
        top-6
        flex
        h-[calc(100vh-48px)]
        w-[220px]
        flex-col
        rounded-3xl
        border
        border-slate-800
        bg-[#0b1220]/80
        backdrop-blur-3xl
        shadow-[0_20px_60px_rgba(0,0,0,.35)]
        overflow-hidden
      "
    >

      {/* ========================= */}
      {/* EMOFI LOGO */}
      {/* ========================= */}

      <div className="px-4 pt-5 pb-5">

        <div
          className="
            relative
            h-70
            w-full
            overflow-hidden
            rounded-3xl
            border
            border-violet-500/20
            bg-black
            shadow-[0_0_35px_rgba(139,92,246,0.18)]
          "
        >

          <img
            src="/emofi-logo.png"
            alt="EMOFI"
            className="
              h-full
              w-full
              object-cover
              object-center
            "
          />

          {/* Logo glow */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-violet-950/20
              via-transparent
              to-transparent
            "
          />

        </div>

      </div>


      {/* ========================= */}
      {/* DIVIDER */}
      {/* ========================= */}

      <div
        className="
          mx-6
          mb-6
          h-px
          bg-gradient-to-r
          from-transparent
          via-slate-700
          to-transparent
        "
      />


      {/* ========================= */}
      {/* NAVIGATION */}
      {/* ========================= */}

      <nav className="flex-1 space-y-2 px-4">

        {links.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
            >

              {({ isActive }) => (

                <motion.div
                  whileHover={{
                    x: 4,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    px-5
                    py-4
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >

                  <Icon
                    size={22}
                    className={`
                      transition-transform
                      duration-300

                      ${
                        isActive
                          ? "scale-110"
                          : "group-hover:scale-110"
                      }
                    `}
                  />

                  <span
                    className="
                      text-[15px]
                      font-semibold
                      tracking-wide
                    "
                  >
                    {item.title}
                  </span>

                </motion.div>

              )}

            </NavLink>
          );

        })}

      </nav>


      {/* ========================= */}
      {/* BOTTOM */}
      {/* ========================= */}

      <div className="px-6 pb-7">

        <div
          className="
            mb-5
            h-px
            bg-gradient-to-r
            from-transparent
            via-slate-700
            to-transparent
          "
        />

        <p
          className="
            text-center
            text-xs
            uppercase
            tracking-[0.25em]
            text-slate-600
          "
        >
          Version 2.0
        </p>

      </div>


      {/* ========================= */}
      {/* BACKGROUND GLOWS */}
      {/* ========================= */}

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-48
          w-48
          rounded-full
          bg-violet-600/10
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -right-24
          h-48
          w-48
          rounded-full
          bg-cyan-500/10
          blur-[120px]
        "
      />

    </motion.aside>
  );
}