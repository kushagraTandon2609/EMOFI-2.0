import { useEffect, useState } from "react";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import HistoryCard from "../components/history/HistoryCard";
import { getHistory } from "../services/history";

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

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl p-8">

        <DashboardNavbar />

        <div className="mt-8">

          <HistoryCard
            history={history}
          />

        </div>

      </div>

    </div>
  );
}