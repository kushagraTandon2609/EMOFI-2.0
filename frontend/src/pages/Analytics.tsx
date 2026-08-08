import { useEffect, useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import AnalyticsHero from "../components/analytics/AnalyticsHero";
import StatsGrid from "../components/analytics/StatsGrid";
import EmotionPieChart from "../components/analytics/EmotionPieChart";
import MoodTrendChart from "../components/analytics/MoodTrendChart";
import ConfidenceChart from "../components/analytics/ConfidenceChart";
import AIInsights from "../components/analytics/AIInsights";

import {
  getAnalytics,
  type AnalyticsData,
} from "../services/analytics";

export default function Analytics() {
  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await getAnalytics();

        if (response.success) {
          setAnalytics(response.analytics);
        }
      } catch (error) {
        console.error(
          "Failed to load analytics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div
          className="
          flex
          min-h-[60vh]
          items-center
          justify-center
          "
        >
          <div className="text-center">

            <div
              className="
              mx-auto
              h-10
              w-10
              animate-spin
              rounded-full
              border-2
              border-slate-700
              border-t-violet-500
              "
            />

            <p className="mt-4 text-sm text-slate-500">
              Loading your analytics...
            </p>

          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analytics) {
    return (
      <DashboardLayout>
        <div
          className="
          flex
          min-h-[60vh]
          items-center
          justify-center
          "
        >
          <div className="text-center">

            <h2 className="text-xl font-bold text-white">
              Unable to load analytics
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Please try again later.
            </p>

          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <AnalyticsHero />

      <StatsGrid
  stats={{
    totalDetections: analytics.total,
    mostDetectedEmotion: analytics.most_common,
    lastDetectionEmotion:
      analytics.last_detection?.emotion ?? null,
    lastDetectionConfidence:
      analytics.last_detection?.confidence ?? null,
  }}
/>

      <EmotionPieChart
        data={Object.entries(
          analytics.distribution
        ).map(([emotion, count]) => ({
          emotion,
          count,
        }))}
      />

      <MoodTrendChart
  data={analytics.mood_trend}
/>

<ConfidenceChart
  data={analytics.confidence_trend}
/>
      <AIInsights
        mostCommonEmotion={
          analytics.most_common
        }

        averageConfidence={
          analytics.last_detection
            ? analytics.last_detection.confidence
            : null
        }

        totalDetections={
          analytics.total
        }

        activeDays={0}
      />

    </DashboardLayout>
  );
}