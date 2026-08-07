import { useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import WebcamCard from "../components/dashboard/WebcamCard";
import EmotionCard from "../components/dashboard/EmotionCard";
import RecommendationCard from "../components/dashboard/RecommendationCard";

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
    <DashboardLayout>

      <WelcomeBanner />

      {/* Webcam + Emotion */}

      <div className="mt-8 grid gap-8 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <WebcamCard
            onPrediction={handlePrediction}
          />
        </div>

        <EmotionCard
          emotion={emotion}
          confidence={confidence}
        />

      </div>

      {/* Recommendation */}

      <div className="mt-8 w-full">

        <RecommendationCard
          songs={songs}
        />

      </div>

    </DashboardLayout>
  );
}