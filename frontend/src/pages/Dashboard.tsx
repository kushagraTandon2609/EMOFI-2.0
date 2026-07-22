import { useState } from "react";

import RecommendationCard from "../components/dashboard/RecommendationCard";
import WebcamCard from "../components/dashboard/WebcamCard";
import EmotionCard from "../components/dashboard/EmotionCard";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

export default function Dashboard() {
  const [emotion, setEmotion] = useState("Waiting...");
  const [confidence, setConfidence] = useState(0);

  const [songs, setSongs] = useState<
    {
      title: string;
      artist: string;
      youtube: string;
    }[]
  >([]);

  const handlePrediction = (prediction: {
    emotion: string;
    confidence: number;
    songs: {
      title: string;
      artist: string;
      youtube: string;
    }[];
  }) => {
    setEmotion(prediction.emotion);
    setConfidence(prediction.confidence);
    setSongs(prediction.songs);
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl p-8">

        <DashboardNavbar />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          <WebcamCard
            onPrediction={handlePrediction}
          />

          <EmotionCard
            emotion={emotion}
            confidence={confidence}
          />

          <RecommendationCard
            songs={songs}
          />

        </div>

      </div>

    </div>
  );
}