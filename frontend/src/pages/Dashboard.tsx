import { useState } from "react";
import { Music4, User } from "lucide-react";

import WebcamCard from "../components/dashboard/WebcamCard";
import EmotionCard from "../components/dashboard/EmotionCard";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [emotion, setEmotion] = useState("Waiting...");
  const [confidence, setConfidence] = useState(0);

  const handlePrediction = (
    emotion: string,
    confidence: number
  ) => {
    setEmotion(emotion);
    setConfidence(confidence);
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="border-b bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

          <h1 className="text-3xl font-bold text-violet-600">
            EMOFI
          </h1>

          <div className="flex items-center gap-3">
            <User className="text-violet-600" />

            <div>
              <p className="font-semibold">
                {user.name}
              </p>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

        </div>
      </nav>

      {/* Dashboard */}
      <div className="mx-auto grid max-w-7xl gap-8 p-8 lg:grid-cols-3">

        <WebcamCard
          onPrediction={handlePrediction}
        />

        <EmotionCard
          emotion={emotion}
          confidence={confidence}
        />

        {/* Music */}
        <div className="rounded-3xl bg-white p-8 shadow">

          <div className="mb-5 flex items-center gap-3">
            <Music4 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Recommendations
            </h2>
          </div>

          <div className="space-y-4">

            <div className="rounded-xl bg-violet-50 p-4">
              🎵 Perfect
            </div>

            <div className="rounded-xl bg-violet-50 p-4">
              🎵 Blinding Lights
            </div>

            <div className="rounded-xl bg-violet-50 p-4">
              🎵 Believer
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}