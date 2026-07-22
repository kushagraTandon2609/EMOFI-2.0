interface Analytics {
  total: number;
  most_common: string | null;
  last_detection: {
    emotion: string;
    confidence: number;
    created_at: string;
  } | null;
  distribution: Record<string, number>;
}

interface AnalyticsCardProps {
  analytics: Analytics;
}

export default function AnalyticsCard({
  analytics,
}: AnalyticsCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        📊 Mood Analytics
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between border-b pb-3">
          <span>Total Detections</span>
          <span className="font-bold">
            {analytics.total}
          </span>
        </div>

        <div className="flex justify-between border-b pb-3">
          <span>Most Common Mood</span>
          <span className="font-bold capitalize">
            {analytics.most_common ?? "-"}
          </span>
        </div>

        <div className="flex justify-between border-b pb-3">
          <span>Last Mood</span>

          <span className="font-bold capitalize">
            {analytics.last_detection
              ? analytics.last_detection.emotion
              : "-"}
          </span>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">
            Distribution
          </h3>

          <div className="space-y-2">

            {Object.entries(analytics.distribution).map(
              ([emotion, count]) => (
                <div
                  key={emotion}
                  className="flex justify-between rounded-lg border p-3"
                >
                  <span className="capitalize">
                    {emotion}
                  </span>

                  <span>{count}</span>
                </div>
              )
            )}

          </div>
        </div>

      </div>
    </div>
  );
}