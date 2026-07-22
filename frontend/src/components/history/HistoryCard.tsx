import { Trash2 } from "lucide-react";

interface HistoryItem {
  id: number;
  emotion: string;
  confidence: number;
  created_at: string;
}

interface HistoryCardProps {
  history: HistoryItem[];
  onDelete: (id: number) => void;
}

export default function HistoryCard({
  history,
  onDelete,
}: HistoryCardProps) {
  if (history.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          📜 Mood History
        </h2>

        <p className="text-center text-gray-500">
          No mood history found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        📜 Mood History
      </h2>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <h3 className="text-lg font-semibold capitalize">
                {item.emotion}
              </h3>

              <p className="text-gray-500">
                {item.confidence.toFixed(2)}%
              </p>

              <p className="mt-1 text-sm text-gray-400">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => onDelete(item.id)}
              className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}