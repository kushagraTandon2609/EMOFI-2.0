import { Button } from "../ui/button";
import { Music4, BrainCircuit, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-violet-50 via-white to-pink-50">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col-reverse items-center justify-center gap-14 px-6 py-16 sm:px-8 md:py-20 lg:flex-row lg:gap-20 lg:px-10">

        {/* Left Section */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-violet-200 bg-white px-4 py-2 text-sm shadow-sm">
            <Sparkles className="mr-2 h-4 w-4 text-violet-600" />
            AI Powered Emotion Recognition
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl">
            Emotion <span className="text-violet-600">Meets</span> Music
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-base leading-8 text-gray-600 sm:text-lg lg:mx-0">
            Detect your emotions in real-time using Artificial Intelligence and
            instantly receive personalized music recommendations that perfectly
            match your mood.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button size="lg" className="w-full sm:w-auto">
              Start Detecting
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              View GitHub
            </Button>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="flex flex-1 items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative h-[320px] w-full max-w-[420px] rounded-3xl bg-white p-6 shadow-2xl sm:h-[420px] sm:p-8">

            {/* Floating Emotion Card */}
            <div className="absolute left-2 top-6 flex items-center gap-3 rounded-xl bg-white p-3 shadow-lg sm:-left-8 sm:top-10 sm:p-4">
              <BrainCircuit className="text-violet-600" />

              <div>
                <p className="font-semibold">Emotion</p>
                <p className="text-sm text-gray-500">
                  Happy 😊
                </p>
              </div>
            </div>

            {/* Floating Music Card */}
            <div className="absolute bottom-6 right-2 flex items-center gap-3 rounded-xl bg-white p-3 shadow-lg sm:-right-8 sm:bottom-16 sm:p-4">
              <Music4 className="text-violet-600" />

              <div>
                <p className="font-semibold">Recommendation</p>
                <p className="text-sm text-gray-500">
                  3 Songs Ready
                </p>
              </div>
            </div>

            {/* Main AI Box */}
            <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50">
              <BrainCircuit
                size={120}
                className="text-violet-500 sm:h-36 sm:w-36"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}