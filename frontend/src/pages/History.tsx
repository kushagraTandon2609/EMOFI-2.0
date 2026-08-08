import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import HistoryHero from "../components/history/HistoryHero";
import HistoryStats from "../components/history/HistoryStats";
import HistoryFilters from "../components/history/HistoryFilters";
import HistoryTimeline from "../components/history/HistoryTimeline";

import {
  getHistory,
  deleteHistory,
  deleteAllHistory,
} from "../services/history";

interface HistoryItem {
  id: number;
  emotion: string;
  confidence: number;
  created_at: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [search, setSearch] = useState("");
  const [emotion, setEmotion] = useState("all");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchHistory = async () => {
      try {
        setLoading(true);

        const response = await getHistory();

        if (!cancelled && response.success) {
          setHistory(response.history);
        }
      } catch (error) {
        console.error(
          "Failed to load history:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchHistory();

    return () => {
      cancelled = true;
    };
  }, []);

  // --------------------------------------------------
  // FILTER HISTORY
  // --------------------------------------------------

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesEmotion =
        emotion === "all" ||
        item.emotion.toLowerCase() ===
          emotion.toLowerCase();

      const matchesSearch =
        search.trim() === "" ||
        item.emotion
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesEmotion &&
        matchesSearch
      );
    });
  }, [history, search, emotion]);

  // --------------------------------------------------
  // STATISTICS
  // --------------------------------------------------

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
      const key = item.emotion.toLowerCase();

      emotionCounts[key] =
        (emotionCounts[key] || 0) + 1;
    });

    const mostCommon = Object.entries(
      emotionCounts
    ).sort((a, b) => b[1] - a[1])[0]?.[0];

    const totalConfidence = history.reduce(
      (sum, item) =>
        sum + Number(item.confidence),
      0
    );

    const averageConfidence =
      totalConfidence / history.length;

    return {
      total: history.length,

      mostCommon:
        mostCommon
          ? mostCommon
          : null,

      latestEmotion:
        history[0]?.emotion || null,

      averageConfidence:
        averageConfidence,
    };
  }, [history]);

  // --------------------------------------------------
  // DELETE SINGLE
  // --------------------------------------------------

  const handleDelete = async (id: number) => {
    try {
      const response =
        await deleteHistory(id);

      if (response.success) {
        setHistory((current) =>
          current.filter(
            (item) => item.id !== id
          )
        );
      }
    } catch (error) {
      console.error(
        "Failed to delete history:",
        error
      );
    }
  };

  // --------------------------------------------------
  // DELETE ALL
  // --------------------------------------------------

  const handleDeleteAll = async () => {
    if (history.length === 0) {
      return;
    }

    try {
      const response =
        await deleteAllHistory();

      if (response.success) {
        setHistory([]);
      }
    } catch (error) {
      console.error(
        "Failed to delete all history:",
        error
      );
    }
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

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
              Loading your emotion history...
            </p>

          </div>

        </div>

      </DashboardLayout>
    );
  }

  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <DashboardLayout>

      {/* Hero */}

      <HistoryHero />

      {/* Stats */}

      <HistoryStats
        stats={stats}
      />

      {/* Filters */}

      <HistoryFilters
        search={search}
        onSearchChange={setSearch}
        emotion={emotion}
        onEmotionChange={setEmotion}
        onDeleteAll={handleDeleteAll}
      />

      {/* Timeline */}

      <HistoryTimeline
        history={filteredHistory}
        onDelete={handleDelete}
      />

    </DashboardLayout>
  );
}