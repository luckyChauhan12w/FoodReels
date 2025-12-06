import { useEffect, useState, useRef, useCallback } from "react";

import axios from "axios";
import "./home.css";
import ReelVideo from "../../components/ReelVideo";
import { useHandControls } from "../../hooks/useHandControls";
import api from "../../lib/api";

const Home = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const currentVideoRef = useRef(null);

  const registerCurrentVideo = useCallback((el) => {
    currentVideoRef.current = el;
  }, []);

  useHandControls({
    containerRef,
    getCurrentVideo: () => currentVideoRef.current,
  });

  const fetchReels = async () => {
    try {
      const res = await api.get(
        "api/v1/foodItem/getFoodItem",
        { withCredentials: true } // required if using cookies
      );

      const items = res.data?.foodItem || [];

      const mapped = items.map((item) => ({
        id: item._id,
        src: item.video,
        desc: item.description,
        store: `/food-partner-profile/${item.foodPartner}`,
      }));

      setReels(mapped);
    } catch (err) {
      console.log("401 Error:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-linear-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[40vw] h-[40vw] bg-red-600/30 blur-[140px] top-[-12%] left-[-12%]" />
        <div className="absolute w-[35vw] h-[35vw] bg-red-400/20 blur-[150px] bottom-[-8%] right-[-8%]" />
      </div>

      <div className="absolute inset-0 pointer-events-none select-none opacity-20 text-white z-10">
        <span className="absolute text-5xl top-10 left-16">🍔</span>
        <span className="absolute text-4xl top-[20%] right-[12%]">🍕</span>
        <span className="absolute text-3xl top-[50%] left-[10%]">🥗</span>
        <span className="absolute text-4xl bottom-12 left-[20%]">🍜</span>
        <span className="absolute text-5xl bottom-[25%] right-[18%]">🍟</span>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-screen md:overflow-y-scroll snap-y snap-mandatory reels-container z-20"
      >
        {loading ? (
          <div className="text-white text-center mt-10 text-lg">Loading...</div>
        ) : reels.length === 0 ? (
          <div className="text-white text-center mt-10 text-lg">
            No reels found
          </div>
        ) : (
          reels.map((item) => (
            <ReelVideo
              key={item.id}
              item={item}
              registerCurrentVideo={registerCurrentVideo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
