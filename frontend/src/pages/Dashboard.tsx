import { useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import WebcamCard from "../components/dashboard/WebcamCard";
import EmotionCard from "../components/dashboard/EmotionCard";
import RecommendationCard from "../components/dashboard/RecommendationCard";


interface Song {
  title: string;
  artist: string;
  youtube?: string;
  youtubeId?: string;
  emotion?: string;
  category?: string;
}


interface Prediction {
  emotion: string;
  confidence: number;
  songs: Song[];
  categories?: string[];
}


export default function Dashboard() {

  const [
    emotion,
    setEmotion
  ] = useState("Waiting...");


  const [
    confidence,
    setConfidence
  ] = useState(0);


  const [
    songs,
    setSongs
  ] = useState<Song[]>([]);


  const [
    categories,
    setCategories
  ] = useState<string[]>([]);


  const handlePrediction = (
    prediction: Prediction
  ) => {

    setEmotion(
      prediction.emotion
    );

    setConfidence(
      prediction.confidence
    );

    setSongs(
      prediction.songs || []
    );

    setCategories(
      prediction.categories || []
    );

  };


  return (
    <DashboardLayout>

      <WelcomeBanner />


      {/* Webcam + Emotion */}

      <div
        className="
        mt-8
        grid
        gap-8
        xl:grid-cols-3
        "
      >

        <div
          className="
          xl:col-span-2
          "
        >

          <WebcamCard
            onPrediction={
              handlePrediction
            }
          />

        </div>


        <EmotionCard
          emotion={emotion}
          confidence={confidence}
        />

      </div>


      {/* Recommendations */}

      <div className="mt-8 w-full">

        <RecommendationCard
          songs={songs}
          emotion={emotion}
          categories={categories}
        />

      </div>

    </DashboardLayout>
  );
}