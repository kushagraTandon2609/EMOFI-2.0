import { motion } from "framer-motion";
import {
  Music4,
  Play,
  ExternalLink,
} from "lucide-react";

interface Song {
  title: string;
  artist: string;
  youtube: string;
}

interface RecommendationCardProps {
  songs: Song[];
}

export default function RecommendationCard({
  songs,
}: RecommendationCardProps) {

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
      className="
      overflow-hidden
      rounded-2xl
      border
      border-slate-800
      bg-white/5
      backdrop-blur-3xl
      "
    >

      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between
        border-b
        border-slate-800
        px-6
        py-5
        "
      >

        <div className="flex items-center gap-4">

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

            <Music4 className="h-6 w-6 text-white" />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              AI Recommendations
            </h2>

            <p className="text-sm text-slate-400">
              Personalized music based on detected emotion
            </p>

          </div>

        </div>

        <div
          className="
          rounded-full
          border
          border-violet-500/20
          bg-violet-500/10
          px-4
          py-2
          "
        >

          <span className="text-xs text-violet-300">

            {songs.length} Songs

          </span>

        </div>

      </div>
            {/* Content */}

      <div className="p-6">

        {songs.length === 0 ? (

          <div
            className="
            flex
            min-h-[340px]
            flex-col
            items-center
            justify-center
            text-center
            "
          >

            <div
              className="
              flex
              h-28
              w-28
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-violet-600/20
              to-cyan-500/20
              "
            >

              <Music4 className="h-12 w-12 text-violet-400" />

            </div>

            <h3 className="mt-8 text-2xl font-bold text-white">

              No Recommendations Yet

            </h3>

            <p
              className="
              mt-3
              max-w-sm
              leading-7
              text-slate-400
              "
            >

              Start emotion detection to receive
              personalized AI music recommendations.

            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {songs.map((song, index) => (

              <motion.div
                key={song.youtube}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * .08,
                }}
                whileHover={{
                  y: -3,
                }}
                className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-700
                bg-white/5
                p-5
                backdrop-blur-xl
                transition-all
                hover:border-violet-500/30
                hover:bg-white/10
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
                    rounded-xl
                    bg-gradient-to-br
                    from-violet-600
                    to-cyan-500
                    "
                  >

                    <Music4 className="h-7 w-7 text-white" />

                  </div>

                  <div>

                    <h3 className="font-semibold text-white">

                      {song.title}

                    </h3>

                    <p className="mt-1 text-sm text-slate-400">

                      {song.artist}

                    </p>

                  </div>

                </div>
                                {/* Actions */}

                <div className="flex items-center gap-3">

                  {/* AI Badge */}

                  <div
                    className="
                    hidden
                    rounded-full
                    border
                    border-cyan-500/20
                    bg-cyan-500/10
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-cyan-300
                    md:block
                    "
                  >
                    AI Pick
                  </div>

                  {/* Play Button */}

                  <motion.a
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: .96,
                    }}
                    href={song.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-r
                    from-violet-600
                    to-cyan-500
                    text-white
                    shadow-lg
                    shadow-violet-500/20
                    "
                  >

                    <Play
                      size={20}
                      fill="white"
                    />

                  </motion.a>

                  {/* External Link */}

                  <motion.a
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: .96,
                    }}
                    href={song.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-700
                    bg-white/5
                    text-slate-300
                    transition
                    hover:border-violet-500/30
                    hover:text-white
                    "
                  >

                    <ExternalLink
                      size={18}
                    />

                  </motion.a>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>

      {/* Footer */}

      <div
        className="
        flex
        items-center
        justify-between
        border-t
        border-slate-800
        px-6
        py-5
        "
      >

        <div>

          <p className="text-sm text-slate-400">

            Recommendation Engine

          </p>

          <h3 className="mt-1 font-semibold text-white">

            Emotion → Music Matching

          </h3>

        </div>

        <div
          className="
          rounded-xl
          border
          border-violet-500/20
          bg-violet-500/10
          px-4
          py-2
          "
        >

          <span className="text-sm font-medium text-violet-300">

            Powered by AI

          </span>

        </div>

      </div>
            {/* Bottom Accent */}

      <div
        className="
        h-px
        w-full
        bg-gradient-to-r
        from-transparent
        via-violet-500/60
        to-transparent
        "
      />

      {/* Background Glow */}

      <div
        className="
        pointer-events-none
        absolute
        -left-20
        top-24
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
        -right-20
        bottom-12
        h-64
        w-64
        rounded-full
        bg-cyan-500/10
        blur-[120px]
        "
      />

    </motion.section>
  );
}