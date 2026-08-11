import { motion } from "framer-motion";

import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  Music4,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

interface Song {
  title: string;
  artist: string;
  youtube?: string;
  youtubeId?: string;
}

interface MusicPlayerProps {
  song: Song | null;
  songs: Song[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
}

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (
    seconds: number,
    allowSeekAhead?: boolean
  ) => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}

interface YouTubePlayerEvent {
  target: YouTubePlayer;
}

interface YouTubePlayerOptions {
  height: string;
  width: string;
  videoId: string;

  playerVars?: {
    autoplay?: number;
    controls?: number;
    rel?: number;
    playsinline?: number;
    fs?: number;
  };

  events?: {
    onReady?: (
      event: YouTubePlayerEvent
    ) => void;

    onStateChange?: (
      event: YouTubePlayerEvent
    ) => void;
  };
}

interface YouTubeWindow extends Window {
  YT?: {
    Player: new (
      element: HTMLElement,
      options: YouTubePlayerOptions
    ) => YouTubePlayer;
  };

  onYouTubeIframeAPIReady?: () => void;
}


/* =========================================================
   YOUTUBE ID
========================================================= */

function getYoutubeId(
  song: Song
): string | null {

  if (song.youtubeId) {
    return song.youtubeId;
  }

  if (!song.youtube) {
    return null;
  }

  try {
    const url = new URL(song.youtube);

    if (
      url.hostname.includes("youtube.com")
    ) {
      return (
        url.searchParams.get("v") ||
        null
      );
    }

    if (
      url.hostname.includes("youtu.be")
    ) {
      return (
        url.pathname.replace("/", "") ||
        null
      );
    }

  } catch {
    return null;
  }

  return null;
}


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(seconds: number) {

  if (
    !seconds ||
    !Number.isFinite(seconds)
  ) {
    return "0:00";
  }

  const minutes =
    Math.floor(seconds / 60);

  const remaining =
    Math.floor(seconds % 60);

  return `${minutes}:${remaining
    .toString()
    .padStart(2, "0")}`;
}


/* =========================================================
   MUSIC PLAYER
========================================================= */

export default function MusicPlayer({
  song,
  songs,
  currentIndex,
  onNext,
  onPrevious,
  onClose,
}: MusicPlayerProps) {

  const playerRef =
    useRef<YouTubePlayer | null>(null);

  const playerContainerRef =
    useRef<HTMLDivElement | null>(null);

  const intervalRef =
    useRef<number | null>(null);

  const nextRef =
    useRef(onNext);

  useEffect(() => {
    nextRef.current = onNext;
  }, [onNext]);


  const [apiReady, setApiReady] =
    useState(false);

  const [playing, setPlaying] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [volume, setVolume] =
    useState(80);

  const [muted, setMuted] =
    useState(false);



  const videoId =
    song
      ? getYoutubeId(song)
      : null;


  /* =========================================================
     LOAD YOUTUBE API
  ========================================================= */

  useEffect(() => {

    const win =
      window as YouTubeWindow;

    if (win.YT?.Player) {
      // avoid setting state synchronously inside effect to prevent cascading renders
      setTimeout(() => setApiReady(true), 0);
      return;
    }

    const existingScript =
      document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );

    if (!existingScript) {

      const script =
        document.createElement("script");

      script.src =
        "https://www.youtube.com/iframe_api";

      script.async = true;

      document.body.appendChild(script);
    }

    win.onYouTubeIframeAPIReady =
      () => {
        setApiReady(true);
      };

    return () => {
      win.onYouTubeIframeAPIReady =
        undefined;
    };

  }, []);


  /* =========================================================
     CREATE PLAYER FOR NEW SONG
  ========================================================= */

  useEffect(() => {

    if (
      !apiReady ||
      !videoId ||
      !playerContainerRef.current
    ) {
      return;
    }

    const win =
      window as YouTubeWindow;

    if (!win.YT?.Player) {
      return;
    }


    /* Reset visible state (defer to avoid sync setState in effect) */
    setTimeout(() => {
      setPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }, 0);


    /* Destroy previous player */

    if (playerRef.current) {

      try {
        playerRef.current.destroy();
      } catch (error) {
        console.warn("Failed to destroy player", error);
      }

      playerRef.current = null;
    }


    /* Clear old iframe */

    playerContainerRef.current.innerHTML =
      "";


    /* Create new player */

    const player =
      new win.YT.Player(
        playerContainerRef.current,
        {

          height: "200",
          width: "200",

          videoId,

          playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            playsinline: 1,
            fs: 0,
          },

          events: {

            onReady: (event) => {

              playerRef.current =
                event.target;

              event.target.setVolume(
                muted ? 0 : volume
              );

              const total =
                event.target.getDuration();

              setDuration(
                total || 0
              );

              /* Always start new song */

              event.target.seekTo(
                0,
                true
              );

              event.target.playVideo();

              setCurrentTime(0);
              setPlaying(true);
            },


            onStateChange: (event) => {

              const state =
                event.target
                  .getPlayerState();


              /* PLAYING */

              if (state === 1) {
                setPlaying(true);
              }


              /* PAUSED */

              if (state === 2) {
                setPlaying(false);
              }


              /* ENDED */

              if (state === 0) {

                setPlaying(false);
                setCurrentTime(0);

                nextRef.current();
              }

            },

          },

        }
      );


    playerRef.current =
      player;


    return () => {

      if (intervalRef.current) {

        window.clearInterval(
          intervalRef.current
        );

        intervalRef.current = null;
      }


      if (playerRef.current) {

        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error(error);
        }

        playerRef.current = null;
      }

    };

  }, [apiReady, videoId]);


  /* =========================================================
     PROGRESS
  ========================================================= */

  useEffect(() => {

    if (intervalRef.current) {

      window.clearInterval(
        intervalRef.current
      );
    }


    intervalRef.current =
      window.setInterval(() => {

        if (!playerRef.current) {
          return;
        }

        try {

          const current =
            playerRef.current
              .getCurrentTime();

          const total =
            playerRef.current
              .getDuration();

          setCurrentTime(
            current || 0
          );

          setDuration(
            total || 0
          );

        } catch (error) {
          console.error(error);
        }

      }, 500);


    return () => {

      if (intervalRef.current) {

        window.clearInterval(
          intervalRef.current
        );

        intervalRef.current = null;
      }

    };

  }, [song]);


  /* =========================================================
     PLAY / PAUSE
  ========================================================= */

  const togglePlay = () => {

    if (!playerRef.current) {
      return;
    }

    if (playing) {

      playerRef.current.pauseVideo();

      setPlaying(false);

    } else {

      playerRef.current.playVideo();

      setPlaying(true);

    }

  };


  /* =========================================================
     SEEK
  ========================================================= */

  const handleSeek = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const value =
      Number(event.target.value);

    setCurrentTime(value);

    playerRef.current?.seekTo(
      value,
      true
    );

  };


  /* =========================================================
     VOLUME
  ========================================================= */

  const handleVolume = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const value =
      Number(event.target.value);

    setVolume(value);

    playerRef.current?.setVolume(
      value
    );

    setMuted(value === 0);

  };


  /* =========================================================
     MUTE
  ========================================================= */

  const toggleMute = () => {

    if (!playerRef.current) {
      return;
    }

    if (muted) {

      const newVolume =
        volume || 80;

      playerRef.current.setVolume(
        newVolume
      );

      setMuted(false);

    } else {

      playerRef.current.setVolume(0);

      setMuted(true);

    }

  };



  if (!song) {
    return null;
  }


  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="
        relative
        mt-5
        overflow-hidden
        rounded-3xl
        border
        border-violet-500/20
        bg-[#080a14]/95
        shadow-2xl
        shadow-violet-950/40
        backdrop-blur-3xl
      "
    >

      {/* =====================================================
          AMBIENT GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-violet-600/20
          blur-[90px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          right-10
          h-48
          w-48
          rounded-full
          bg-cyan-500/10
          blur-[90px]
        "
      />


      {/* =====================================================
          HIDDEN YOUTUBE ENGINE
      ===================================================== */}

      <div
        ref={playerContainerRef}
        className="
          pointer-events-none
          fixed
          left-[-10000px]
          top-[-10000px]
          h-[200px]
          w-[200px]
          overflow-hidden
          opacity-0
        "
        aria-hidden="true"
      />


      {/* =====================================================
          TOP PLAYER AREA
      ===================================================== */}

      <div
        className="
          relative
          flex
          items-center
          gap-5
          px-5
          py-5
          md:px-6
          md:py-6
        "
      >

        {/* =================================================
            ARTWORK
        ================================================= */}

        <motion.div
          animate={
            playing
              ? {
                  scale: [1, 1.025, 1],
                }
              : {
                  scale: 1,
                }
          }
          transition={
            playing
              ? {
                  repeat: Infinity,
                  duration: 3,
                }
              : {}
          }
          className="
            relative
            h-16
            w-16
            shrink-0
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-gradient-to-br
            from-violet-600
            via-fuchsia-500
            to-cyan-500
            shadow-xl
            shadow-violet-500/20
            md:h-20
            md:w-20
          "
        >

          {videoId ? (

            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={song.title}
              className="
                h-full
                w-full
                object-cover
              "
            />

          ) : (

            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
              "
            >
              <Music4
                className="
                  h-8
                  w-8
                  text-white
                "
              />
            </div>

          )}


          {/* Playing glow */}

          {playing && (

            <motion.div
              animate={{
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
              }}
              className="
                absolute
                inset-0
                bg-violet-500/20
              "
            />

          )}

        </motion.div>


        {/* =================================================
            SONG INFORMATION
        ================================================= */}

        <div
          className="
            min-w-0
            w-[150px]
            md:w-[210px]
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <p
              className="
                truncate
                text-sm
                font-bold
                text-white
                md:text-base
              "
            >
              {song.title}
            </p>

          </div>


          <p
            className="
              mt-1
              truncate
              text-xs
              text-slate-400
              md:text-sm
            "
          >
            {song.artist}
          </p>


          {/* Playing indicator */}

          <div
            className="
              mt-2
              flex
              items-center
              gap-2
            "
          >

            <span
              className={`
                h-1.5
                w-1.5
                rounded-full
                ${
                  playing
                    ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                    : "bg-slate-600"
                }
              `}
            />

            <span
              className={`
                text-[10px]
                font-medium
                uppercase
                tracking-wider
                ${
                  playing
                    ? "text-emerald-400"
                    : "text-slate-500"
                }
              `}
            >
              {playing
                ? "Now Playing"
                : "Paused"}
            </span>

          </div>

        </div>


        {/* =================================================
            DESKTOP CENTER PLAYER
        ================================================= */}

        <div
          className="
            hidden
            min-w-0
            flex-1
            md:block
          "
        >

          {/* Progress */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <span
              className="
                w-9
                text-right
                text-[10px]
                font-medium
                text-slate-500
              "
            >
              {formatTime(currentTime)}
            </span>


            <div className="relative flex-1">

              <input
                type="range"
                min={0}
                max={duration || 1}
                value={Math.min(
                  currentTime,
                  duration || 1
                )}
                onChange={handleSeek}
                className="
                  h-1
                  w-full
                  cursor-pointer
                  appearance-none
                  rounded-full
                  bg-slate-800
                  accent-violet-500
                "
              />

            </div>


            <span
              className="
                w-9
                text-[10px]
                font-medium
                text-slate-500
              "
            >
              {formatTime(duration)}
            </span>

          </div>


          {/* Main controls */}

          <div
            className="
              mt-4
              flex
              items-center
              justify-center
              gap-5
            "
          >

            {/* Previous */}

            <motion.button
              whileTap={{
                scale: 0.9,
              }}
              onClick={onPrevious}
              disabled={
                currentIndex <= 0
              }
              className="
                text-slate-400
                transition
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-25
              "
            >
              <SkipBack
                className="h-4 w-4"
                fill="currentColor"
              />
            </motion.button>


            {/* PLAY */}

            <motion.button
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.92,
              }}
              onClick={togglePlay}
              className="
                relative
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
                text-white
                shadow-xl
                shadow-violet-500/30
              "
            >

              {/* glow */}

              {playing && (

                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.25, 0, 0.25],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                  className="
                    absolute
                    inset-0
                    rounded-full
                    bg-violet-500
                  "
                />

              )}

              <span className="relative">

                {playing ? (

                  <Pause
                    className="h-5 w-5"
                    fill="white"
                  />

                ) : (

                  <Play
                    className="
                      ml-0.5
                      h-5
                      w-5
                    "
                    fill="white"
                  />

                )}

              </span>

            </motion.button>


            {/* Next */}

            <motion.button
              whileTap={{
                scale: 0.9,
              }}
              onClick={onNext}
              disabled={
                currentIndex >=
                songs.length - 1
              }
              className="
                text-slate-400
                transition
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-25
              "
            >
              <SkipForward
                className="h-4 w-4"
                fill="currentColor"
              />
            </motion.button>


          </div>

        </div>


        {/* =================================================
            RIGHT SIDE ACTIONS
        ================================================= */}

        <div
          className="
            ml-auto
            flex
            items-center
            gap-2
          "
        >

          {/* Volume */}

          <div
            className="
              hidden
              items-center
              gap-2
              lg:flex
            "
          >

            <button
              onClick={
                toggleMute
              }
              className="
                text-slate-500
                transition
                hover:text-white
              "
            >

              {muted ? (

                <VolumeX
                  className="h-4 w-4"
                />

              ) : (

                <Volume2
                  className="h-4 w-4"
                />

              )}

            </button>


            <input
              type="range"
              min={0}
              max={100}
              value={
                muted
                  ? 0
                  : volume
              }
              onChange={
                handleVolume
              }
              className="
                h-1
                w-20
                cursor-pointer
                accent-violet-500
              "
            />

          </div>


          {/* Close */}

          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-slate-800
              bg-white/[0.03]
              text-slate-500
              transition
              hover:border-red-500/30
              hover:bg-red-500/10
              hover:text-red-400
            "
            title="Close player"
          >

            <X
              className="h-4 w-4"
            />

          </motion.button>

        </div>

      </div>


      {/* =====================================================
          MOBILE PROGRESS + CONTROLS
      ===================================================== */}

      <div
        className="
          border-t
          border-white/[0.04]
          px-5
          pb-4
          md:hidden
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <span
            className="
              text-[10px]
              text-slate-500
            "
          >
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min={0}
            max={duration || 1}
            value={Math.min(
              currentTime,
              duration || 1
            )}
            onChange={handleSeek}
            className="
              h-1
              flex-1
              accent-violet-500
            "
          />

          <span
            className="
              text-[10px]
              text-slate-500
            "
          >
            {formatTime(duration)}
          </span>

        </div>


        <div
          className="
            mt-4
            flex
            items-center
            justify-center
            gap-7
          "
        >

          <button
            onClick={onPrevious}
            disabled={
              currentIndex <= 0
            }
            className="
              text-slate-400
              disabled:opacity-25
            "
          >
            <SkipBack
              className="h-5 w-5"
              fill="currentColor"
            />
          </button>


          <button
            onClick={togglePlay}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-violet-600
              to-fuchsia-500
              text-white
              shadow-lg
              shadow-violet-500/30
            "
          >

            {playing ? (

              <Pause
                className="h-5 w-5"
                fill="white"
              />

            ) : (

              <Play
                className="ml-0.5 h-5 w-5"
                fill="white"
              />

            )}

          </button>


          <button
            onClick={onNext}
            disabled={
              currentIndex >=
              songs.length - 1
            }
            className="
              text-slate-400
              disabled:opacity-25
            "
          >
            <SkipForward
              className="h-5 w-5"
              fill="currentColor"
            />
          </button>


        </div>

      </div>


      {/* =====================================================
          BOTTOM ACCENT
      ===================================================== */}

      <div
        className="
          h-px
          w-full
          bg-gradient-to-r
          from-transparent
          via-violet-500/70
          to-transparent
        "
      />

    </motion.div>
  );
}