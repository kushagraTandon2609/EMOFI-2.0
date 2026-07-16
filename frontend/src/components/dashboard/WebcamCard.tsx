import Webcam from "react-webcam";
import { useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import { detectEmotion } from "../../services/emotion";

interface Prediction {
  emotion: string;
  confidence: number;
  songs: {
    title: string;
    artist: string;
    youtube: string;
  }[];
}

interface WebcamCardProps {
  onPrediction: (prediction: Prediction) => void;
}

export default function WebcamCard({
  onPrediction,
}: WebcamCardProps) {
  const webcamRef = useRef<Webcam>(null);

  const capture = async () => {
    const image = webcamRef.current?.getScreenshot();

    if (!image) return;

    try {
      const response = await detectEmotion(image);

      if (response.success) {
        onPrediction(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 2000); // Every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <div className="mb-5 flex items-center gap-3">
        <Camera className="text-violet-600" />
        <h2 className="text-2xl font-bold">
          Live Emotion Detection
        </h2>
      </div>

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full rounded-2xl"
      />

      <p className="mt-5 text-center text-sm text-gray-500">
        Detecting emotion every 2 seconds...
      </p>

    </div>
  );
}