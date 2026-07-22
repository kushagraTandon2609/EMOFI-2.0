interface HistoryItem {
    id: number;
    emotion: string;
    confidence: number;
    created_at: string;
}

interface HistoryCardProps {
    history: HistoryItem[];
}

export default function HistoryCard({
    history,
}: HistoryCardProps) {
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
                            <h3 className="font-semibold text-lg">
                                {item.emotion}
                            </h3>

                            <p className="text-gray-500">
                                {item.confidence.toFixed(2)}%
                            </p>
                        </div>

                        <div className="text-sm text-gray-500">
                            {new Date(item.created_at).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}