import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-gray-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 py-8 text-gray-600 md:flex-row">

        <div>
          <h2 className="text-2xl font-bold text-violet-600">
            EMOFI
          </h2>

          <p className="text-sm">
            Emotion Meets Music
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          Made with
          <Heart
            className="fill-red-500 text-red-500"
            size={16}
          />
          using React, Flask & AI
        </div>

      </div>
    </footer>
  );
}