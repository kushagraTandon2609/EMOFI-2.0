import api from "./api";

export async function detectEmotion(image: string) {
  const response = await api.post("/detect", {
    image,
  });

  return response.data;
}