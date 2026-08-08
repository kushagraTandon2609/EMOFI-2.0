import api from "./api";

export interface AnalyticsData {
  total: number;

  most_common: string | null;

  last_detection: {
    emotion: string;
    confidence: number;
    created_at: string;
  } | null;

  distribution: Record<string, number>;

  mood_trend: {
    date: string;
    happy: number;
    sad: number;
    angry: number;
    surprise: number;
  }[];

  confidence_trend: {
    date: string;
    confidence: number;
  }[];
}

export interface AnalyticsResponse {
  success: boolean;
  analytics: AnalyticsData;
}

export const getAnalytics = async (): Promise<AnalyticsResponse> => {
  const response = await api.get("/analytics");

  return response.data;
};