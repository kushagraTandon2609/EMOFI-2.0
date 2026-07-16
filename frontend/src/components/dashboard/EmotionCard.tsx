import { BrainCircuit } from "lucide-react";

interface Props {
  emotion: string;
  confidence: number;
}

const emojiMap: Record<string, string> = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  surprise: "😲",
};

export default function EmotionCard({
  emotion,
  confidence,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <div className="mb-5 flex items-center gap-3">
        <BrainCircuit className="text-violet-600" />

        <h2 className="text-2xl font-bold">
          Current Emotion
        </h2>
      </div>

      <div className="mt-12 text-center">

        <p className="text-7xl">
          {emojiMap[emotion.toLowerCase()] || "🙂"}
        </p>

        <h1 className="mt-5 text-4xl font-bold capitalize">
          {emotion}
        </h1>

        <p className="mt-3 text-gray-500">
          Confidence : {confidence.toFixed(2)}%
        </p>

      </div>

    </div>
  );
}