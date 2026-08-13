import { useEffect, useState } from "react";
import {
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Topbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        justify-end
        gap-5
        px-8
        py-5
        "
      >

        

        <motion.div
  initial={{
    opacity: 0,
    x: -20,
  }}
  animate={{
    opacity: 1,
    x: 0,
  }}
  className="flex-1"
>
  <h3
    className="
    bg-gradient-to-r
    from-violet-400
    via-fuchsia-400
    to-cyan-400
    bg-clip-text
    text-3xl
    font-black
    tracking-tight
    text-transparent
    lg:text-5xl
    "
  >
    Emotion Intelligence Dashboard
  </h3>

  <p className="mt-2 text-sm text-slate-400">
    Real-time AI-powered emotion recognition and personalized music recommendations
  </p>
</motion.div>

        {/* Time */}

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="
          hidden
          md:flex
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

            Time

          </span>

          <span className="font-semibold tracking-wide text-white">

            {time.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}

          </span>

        </motion.div>
                {/* User Profile */}

        <div className="relative">

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() => setOpen(!open)}
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
              h-11
              w-11
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
              "
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="hidden lg:block text-left">

              <p className="font-semibold text-white">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-slate-400">
                {user?.email || ""}
              </p>

            </div>

            <ChevronDown
              className={`
              h-5
              w-5
              text-slate-400
              transition-transform
              ${open ? "rotate-180" : ""}
              `}
            />

          </motion.button>

          {/* Dropdown */}

          {open && (

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
              absolute
              right-0
              mt-3
              w-60
              overflow-hidden
              rounded-2xl
              border
              border-slate-700
              bg-[#0b1220]
              shadow-2xl
              "
            >

              <div className="border-b border-slate-700 p-4">

                <p className="font-semibold text-white">
                  {user?.name}
                </p>

                

              </div>

              <button
              onClick={() => {
                  
                  window.location.href = "/profile";
                }}
                className="
                flex
                w-full
                items-center
                gap-3
                px-5
                py-4
                text-white
                transition
                hover:bg-white/5
                "
              >

                <User className="h-5 w-5" />

                Profile

              </button>
                            <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
                className="
                flex
                w-full
                items-center
                gap-3
                px-5
                py-4
                text-red-400
                transition
                hover:bg-red-500/10
                "
              >

                <LogOut className="h-5 w-5" />

                Logout

              </button>

            </motion.div>

          )}

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