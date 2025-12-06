import { useEffect, useRef } from "react";

// Hook: useHandControls
// - containerRef: ref to the reels container (for scrolling)
// - getCurrentVideo: callback that returns the currently-visible video element
export const useHandControls = ({ containerRef, getCurrentVideo }) => {
    const previewRef = useRef(null);

    useEffect(() => {
        let camera = null;
        let hands = null;
        let running = true;
        let lastPalmY = null;
        let lastScrollTime = 0;
        let lastTimestamp = Date.now();

        const scrollReel = (container, direction) => {
            if (!container) return;
            const sections = Array.from(container.querySelectorAll("section.snap-start"));
            if (!sections.length) return;

            let bestIndex = 0;
            let bestVisible = -1;
            for (let i = 0; i < sections.length; i++) {
                const rect = sections[i].getBoundingClientRect();
                const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
                if (visible > bestVisible) {
                    bestVisible = visible;
                    bestIndex = i;
                }
            }

            let target = bestIndex;
            if (direction === "next") target = Math.min(sections.length - 1, bestIndex + 1);
            else if (direction === "prev") target = Math.max(0, bestIndex - 1);

            if (target !== bestIndex) sections[target].scrollIntoView({ behavior: "smooth", block: "start" });
        };

        const waitForMediaPipe = (maxAttempts = 20) => {
            return new Promise((resolve) => {
                let attempts = 0;
                const checkInterval = setInterval(() => {
                    attempts++;
                    if (window.Hands && window.Camera) {
                        clearInterval(checkInterval);
                        console.log("✓ MediaPipe scripts loaded");
                        resolve(true);
                    } else if (attempts >= maxAttempts) {
                        clearInterval(checkInterval);
                        console.error("✗ MediaPipe scripts not loaded after timeout");
                        resolve(false);
                    }
                }, 500);
            });
        };

        const setup = async () => {
            try {
                // Wait for MediaPipe scripts to be available
                const mediapipeReady = await waitForMediaPipe();
                if (!mediapipeReady) {
                    console.error("✗ MediaPipe not available. Check CDN scripts in index.html");
                    return;
                }

                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    console.error("✗ Camera API not supported");
                    return;
                }

                // Detect if mobile device - INCREASED MOBILE SIZE
                const isMobile = window.innerWidth <= 768;
                const previewWidth = isMobile ? "160px" : "280px";
                const previewHeight = isMobile ? "140px" : "240px";

                // Create preview video element with responsive size
                const preview = document.createElement("video");
                preview.autoplay = true;
                preview.muted = true;
                preview.playsInline = true;
                preview.style.position = "fixed";
                preview.style.width = previewWidth;
                preview.style.height = previewHeight;
                preview.style.objectFit = "cover";
                preview.style.right = "16px";
                preview.style.bottom = "16px";
                preview.style.zIndex = "9998";
                preview.style.borderRadius = "12px";
                preview.style.border = "3px solid #ef4444";
                preview.style.boxShadow = "0 6px 20px rgba(0,0,0,0.7)";
                document.body.appendChild(preview);
                previewRef.current = preview;

                // Create canvas overlay for hand skeleton drawing
                const canvas = document.createElement("canvas");
                canvas.style.position = "fixed";
                canvas.style.width = previewWidth;
                canvas.style.height = previewHeight;
                canvas.style.right = "16px";
                canvas.style.bottom = "16px";
                canvas.style.zIndex = "9999";
                canvas.style.borderRadius = "12px";
                canvas.style.pointerEvents = "none";
                document.body.appendChild(canvas);

                const ctx = canvas.getContext("2d");
                canvas.width = 1280;
                canvas.height = 960;

                // Hand skeleton connections (21 landmarks)
                const handConnections = [
                    [0, 1], [1, 2], [2, 3], [3, 4],         // Thumb
                    [0, 5], [5, 6], [6, 7], [7, 8],         // Index
                    [0, 9], [9, 10], [10, 11], [11, 12],    // Middle
                    [0, 13], [13, 14], [14, 15], [15, 16],  // Ring
                    [0, 17], [17, 18], [18, 19], [19, 20],  // Pinky
                    [5, 9], [9, 13], [13, 17],              // Palm connections
                ];


                // Request camera access
                let stream = null;
                try {
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: "user", width: 1280, height: 720 },
                        audio: false,
                    });
                    preview.srcObject = stream;
                    console.log("✓ Camera stream started");
                } catch (err) {
                    console.error("✗ Camera error:", err.name, err.message);
                    alert("Camera access denied. Please check browser permissions.");
                    return;
                }

                // Initialize Hands
                hands = new window.Hands({
                    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
                });

                hands.setOptions({
                    maxNumHands: 1,
                    modelComplexity: 0,
                    minDetectionConfidence: 0.5,
                    minTrackingConfidence: 0.5,
                });

                // Handle detection results
                hands.onResults((results) => {
                    if (!running) return;

                    // Clear canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    const landmarks = results.multiHandLandmarks?.[0];
                    if (landmarks) {
                        // Draw hand connections (bones)
                        ctx.strokeStyle = "#00D4FF";
                        ctx.lineWidth = 5;
                        ctx.lineCap = "round";
                        ctx.lineJoin = "round";

                        for (const [start, end] of handConnections) {
                            const startLm = landmarks[start];
                            const endLm = landmarks[end];
                            if (startLm && endLm) {
                                ctx.beginPath();
                                ctx.moveTo(startLm.x * canvas.width, startLm.y * canvas.height);
                                ctx.lineTo(endLm.x * canvas.width, endLm.y * canvas.height);
                                ctx.stroke();
                            }
                        }

                        // Draw hand landmarks (dots)
                        ctx.fillStyle = "#FFFFFF";
                        for (const lm of landmarks) {
                            ctx.beginPath();
                            ctx.arc(lm.x * canvas.width, lm.y * canvas.height, 8, 0, 2 * Math.PI);
                            ctx.fill();
                        }
                    }

                    if (!landmarks) {
                        lastPalmY = null;
                        lastTimestamp = Date.now();
                        return;
                    }

                    // Calculate palm Y position
                    const palmY =
                        (landmarks[0].y +
                            landmarks[1].y +
                            landmarks[5].y +
                            landmarks[9].y +
                            landmarks[13].y +
                            landmarks[17].y) /
                        6;

                    // Count extended fingers
                    const fingerTips = [8, 12, 16, 20];
                    const fingerPIPs = [6, 10, 14, 18];
                    let extendedCount = 0;

                    for (let i = 0; i < fingerTips.length; i++) {
                        if (landmarks[fingerTips[i]].y < landmarks[fingerPIPs[i]].y) {
                            extendedCount++;
                        }
                    }

                    // Hand gesture: open (3+ fingers) vs closed
                    const isHandOpen = extendedCount >= 3;

                    // Control current video
                    const video = typeof getCurrentVideo === "function" ? getCurrentVideo() : null;
                    if (video) {
                        try {
                            if (isHandOpen) {
                                if (video.paused) {
                                    video.play().catch((e) => console.log("Play failed:", e));
                                }
                            } else {
                                if (!video.paused) {
                                    video.pause();
                                }
                            }
                        } catch (e) {
                            console.error("Video control error:", e);
                        }
                    }

                    // Detect vertical movement with SPEED CHECK for scrolling
                    if (lastPalmY !== null) {
                        const now = Date.now();
                        const timeDelta = now - lastTimestamp;
                        const palmDelta = palmY - lastPalmY;
                        
                        // Calculate speed (distance / time)
                        const speed = timeDelta > 0 ? Math.abs(palmDelta) / timeDelta : 0;
                        
                        // Require FASTER movement (higher speed threshold)
                        const movementThreshold = 0.08; // Increased from 0.04 - need bigger movement
                        const speedThreshold = 0.0002; // Speed must be above this (fast swipe)

                        if (Math.abs(palmDelta) > movementThreshold && 
                            speed > speedThreshold && 
                            now - lastScrollTime > 800) {
                            lastScrollTime = now;
                            // Hand up (negative delta) = scroll next, Hand down (positive delta) = scroll prev
                            if (palmDelta < 0) {
                                console.log(`↑ Fast hand up (speed: ${speed.toFixed(4)}) - scroll next`);
                                scrollReel(containerRef?.current, "next");
                            } else {
                                console.log(`↓ Fast hand down (speed: ${speed.toFixed(4)}) - scroll prev`);
                                scrollReel(containerRef?.current, "prev");
                            }
                        }
                    }

                    lastPalmY = palmY;
                    lastTimestamp = Date.now();
                });

                // Initialize Camera
                camera = new window.Camera(preview, {
                    onFrame: async () => {
                        if (!running) return;
                        try {
                            await hands.send({ image: preview });
                        } catch (e) {
                            console.error("Hand detection error:", e.message);
                        }
                    },
                    width: 640,
                    height: 480,
                });

                camera.start();
                console.log("✓ Hand detection started");
            } catch (err) {
                console.error("Setup error:", err);
            }
        };

        // Start setup after a small delay to allow DOM to be ready
        const setupTimeout = setTimeout(setup, 500);

        return () => {
            running = false;
            clearTimeout(setupTimeout);

            try {
                if (camera && typeof camera.stop === "function") camera.stop();
            } catch (e) { }

            try {
                if (hands && typeof hands.close === "function") hands.close();
            } catch (e) { }

            if (previewRef.current) {
                try {
                    const tracks = previewRef.current.srcObject?.getTracks?.() || [];
                    tracks.forEach((track) => track.stop());
                } catch (e) { }

                try {
                    if (previewRef.current.parentNode) {
                        previewRef.current.parentNode.removeChild(previewRef.current);
                    }
                } catch (e) { }
            }

            // Clean up canvas overlay
            const allCanvases = document.querySelectorAll("canvas[style*='position: fixed']");
            allCanvases.forEach((c) => {
                try {
                    if (c.style.zIndex === "9999" && c.parentNode) {
                        c.parentNode.removeChild(c);
                    }
                } catch (e) { }
            });

            previewRef.current = null;
        };
    }, [containerRef, getCurrentVideo]);
};
