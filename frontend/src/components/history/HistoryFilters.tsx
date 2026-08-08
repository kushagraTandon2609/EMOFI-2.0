import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Trash2,
  ChevronDown,
} from "lucide-react";

interface HistoryFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  emotion: string;
  onEmotionChange: (value: string) => void;

  onDeleteAll: () => void;
}

export default function HistoryFilters({
  search,
  onSearchChange,
  emotion,
  onEmotionChange,
  onDeleteAll,
}: HistoryFiltersProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  const emotions = [
    "all",
    "happy",
    "sad",
    "angry",
    "surprise",
  ];

  return (
    <div className="mt-8">

      {/* Filters */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex flex-1 flex-col gap-4 sm:flex-row">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              className="
              absolute
              left-4
              top-1/2
              h-5
              w-5
              -translate-y-1/2
              text-slate-500
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              placeholder="Search emotion history..."
              className="
              h-12
              w-full
              rounded-2xl
              border
              border-slate-800
              bg-white/5
              pl-12
              pr-4
              text-sm
              text-white
              outline-none
              backdrop-blur-xl
              transition-all
              placeholder:text-slate-600
              focus:border-violet-500/50
              focus:bg-white/[0.07]
              "
            />

          </div>

          {/* Emotion Filter */}

          <div className="relative">

            <SlidersHorizontal
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

            <select
              value={emotion}
              onChange={(e) =>
                onEmotionChange(e.target.value)
              }
              className="
              h-12
              w-full
              appearance-none
              rounded-2xl
              border
              border-slate-800
              bg-slate-900
              pl-11
              pr-10
              text-sm
              capitalize
              text-white
              outline-none
              transition-all
              focus:border-violet-500/50
              sm:w-48
              "
            >
              {emotions.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "all"
                    ? "All Emotions"
                    : item}
                </option>
              ))}
            </select>

            <ChevronDown
              className="
              pointer-events-none
              absolute
              right-4
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-slate-500
              "
            />

          </div>

        </div>
                {/* Delete All */}

        <div className="relative">

          <motion.button
            type="button"
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() =>
              setShowDeleteConfirm(
                !showDeleteConfirm
              )
            }
            className="
            flex
            h-12
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            px-5
            text-sm
            font-medium
            text-red-400
            transition-all
            hover:border-red-500/40
            hover:bg-red-500/15
            "
          >

            <Trash2 className="h-4 w-4" />

            Delete All

          </motion.button>

          {/* Confirmation */}

          {showDeleteConfirm && (
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
              absolute
              right-0
              top-14
              z-50
              w-72
              rounded-2xl
              border
              border-slate-700
              bg-slate-950
              p-5
              shadow-2xl
              "
            >

              <p className="text-sm font-semibold text-white">
                Delete all history?
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                This will permanently remove all of your
                recorded emotion detections.
              </p>

              <div className="mt-4 flex gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowDeleteConfirm(false)
                  }
                  className="
                  flex-1
                  rounded-xl
                  border
                  border-slate-700
                  bg-white/5
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-slate-300
                  transition
                  hover:bg-white/10
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    onDeleteAll();
                  }}
                  className="
                  flex-1
                  rounded-xl
                  bg-red-500/90
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-500
                  "
                >
                  Delete
                </button>

              </div>

            </motion.div>
          )}

        </div>

      </div>

    </div>
  );
}