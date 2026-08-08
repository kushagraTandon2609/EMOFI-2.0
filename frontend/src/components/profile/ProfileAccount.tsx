import { motion } from "framer-motion";
import {
  Mail,
  UserRound,
  ShieldCheck,
  KeyRound,
} from "lucide-react";

interface ProfileAccountProps {
  name: string;
  email: string;
}

export default function ProfileAccount({
  name,
  email,
}: ProfileAccountProps) {
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
          bg-violet-500/10
          "
        >
          <UserRound className="h-5 w-5 text-violet-400" />
        </div>

        <div>

          <h2 className="text-xl font-bold text-white">
            Account Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your EMOFI account details
          </p>

        </div>

      </div>

      {/* Account Details */}

      <div className="mt-7 grid gap-4 md:grid-cols-2">

        {/* Name */}

        <div
          className="
          rounded-2xl
          border
          border-slate-800
          bg-white/[0.03]
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
              <UserRound className="h-5 w-5 text-cyan-400" />
            </div>

            <div className="min-w-0">

              <p className="text-xs text-slate-500">
                Full Name
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-white">
                {name || "—"}
              </p>

            </div>

          </div>

        </div>

        {/* Email */}

        <div
          className="
          rounded-2xl
          border
          border-slate-800
          bg-white/[0.03]
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
              <Mail className="h-5 w-5 text-violet-400" />
            </div>

            <div className="min-w-0">
                              <p className="text-xs text-slate-500">
                Email Address
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-white">
                {email || "—"}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Account Status */}

      <div
        className="
        mt-5
        grid
        gap-4
        md:grid-cols-2
        "
      >

        {/* Security */}

        <div
          className="
          flex
          items-center
          gap-4
          rounded-2xl
          border
          border-emerald-500/10
          bg-emerald-500/[0.04]
          p-5
          "
        >

          <div
            className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-emerald-500/10
            "
          >
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
          </div>

          <div>

            <p className="text-sm font-semibold text-white">
              Account Protected
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Your account is secured with authentication.
            </p>

          </div>

        </div>

        {/* Authentication */}

        <div
          className="
          flex
          items-center
          gap-4
          rounded-2xl
          border
          border-violet-500/10
          bg-violet-500/[0.04]
          p-5
          "
        >

          <div
            className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-violet-500/10
            "
          >
            <KeyRound className="h-5 w-5 text-violet-400" />
          </div>

          <div>

            <p className="text-sm font-semibold text-white">
              Secure Authentication
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Your sessions are protected by JWT authentication.
            </p>

          </div>

        </div>

      </div>

    </motion.section>
  );
}