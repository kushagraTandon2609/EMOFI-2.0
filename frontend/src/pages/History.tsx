import { useEffect, useState } from "react";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import HistoryCard from "../components/history/HistoryCard";

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

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await getHistory();

      if (response.success) {
        setHistory(response.history);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmed) return;

    try {
      const response = await deleteHistory(id);

      if (response.success) {
        loadHistory();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAll = async () => {
    if (history.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete ALL history?"
    );

    if (!confirmed) return;

    try {
      const response = await deleteAllHistory();

      if (response.success) {
        loadHistory();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl p-8">
        <DashboardNavbar />

        <div className="mt-8 mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Mood History
          </h1>

          <button
            onClick={handleDeleteAll}
            className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
          >
            Delete All
          </button>
        </div>

        <HistoryCard
          history={history}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}