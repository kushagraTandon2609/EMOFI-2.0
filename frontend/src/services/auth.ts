import api from "./api";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await api.post("/register", data);
  return response.data;
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const response = await api.post("/login", data);
  return response.data;
}