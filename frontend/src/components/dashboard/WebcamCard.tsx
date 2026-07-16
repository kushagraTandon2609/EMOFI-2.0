import Webcam from "react-webcam";
import { useRef } from "react";
import { Camera } from "lucide-react";
import { Button } from "../ui/button";
import { detectEmotion } from "../../services/emotion";

interface WebcamCardProps {
  onPrediction: (emotion: string, confidence: number) => void;
}

export default function WebcamCard({
  onPrediction,
}: WebcamCardProps) {
  const webcamRef = useRef<Webcam>(null);

  const capture = async () => {
    const image = webcamRef.current?.getScreenshot();

    if (!image) {
      alert("Unable to capture image.");
      return;
    }

    try {
      const response = await detectEmotion(image);

      if (!response.success) {
        alert(response.message);
        return;
      }

      onPrediction(
        response.emotion,
        response.confidence
      );

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <div className="mb-5 flex items-center gap-3">
        <Camera className="text-violet-600" />

        <h2 className="text-2xl font-bold">
          Emotion Detection
        </h2>
      </div>

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-2xl w-full"
      />

      <Button
        className="mt-6 w-full"
        onClick={capture}
      >
        Capture Image
      </Button>

    </div>
  );
}