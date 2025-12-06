import { useForm } from "react-hook-form";
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateFood = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("video", data.video[0]);
    formData.append("name", data.name);
    formData.append("description", data.description);

    try {
      setUploading(true);

      await api.post("api/v1/foodItem/create", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      reset(); // clear all fields
      setPreview(null); // clear preview
      navigate("/food-partner-profile");
    } catch (err) {
      console.error("UPLOAD ERROR:", err?.response?.data || err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-linear-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] overflow-hidden p-5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[40vw] h-[40vw] bg-red-600/30 blur-[120px] top-[-10%] left-[-10%]" />
        <div className="absolute w-[35vw] h-[35vw] bg-red-400/20 blur-[150px] bottom-[-5%] right-[-5%]" />
      </div>

      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl max-w-md w-full overflow-hidden">
        <div className="h-36 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9"
            alt="Food Banner"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-white text-center tracking-wide">
            Create Food Item
          </h2>

          {/* Name */}
          <div className="mb-6">
            <label className="text-sm text-gray-200 font-medium">
              Food Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Food name is required" })}
              placeholder="e.g., Tasty Cake"
              className="w-full mt-2 bg-transparent text-white border-b border-gray-400/60 focus:border-red-500 outline-none py-2 transition"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="text-sm text-gray-200 font-medium">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Short description of your dish"
              className="w-full mt-2 bg-transparent text-white border-b border-gray-400/60 focus:border-red-500 outline-none py-2 transition resize-none h-20"
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Video Upload */}
          <div className="mb-6">
            <label className="text-sm text-gray-200 font-medium">
              Upload Video
            </label>
            <input
              type="file"
              accept="video/*"
              {...register("video", { required: "Video file is required" })}
              className="w-full mt-2 text-gray-300"
              onChange={(e) =>
                setPreview(URL.createObjectURL(e.target.files[0]))
              }
            />
            {errors.video && (
              <p className="text-red-400 text-sm mt-1">
                {errors.video.message}
              </p>
            )}

            {preview && (
              <video
                src={preview}
                controls
                className="mt-4 w-full rounded-lg border border-white/20"
              />
            )}
          </div>

          {/* Upload Button */}
          <button
            type="submit"
            disabled={uploading}
            className={`mt-4 w-full py-3 rounded-lg text-white font-semibold transition shadow-lg shadow-red-700/20
              ${
                uploading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
          >
            {uploading ? (
              <div className="flex justify-center items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Uploading...
              </div>
            ) : (
              "Create Food"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
