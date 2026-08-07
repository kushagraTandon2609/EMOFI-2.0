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
      "
    >

      {/* Logo */}

      <div className="px-7 pt-8 pb-7">

        <div className="flex items-center gap-3">

          <div
            className="
            h-11
            w-11
            rounded-2xl
            bg-gradient-to-br
            from-violet-600
            via-fuchsia-500
            to-cyan-500
            "
          />

          <div>

            <h2 className="text-xl font-black text-white">
              EMOFI
            </h2>

            <p className="text-xs text-slate-500">
              Emotion Intelligence
            </p>

          </div>

        </div>

      </div>

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

      {/* Navigation */}

      <nav className="flex-1 px-4 space-y-2">
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
            {/* Bottom */}

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
          tracking-[0.25em]
          uppercase
          text-slate-600
          "
        >
          Version 2.0
        </p>

      </div>

      {/* Background Glow */}

      <div
        className="
        pointer-events-none
        absolute
        -top-24
        -left-24
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