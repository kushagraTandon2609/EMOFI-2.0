import { useEffect, useState } from "react";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import AnalyticsCard from "../components/analytics/AnalyticsCard";

import { getAnalytics } from "../services/analytics";

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

export default function Analytics() {

  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {

      const response = await getAnalytics();

      if (response.success) {
        setAnalytics(response.analytics);
      }

    } catch (error) {
      console.error(error);
    }
  };

  if (!analytics) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl p-8">

        <DashboardNavbar />

        <div className="mt-8">

          <AnalyticsCard analytics={analytics} />

        </div>

      </div>

    </div>
  );
}