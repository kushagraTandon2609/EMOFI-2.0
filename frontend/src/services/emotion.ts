import api from "./api";

export const detectEmotion = async (image: string) => {
    const response = await api.post(
        "/detect",
        {
            image,
        },
        {
            timeout: 15000,
        }
    );

    return response.data;
};