import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import ProfileHero from "../components/profile/ProfileHero";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileAccount from "../components/profile/ProfileAccount";
import Achievements from "../components/profile/Achievements";

import { getHistory } from "../services/history";

interface HistoryItem {
  id: number;
  emotion: string;
  confidence: number;
  created_at: string;
}

interface User {
  name?: string;
  email?: string;
}

export default function Profile() {
  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  const [user, setUser] =
    useState<User>({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    setUser(storedUser);

    const loadHistory = async () => {
      try {
        const response =
          await getHistory();

        if (response.success) {
          setHistory(response.history);
        }
      } catch (error) {
        console.error(
          "Failed to load profile history:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
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
        .sort((a, b) => b[1] - a[1])[0]?.[0] ||
      null;

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

            <p
              className="
              mt-4
              text-sm
              text-slate-500
              "
            >
              Loading your profile...
            </p>

          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <ProfileHero
        name={user.name || "User"}
        email={user.email}
      />

      <ProfileStats
        stats={stats}
      />

      <ProfileAccount
        name={user.name || "User"}
        email={user.email || ""}
      />

      <Achievements
        totalDetections={stats.total}
      />
            <div className="h-8" />

    </DashboardLayout>
  );
}