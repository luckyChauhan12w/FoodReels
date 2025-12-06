import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../lib/api";

const UserRegister = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("FORM DATA:", data);

    try {
      const res = await api.post("api/v1/auth/register-user", data, {
        withCredentials: true,
      });

      console.log("REGISTER SUCCESS:", res.data);

      navigate("/");
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      if (err.response) {
        console.log("SERVER MESSAGE:", err.response.data);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-linear-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] overflow-hidden p-5">
      {/* Background Shape */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[40vw] h-[40vw] bg-red-600/30 blur-[120px] top-[-10%] left-[-10%]" />
        <div className="absolute w-[35vw] h-[35vw] bg-red-400/20 blur-[150px] bottom-[-5%] right-[-5%]" />
      </div>

      {/* Glass Card */}
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl max-w-sm w-full overflow-hidden">
        {/* Banner */}
        <div className="h-36 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Food Banner"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-white text-center tracking-wide">
            User Registration
          </h2>

          {/* Fullname */}
          <div className="mb-6">
            <label className="text-sm text-gray-200 font-medium">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName", {
                required: "Full name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
              placeholder="Enter your full name"
              className="w-full mt-2 bg-transparent text-white border-b border-gray-400/60 
              focus:border-red-500 outline-none py-2 transition"
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="text-sm text-gray-200 font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              placeholder="Enter your email"
              className="w-full mt-2 bg-transparent text-white border-b border-gray-400/60 
              focus:border-red-500 outline-none py-2 transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-8">
            <label className="text-sm text-gray-200 font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder="Create a password"
              className="w-full mt-2 bg-transparent text-white border-b border-gray-400/60
              focus:border-red-500 outline-none py-2 transition"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Link
            to="/user/login"
            className="block text-right text-red-400 hover:underline"
          >
            Back to Login
          </Link>

          <button
            type="submit"
            className="mt-4 w-full py-3 rounded-lg bg-red-600 text-white font-semibold
            hover:bg-red-700 transition shadow-lg shadow-red-700/20"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
