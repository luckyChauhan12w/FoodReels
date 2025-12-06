import React, { useRef } from "react";
import { useVideoObserver } from "../hooks/useVideoObserver";

const ReelVideo = React.memo(({ item, registerCurrentVideo }) => {
  const videoRef = useRef(null);

  useVideoObserver(videoRef, (el) => {
    if (typeof registerCurrentVideo === "function") registerCurrentVideo(el);
  });

  return (
    <section key={item.id} className="snap-start h-screen relative">
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/5"></div>

      <div className="absolute bottom-3 left-3 right-4 z-30">
        <p className="text-white w-[80%] text-sm two-line-clamp tracking-wide">
          {item.desc}
        </p>

        <a
          href={item.store}
          className="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition shadow-lg shadow-red-700/20"
        >
          Visit Store
        </a>
      </div>
    </section>
  );
});

export default ReelVideo;
