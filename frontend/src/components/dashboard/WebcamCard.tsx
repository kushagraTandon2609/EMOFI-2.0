import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Loader2,
  Radio,
} from "lucide-react";
import { motion } from "framer-motion";

import { detectEmotion } from "../../services/emotion";

interface Prediction {
  emotion: string;
  confidence: number;

  categories?: string[];

  songs: {
    title: string;
    artist: string;
    youtube?: string;
    youtubeId?: string;
    emotion?: string;
    category?: string;
  }[];
}

interface WebcamCardProps {
  onPrediction: (prediction: Prediction) => void;
}

export default function WebcamCard({
  onPrediction,
}: WebcamCardProps) {

  const webcamRef = useRef<Webcam>(null);

  // Prevent multiple detection requests
  // from running at the same time.
  const detectionRunningRef = useRef(false);

  const [detecting, setDetecting] = useState(true);

  const [status, setStatus] = useState<
    "Ready" | "Detecting"
  >("Ready");


  // ==========================================================
  // DETECTION LOOP
  // ==========================================================

  useEffect(() => {

    let cancelled = false;

    const detectLoop = async () => {

      while (!cancelled) {

        // ----------------------------------------------------
        // Detection disabled
        // ----------------------------------------------------

        if (!detecting) {

          setStatus("Ready");

          await new Promise((resolve) =>
            setTimeout(resolve, 500)
          );

          continue;
        }


        // ----------------------------------------------------
        // Prevent overlapping requests
        // ----------------------------------------------------

        if (detectionRunningRef.current) {

          await new Promise((resolve) =>
            setTimeout(resolve, 250)
          );

          continue;
        }


        // ----------------------------------------------------
        // Capture screenshot
        // ----------------------------------------------------

        const image =
          webcamRef.current?.getScreenshot();


        if (!image) {

          await new Promise((resolve) =>
            setTimeout(resolve, 500)
          );

          continue;
        }


        // ----------------------------------------------------
        // Start detection
        // ----------------------------------------------------

        detectionRunningRef.current = true;

        setStatus("Detecting");


        try {

          const response =
            await detectEmotion(image);


          if (
            !cancelled &&
            response?.success
          ) {

            onPrediction(response);

          }

        } catch (error) {

          console.error(
            "❌ Emotion detection failed:",
            error
          );

        } finally {

          detectionRunningRef.current = false;

          if (!cancelled) {
            setStatus("Ready");
          }

        }


        // ----------------------------------------------------
        // Wait before next detection
        // ----------------------------------------------------

        if (!cancelled) {

          await new Promise((resolve) =>
            setTimeout(resolve, 2000)
          );

        }

      }
    };


    detectLoop();


    return () => {

      cancelled = true;

    };

  }, [detecting, onPrediction]);


  // ==========================================================
  // UI
  // ==========================================================

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        xl:col-span-2
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-white/5
        backdrop-blur-3xl
      "
    >

      {/* ====================================================
          HEADER
      ==================================================== */}

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

            <Camera className="h-6 w-6 text-white" />

          </div>


          <div>

            <h2 className="text-2xl font-bold">
              Live Emotion Detection
            </h2>

            <p className="text-sm text-slate-400">
              AI powered facial emotion recognition
            </p>

          </div>

        </div>


        <motion.div
          animate={{
            opacity: [1, 0.4, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-2
          "
        >

          <Radio className="h-4 w-4 text-red-400" />

          <span className="text-sm font-medium text-red-400">
            LIVE
          </span>

        </motion.div>

      </div>


      {/* ====================================================
          WEBCAM
      ==================================================== */}

      <div className="p-6">

        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-slate-700
            bg-black
          "
        >

          {/* Animated Glow */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-2xl
              bg-gradient-to-r
              from-violet-500/10
              via-transparent
              to-cyan-500/10
              z-10
            "
          />


          {/* Status */}

          <div
            className="
              absolute
              left-5
              top-5
              z-20
              flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-500/20
              bg-black/60
              px-4
              py-2
              backdrop-blur-xl
            "
          >

            <span
              className="
                h-2
                w-2
                rounded-full
                bg-emerald-400
                animate-pulse
              "
            />

            <span className="text-xs font-medium text-white">
              Camera Connected
            </span>

          </div>


          {/* =================================================
              WEBCAM

              Reduced from 1280x720 + quality 1
              to 640x360 + quality 0.6
          ================================================= */}

          <Webcam
            videoConstraints={{
              width: 640,
              height: 360,
              facingMode: "user",
            }}
            ref={webcamRef}
            mirrored
            audio={false}
            screenshotFormat="image/jpeg"
            screenshotQuality={0.6}
            className="
              aspect-video
              w-full
              object-cover
            "
          />


          {/* =================================================
              BOTTOM OVERLAY
          ================================================= */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              flex
              items-center
              justify-between
              bg-gradient-to-t
              from-black/80
              via-black/30
              to-transparent
              p-6
              z-20
            "
          >

            <div>

              <p className="text-sm text-slate-300">
                Detection Interval
              </p>

              <h3 className="mt-1 text-xl font-bold text-white">
                Every 2 Seconds
              </h3>

            </div>


            <div
              className="
                rounded-xl
                border
                border-slate-700
                bg-black/40
                px-4
                py-3
                backdrop-blur-xl
              "
            >

              <p className="text-xs text-slate-400">
                Current Status
              </p>


              <div className="mt-1 flex items-center gap-2">

                {status === "Detecting" ? (
                  <>

                    <Loader2
                      className="
                        h-4
                        w-4
                        animate-spin
                        text-violet-400
                      "
                    />

                    <span className="font-medium text-violet-400">
                      Detecting...
                    </span>

                  </>
                ) : (
                  <>

                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-emerald-400
                      "
                    />

                    <span className="font-medium text-emerald-400">
                      Ready
                    </span>

                  </>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ====================================================
          CONTROLS
      ==================================================== */}

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
            Emotion Recognition Engine
          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">
            Real-Time AI Detection
          </h3>

        </div>


        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={() =>
            setDetecting((previous) => !previous)
          }
          className={`
            flex
            items-center
            gap-3
            rounded-xl
            px-6
            py-3
            font-semibold
            transition-all

            ${
              detecting
                ? "bg-red-500/15 text-red-400 border border-red-500/20"
                : "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 text-white"
            }
          `}
        >

          {detecting ? (
            <>

              <Loader2 className="h-5 w-5 animate-spin" />

              Stop Detection

            </>
          ) : (
            <>

              <Camera className="h-5 w-5" />

              Start Detection

            </>
          )}

        </motion.button>

      </div>


      {/* ====================================================
          BOTTOM ACCENT
      ==================================================== */}

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


      {/* ====================================================
          BACKGROUND GLOW
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-20
          h-64
          w-64
          rounded-full
          bg-violet-600/10
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-16
          h-64
          w-64
          rounded-full
          bg-cyan-500/10
          blur-[130px]
        "
      />

    </motion.section>
  );
}