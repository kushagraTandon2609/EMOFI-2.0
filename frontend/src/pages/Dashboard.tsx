import { useState } from "react";
import { Music4, User } from "lucide-react";
import RecommendationCard from "../components/dashboard/RecommendationCard";
import WebcamCard from "../components/dashboard/WebcamCard";
import EmotionCard from "../components/dashboard/EmotionCard";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

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
        <RecommendationCard
  songs={songs}
/>

      </div>
    </div>
  );
}