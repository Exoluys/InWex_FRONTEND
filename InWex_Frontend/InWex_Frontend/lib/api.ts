import { BASE_URL } from "@/components/config";
import axios from "axios";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) config.headers.Authorization = `Token ${token}`

    return config
})
