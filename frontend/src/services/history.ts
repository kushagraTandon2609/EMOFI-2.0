import api from "./api";

export const getHistory = async () => {
  const response = await api.get("/history");
  return response.data;
};

export const deleteHistory = async (historyId: number) => {
  const response = await api.delete(`/history/${historyId}`);
  return response.data;
};

export const deleteAllHistory = async () => {
  const response = await api.delete("/history/all");
  return response.data;
};