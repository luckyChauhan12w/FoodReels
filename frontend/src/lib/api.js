import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_API_URL_DEV
            : import.meta.env.VITE_API_URL_PRO,
    timeout: 10000,
});

export default api;
