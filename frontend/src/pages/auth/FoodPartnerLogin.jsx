import { useParams } from "react-router-dom";
import api from "../../lib/api";
import { useEffect, useState } from "react";

const FoodPartnerProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api
      .get(`api/v1/food-partner/${id}`, { withCredentials: true })
      .then((res) => {
        const partner = res.data?.partner?.[0];
        if (!partner) return;

        setProfile(partner);
        setVideos(partner.foodItems || []);
      });
  }, [id]);

  return (
    <div className="relative min-h-screen bg-linear-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] overflow-hidden">
      {/* BACKGROUND GLOW SAME AS LOGIN PAGE */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[40vw] h-[40vw] bg-red-600/30 blur-[120px] top-[-10%] left-[-10%]" />
        <div className="absolute w-[35vw] h-[35vw] bg-red-400/20 blur-[150px] bottom-[-5%] right-[-5%]" />
      </div>

      {/* FULL WIDTH BANNER (EXACT LIKE LOGIN PAGE) */}
      <div className="h-52 w-full relative">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          alt="Food Banner"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* GLASS CARD SAME AS LOGIN PAGE */}
      <div className="max-w-4xl mx-auto -mt-20 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 relative z-10">
        {/* PROFILE HEADER */}
        <div className="flex items-center gap-6">
          <img
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=400&auto=format&fit=crop"
            className="w-28 h-28 rounded-full border border-white/30 shadow-lg object-cover"
          />

          <div>
            <h1 className="text-3xl font-semibold text-white tracking-wide">
              {profile?.name}
            </h1>
            <p className="text-gray-300 mt-1">{profile?.email}</p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10 text-center">
          <div className="p-4 rounded-xl bg-white/10 border border-white/20">
            <p className="text-sm text-gray-300">Total Meals</p>
            <p className="text-2xl font-semibold text-red-400">0</p>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/20">
            <p className="text-sm text-gray-300">Customers Served</p>
            <p className="text-2xl font-semibold text-red-400">0</p>
          </div>
        </div>

        {/* REELS SECTION */}
        <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
          Reels Videos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video._id}
              className="rounded-xl overflow-hidden border border-white/20 bg-black shadow-lg hover:scale-[1.02] transition-transform"
            >
              <video
                src={video.video}
                muted
                autoPlay
                loop
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerProfile;
