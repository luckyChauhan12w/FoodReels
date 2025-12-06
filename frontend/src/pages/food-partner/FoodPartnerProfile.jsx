import { useParams } from "react-router-dom";
import api from "../../lib/api";
import { useEffect, useState } from "react";

const FoodPartnerProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  // Define colors based on the user's request
  const primaryColor = "#511518"; // Dark Burgundy/Brown
  const accentColor = "#E7000B"; // Vibrant Red
  const secondaryColor = "#3B2D2D"; // Dark Brown/Gray

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`api/v1/food-partner/${id}`, { withCredentials: true })
      .then((res) => {
        const partner = res.data?.partner?.[0];
        if (!partner) return;

        setProfile(partner);
        setVideos(partner.foodItems || []);
      })
      .catch((error) => {
        console.error("Failed to fetch food partner data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <main
        className="w-full min-h-screen flex items-center justify-center p-6"
        style={{
          background: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})`,
        }}
      >
        <div className="text-xl text-white">Loading Partner Profile...</div>
      </main>
    );
  }

  // Handle case where profile is not found after loading
  if (!profile) {
    return (
      <main
        className="w-full min-h-screen flex items-center justify-center p-6"
        style={{
          background: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})`,
        }}
      >
        <div className="text-xl text-white">404 | Food Partner Not Found.</div>
      </main>
    );
  }

  return (
    <main
      className="w-full min-h-screen p-6"
      style={{
        background: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})`,
        color: "#FFFFFF",
      }}
    >
      {/* Profile Section */}
      <section
        className="max-w-3xl mx-auto shadow-2xl p-8 mb-4"
        style={{ backgroundColor: secondaryColor }} // Dark card background
      >
        <div className="flex items-center gap-6">
          <img
            className="w-24 h-24 rounded-full object-cover border-4"
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=300&auto=format&fit=crop"
            alt={`${profile?.name} Profile`}
          />

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold" style={{ color: accentColor }}>
              {profile?.name}
            </h1>
            <p className="text-gray-300">
              {profile?.address || "No address provided"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-6 pt-4 border-t border-gray-600">
          <div>
            <p className="text-gray-400 text-sm">Total Meals</p>
            <p
              className="text-2xl font-extrabold"
              style={{ color: accentColor }}
            >
              {profile.totalMeals || 0}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Customers Served</p>
            <p
              className="text-2xl font-extrabold"
              style={{ color: accentColor }}
            >
              {profile.customersServed || 0}
            </p>
          </div>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0 sm:gap-6">
          {videos.map((v) => (
            <div
              key={v._id}
              className="w-full h-80 bg-black overflow-hidden shadow-lg border border-black"
            >
              <video
                src={v.video}
                muted
                loop
                autoPlay
                controls={false} // Cleaned up the video player interface
                className="w-full h-full object-cover transform hover:scale-[1.02] transition duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FoodPartnerProfile;
