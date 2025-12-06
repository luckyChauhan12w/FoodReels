import axios from "axios";
import axiosRetry from "axios-retry";

// Create the axios instance
const api = axios.create({
    baseURL:
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_API_URL_DEV
            : import.meta.env.VITE_API_URL_PRO,
    timeout: 10000, // Keep your 10s limit, don't just increase it blindly
    headers: {
        "Content-Type": "application/json",
    },
});

// Configure retry behavior
axiosRetry(api, {
    retries: 3, // Attempt the request 3 times total
    retryDelay: (retryCount) => {
        console.log(`Retry attempt: ${retryCount}`);
        return retryCount * 1000; // Wait 1s, then 2s, then 3s
    },
    retryCondition: (error) => {
        // Retry on network errors or if the request timed out (ECONNABORTED)
        return (
            axiosRetry.isNetworkOrIdempotentRequestError(error) ||
            error.code === "ECONNABORTED"
        );
    },
});

// Optional: Add a response interceptor for better error debugging
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === "ECONNABORTED") {
            console.error("Request timed out after 10 seconds.");
            // You could trigger a toast notification here
        }
        return Promise.reject(error);
    }
);

export default api;
