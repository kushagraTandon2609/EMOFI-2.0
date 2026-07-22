import api from "./api";

export const detectEmotion = async (image: string) => {
    const response = await api.post("/detect", {
        image,
    });

    return response.data;
};