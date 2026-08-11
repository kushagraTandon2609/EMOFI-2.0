import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import ProfileHero from "../components/profile/ProfileHero";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileCard from "../components/profile/ProfileCard";
import Achievements from "../components/profile/Achievements";

import { getHistory } from "../services/history";
import { getAnalytics } from "../services/analytics";

interface HistoryItem {
  id: number;
  emotion: string;
  confidence: number;
  created_at: string;
}

interface User {
  id?: number;
  name?: string;
  email?: string;
}

interface AnalyticsData {
  total: number;
  most_common: string | null;

  last_detection: {
    emotion: string;
    confidence: number;
    created_at: string;
  } | null;

  distribution: Record<string, number>;
}

export default function Profile() {
  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  const [user, setUser] =
    useState<User>({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    setUser(storedUser);

    const loadProfileData = async () => {
      try {
        setLoading(true);

        const [
          historyResponse,
          analyticsResponse,
        ] = await Promise.all([
          getHistory(),
          getAnalytics(),
        ]);

        if (historyResponse.success) {
          setHistory(
            historyResponse.history
          );
        }

        if (analyticsResponse.success) {
          setAnalytics(
            analyticsResponse.analytics
          );
        }
      } catch (error) {
        console.error(
          "Failed to load profile data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const stats = useMemo(() => {
    if (history.length === 0) {
      return {
        total: 0,
        mostCommon: null,
        latestEmotion: null,
        averageConfidence: null,
      };
    }

    const emotionCounts: Record<
      string,
      number
    > = {};

    history.forEach((item) => {
      const emotion =
        item.emotion.toLowerCase();

      emotionCounts[emotion] =
        (emotionCounts[emotion] || 0) + 1;
    });

    const mostCommon =
      Object.entries(emotionCounts)
        .sort(
          (a, b) => b[1] - a[1]
        )[0]?.[0] || null;

    const averageConfidence =
      history.reduce(
        (sum, item) =>
          sum + Number(item.confidence),
        0
      ) / history.length;

    return {
      total: history.length,

      mostCommon,

      latestEmotion:
        history[0]?.emotion || null,

      averageConfidence,
    };
  }, [history]);
    // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <DashboardLayout>

        <div
          className="
          flex
          min-h-[65vh]
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

            <p
              className="
              mt-4
              text-sm
              text-slate-500
              "
            >
              Loading your EMOFI profile...
            </p>

          </div>

        </div>

      </DashboardLayout>
    );
  }

  // --------------------------------------------------
  // PROFILE PAGE
  // --------------------------------------------------

  return (
    <DashboardLayout>

      {/* Profile Hero */}

      <ProfileHero
        name={user.name || "User"}
        email={user.email}
      />

      {/* Profile Stats */}

      <ProfileStats
        stats={stats}
      />

      {/* Account + Mood Profile */}

      <ProfileCard
        user={{
          id: user.id || 0,
          name: user.name || "User",
          email: user.email || "",
        }}
        distribution={
          analytics?.distribution || {}
        }
      />

      {/* Achievements */}

      <Achievements
        totalDetections={stats.total}
      />

      <div className="h-8" />

    </DashboardLayout>
  );
}