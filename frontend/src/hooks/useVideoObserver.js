import { useEffect } from "react";

// Now accepts an optional onVisible callback: onVisible(element|null)
export const useVideoObserver = (videoRef, onVisible) => {
    useEffect(() => {
        const videoElement = videoRef.current;

        if (!videoElement) return;

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.9,
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (typeof onVisible === "function") onVisible(videoElement);

                videoElement.play().catch((error) => {
                    console.error("Video play failed:", error);
                });
            } else {
                if (typeof onVisible === "function") onVisible(null);

                videoElement.pause();
                try {
                    videoElement.currentTime = 0;
                } catch (e) { }
            }
        }, options);

        observer.observe(videoElement);

        return () => {
            observer.unobserve(videoElement);
            observer.disconnect();
        };
    }, [videoRef, onVisible]);
};