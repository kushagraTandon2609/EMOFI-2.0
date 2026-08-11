import { motion } from "framer-motion";

import {
  Music4,
  Play,
  Sparkles,
  Flame,
  Heart,
  Dumbbell,
  Guitar,
  Mic2,
  Moon,
  WandSparkles,
  PartyPopperIcon,
  Compass,
} from "lucide-react";

import { useEffect, useState } from "react";

import api from "../../services/api";

import MusicPlayer from "./MusicPlayer";


interface Song {
  title: string;
  artist: string;
  youtube?: string;
  youtubeId?: string;
  emotion?: string;
  category?: string;
}


interface RecommendationCardProps {
  songs: Song[];

  emotion?: string;

  categories?: string[];

  onCategoryChange?: (
    category: string,
    songs: Song[]
  ) => void;
}


/* =====================================================
   CATEGORY ICONS
===================================================== */

const categoryIcons: Record<
  string,
  typeof Music4
> = {

  /* Happy */

  party:
    PartyPopperIcon,

  chill:
    Moon,

  romantic:
    Heart,

  motivational:
    Dumbbell,


  /* Sad */

  heartbreak:
    Heart,

  lonely:
    Moon,

  slow:
    Music4,

  lofi:
    Sparkles,


  /* Angry */

  gym:
    Dumbbell,

  rock:
    Guitar,

  metal:
    Flame,

  rap:
    Mic2,


  /* Surprise */

  energetic:
    Sparkles,

  adventure:
    Compass,

  feel_good:
    WandSparkles,
};


/* =====================================================
   CATEGORY COLORS
===================================================== */

const categoryColors: Record<
  string,
  string
> = {

  /* Happy */

  party:
    "from-fuchsia-500 to-violet-600",

  chill:
    "from-cyan-400 to-blue-600",

  romantic:
    "from-pink-500 to-rose-500",

  motivational:
    "from-orange-400 to-red-500",


  /* Sad */

  heartbreak:
    "from-rose-500 to-purple-600",

  lonely:
    "from-slate-500 to-blue-600",

  slow:
    "from-blue-500 to-indigo-600",

  lofi:
    "from-violet-500 to-purple-700",


  /* Angry */

  gym:
    "from-orange-400 to-red-600",

  rock:
    "from-red-500 to-orange-600",

  metal:
    "from-slate-400 to-slate-700",

  rap:
    "from-yellow-400 to-orange-600",


  /* Surprise */

  energetic:
    "from-yellow-400 to-orange-500",

  adventure:
    "from-emerald-400 to-cyan-500",

  feel_good:
    "from-cyan-400 to-emerald-500",
};


/* =====================================================
   FORMAT CATEGORY NAME
===================================================== */

function formatCategory(
  category: string
) {
  return category
    .replaceAll("_", " ")
    .replace(
      /\b\w/g,
      (char) =>
        char.toUpperCase()
    );
}


/* =====================================================
   COMPONENT
===================================================== */

export default function RecommendationCard({
  songs,
  emotion = "",
  categories = [],
  onCategoryChange,
}: RecommendationCardProps) {

  const [
    activeCategory,
    setActiveCategory,
  ] = useState<string | null>(null);


  const [
    displayedSongs,
    setDisplayedSongs,
  ] = useState<Song[]>(songs);


  const [
    selectedSong,
    setSelectedSong,
  ] = useState<Song | null>(null);


  const [
    currentIndex,
    setCurrentIndex,
  ] = useState<number>(0);


  const [
    loading,
    setLoading,
  ] = useState(false);


  /* =====================================================
     UPDATE SONGS WHEN PREDICTION CHANGES
  ===================================================== */

  useEffect(() => {

    setDisplayedSongs(songs);

  }, [songs]);


  /* =====================================================
     RESET + AUTO SELECT FIRST CATEGORY
  ===================================================== */

  useEffect(() => {

    /*
     * Completely reset current player
     * whenever a new emotion is detected.
     */

    setSelectedSong(null);

    setCurrentIndex(0);

    setDisplayedSongs([]);


    /*
     * No emotion / no categories
     */

    if (
      !emotion ||
      emotion === "Waiting..." ||
      categories.length === 0
    ) {

      setActiveCategory(null);

      /*
       * Keep original songs if available.
       */

      if (
        emotion &&
        categories.length === 0
      ) {
        setDisplayedSongs(songs);
      }

      return;
    }


    /*
     * IMPORTANT:
     *
     * First category becomes active
     * automatically.
     */

    const firstCategory =
      categories[0];

    setActiveCategory(
      firstCategory
    );


    /*
     * Load first category automatically.
     */

    loadCategory(
      firstCategory
    );


  }, [
    emotion,
    categories,
  ]);


  /* =====================================================
     LOAD CATEGORY SONGS
  ===================================================== */

  const loadCategory = async (
    category: string
  ) => {

    if (!emotion) {
      return;
    }


    /*
     * VERY IMPORTANT:
     *
     * Kill old player immediately.
     */

    setSelectedSong(null);

    setCurrentIndex(0);


    /*
     * Highlight new category.
     */

    setActiveCategory(
      category
    );


    setLoading(true);


    try {

      const response =
        await api.get(
          "/recommendations",
          {
            params: {
              emotion,
              category,
            },
          }
        );


      if (
        response.data?.success
      ) {

        const newSongs =
          response.data.songs || [];


        /*
         * Replace old songs.
         */

        setDisplayedSongs(
          newSongs
        );


        /*
         * Always start index
         * from zero for a new
         * category.
         */

        setCurrentIndex(0);


        /*
         * Ensure old song is gone.
         */

        setSelectedSong(null);


        /*
         * Optional callback.
         */

        onCategoryChange?.(
          category,
          newSongs
        );

      } else {

        setDisplayedSongs([]);

      }

    } catch (error) {

      console.error(
        "Failed to load recommendations:",
        error
      );

      setDisplayedSongs([]);

    } finally {

      setLoading(false);

    }

  };


  /* =====================================================
     CATEGORY CLICK
  ===================================================== */

  const handleCategory = (
    category: string
  ) => {

    /*
     * Same category:
     * don't unnecessarily reload.
     */

    if (
      category === activeCategory &&
      !loading
    ) {
      return;
    }


    loadCategory(
      category
    );

  };


  /* =====================================================
     SONG CLICK
  ===================================================== */

  const handleSongClick = (
    song: Song,
    index: number
  ) => {

    /*
     * Important:
     *
     * Set index BEFORE song.
     */

    setCurrentIndex(
      index
    );


    /*
     * Selecting a new song
     * causes MusicPlayer to
     * receive a new key.
     */

    setSelectedSong(
      song
    );

  };


  /* =====================================================
     NEXT SONG
  ===================================================== */

  const handleNext = () => {

    if (
      currentIndex >=
      displayedSongs.length - 1
    ) {
      return;
    }


    const nextIndex =
      currentIndex + 1;


    setCurrentIndex(
      nextIndex
    );


    setSelectedSong(
      displayedSongs[
        nextIndex
      ]
    );

  };


  /* =====================================================
     PREVIOUS SONG
  ===================================================== */

  const handlePrevious = () => {

    if (
      currentIndex <= 0
    ) {
      return;
    }


    const previousIndex =
      currentIndex - 1;


    setCurrentIndex(
      previousIndex
    );


    setSelectedSong(
      displayedSongs[
        previousIndex
      ]
    );

  };


  /* =====================================================
     CLOSE PLAYER
  ===================================================== */

  const handleClosePlayer = () => {

    setSelectedSong(
      null
    );

    setCurrentIndex(0);

  };


  /* =====================================================
     UI
  ===================================================== */

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
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-white/[0.035]
        backdrop-blur-3xl
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          border-b
          border-slate-800
          px-6
          py-6
        "
      >

        <div
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* Title */}

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

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
                shadow-lg
                shadow-violet-500/10
              "
            >

              <Music4
                className="
                  h-6
                  w-6
                  text-white
                "
              />

            </div>


            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-white
                "
              >
                AI Recommendations
              </h2>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Music selected for your current mood
              </p>

            </div>

          </div>


          {/* Current Emotion */}

          {emotion &&
            emotion !== "Waiting..." && (

            <div
              className="
                flex
                items-center
                gap-2
                self-start
                rounded-full
                border
                border-violet-500/20
                bg-violet-500/10
                px-4
                py-2
              "
            >

              <Sparkles
                className="
                  h-4
                  w-4
                  text-violet-400
                "
              />


              <span
                className="
                  text-xs
                  font-semibold
                  capitalize
                  text-violet-300
                "
              >
                {emotion} mood
              </span>

            </div>

          )}

        </div>


        {/* =================================================
            CATEGORY SELECTOR
        ================================================= */}

        {categories.length > 0 && (

          <div className="mt-7">

            <p
              className="
                mb-3
                text-xs
                font-semibold
                uppercase
                tracking-[0.15em]
                text-slate-600
              "
            >
              Choose your vibe
            </p>


            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >

              {categories.map(
                (category) => {

                  const Icon =
                    categoryIcons[
                      category
                    ] || Music4;


                  const gradient =
                    categoryColors[
                      category
                    ] ||
                    "from-violet-500 to-cyan-500";


                  const active =
                    activeCategory ===
                    category;


                  return (

                    <motion.button

                      key={category}

                      whileHover={{
                        y: -2,
                      }}

                      whileTap={{
                        scale: 0.97,
                      }}

                      onClick={() =>
                        handleCategory(
                          category
                        )
                      }

                      className={`
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        transition-all

                        ${
                          active
                            ? `
                              border-transparent
                              bg-gradient-to-r
                              ${gradient}
                              text-white
                              shadow-lg
                              shadow-violet-500/20
                            `
                            : `
                              border-slate-800
                              bg-white/[0.03]
                              text-slate-400
                              hover:border-violet-500/30
                              hover:text-white
                            `
                        }
                      `}
                    >

                      <Icon
                        className="
                          h-4
                          w-4
                        "
                      />


                      {formatCategory(
                        category
                      )}

                    </motion.button>

                  );

                }
              )}

            </div>

          </div>

        )}

      </div>


      {/* =================================================
          SONG LIST
      ================================================= */}

      <div className="p-6">

        {loading ? (

          <div
            className="
              flex
              min-h-[260px]
              items-center
              justify-center
            "
          >

            <div className="text-center">

              <div
                className="
                  mx-auto
                  h-9
                  w-9
                  animate-spin
                  rounded-full
                  border-2
                  border-slate-700
                  border-t-violet-500
                "
              />


              <p
                className="
                  mt-4
                  text-sm
                  text-slate-500
                "
              >
                Finding your vibe...
              </p>

            </div>

          </div>

        ) : displayedSongs.length === 0 ? (

          <div
            className="
              flex
              min-h-[260px]
              flex-col
              items-center
              justify-center
              text-center
            "
          >

            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-violet-500/10
              "
            >

              <Music4
                className="
                  h-9
                  w-9
                  text-violet-400
                "
              />

            </div>


            <h3
              className="
                mt-6
                text-xl
                font-bold
                text-white
              "
            >
              No Songs Found
            </h3>


            <p
              className="
                mt-2
                max-w-sm
                text-sm
                leading-6
                text-slate-500
              "
            >
              Try another vibe and EMOFI
              will find music matching
              your mood.
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {displayedSongs.map(
              (song, index) => (

                <motion.button

                  key={`${song.title}-${song.artist}-${index}`}

                  initial={{
                    opacity: 0,
                    x: 15,
                  }}

                  animate={{
                    opacity: 1,
                    x: 0,
                  }}

                  transition={{
                    delay:
                      index * 0.05,
                  }}

                  whileHover={{
                    x: 3,
                  }}

                  onClick={() =>
                    handleSongClick(
                      song,
                      index
                    )
                  }

                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-slate-800
                    bg-white/[0.025]
                    p-4
                    text-left
                    transition-all
                    hover:border-violet-500/30
                    hover:bg-white/[0.05]
                  "
                >

                  {/* Song Information */}

                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-4
                    "
                  >

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-violet-600
                        to-cyan-500
                      "
                    >

                      <Music4
                        className="
                          h-5
                          w-5
                          text-white
                        "
                      />

                    </div>


                    <div
                      className="
                        min-w-0
                      "
                    >

                      <h3
                        className="
                          truncate
                          font-semibold
                          text-white
                        "
                      >
                        {song.title}
                      </h3>


                      <p
                        className="
                          mt-1
                          truncate
                          text-sm
                          text-slate-500
                        "
                      >
                        {song.artist}
                      </p>

                    </div>

                  </div>


                  {/* Play */}

                  <div
                    className="
                      ml-4
                      flex
                      shrink-0
                      items-center
                      gap-3
                    "
                  >

                    <span
                      className="
                        hidden
                        rounded-full
                        border
                        border-cyan-500/20
                        bg-cyan-500/10
                        px-3
                        py-1
                        text-[10px]
                        font-semibold
                        text-cyan-300
                        sm:block
                      "
                    >
                      AI PICK
                    </span>


                    <span
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-r
                        from-violet-600
                        to-cyan-500
                        text-white
                        shadow-lg
                        shadow-violet-500/10
                        transition-transform
                        group-hover:scale-105
                      "
                    >

                      <Play
                        className="
                          h-4
                          w-4
                        "
                        fill="white"
                      />

                    </span>

                  </div>

                </motion.button>

              )
            )}

          </div>

        )}

      </div>


      {/* =================================================
          MUSIC PLAYER
      ================================================= */}

      {selectedSong && (

        <MusicPlayer

          /*
           * VERY IMPORTANT
           *
           * New song = new component instance.
           *
           * This prevents the old YouTube
           * player/timeline from carrying over.
           */

          key={`
            ${
              selectedSong.youtubeId ||
              selectedSong.youtube ||
              selectedSong.title
            }
            -
            ${currentIndex}
          `}

          song={selectedSong}

          songs={displayedSongs}

          currentIndex={
            currentIndex
          }

          onNext={
            handleNext
          }

          onPrevious={
            handlePrevious
          }

          onClose={
            handleClosePlayer
          }

        />

      )}


      {/* =================================================
          FOOTER
      ================================================= */}

      <div
        className="
          border-t
          border-slate-800
          px-6
          py-5
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div>

            <p
              className="
                text-xs
                text-slate-600
              "
            >
              Recommendation Engine
            </p>


            <p
              className="
                mt-1
                text-sm
                font-semibold
                text-slate-300
              "
            >
              Emotion → Vibe → Music
            </p>

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

            <span
              className="
                text-xs
                font-semibold
                text-violet-300
              "
            >
              Powered by AI
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          BOTTOM ACCENT
      ================================================= */}

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

    </motion.section>

  );
}