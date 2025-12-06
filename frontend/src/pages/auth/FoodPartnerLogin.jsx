import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/api";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "testpartner@gmail.com",
      password: "test@123",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("api/v1/auth/login-foodPartners", data, {
        withCredentials: true,
      });

      navigate("/create-food");
    } catch (err) {
      console.error("LOGIN ERROR:", err?.response?.data || err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-linear-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] overflow-hidden p-5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[40vw] h-[40vw] bg-red-600/30 blur-[120px] top-[-10%] left-[-10%]" />
        <div className="absolute w-[35vw] h-[35vw] bg-red-400/20 blur-[150px] bottom-[-5%] right-[-5%]" />
      </div>

      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl max-w-sm w-full overflow-hidden">
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
            Partner Login
          </h2>

          <div className="mb-6">
            <label className="text-sm text-gray-200 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full mt-2 bg-transparent text-white border-b border-gray-400/60 focus:border-red-500 outline-none py-2 transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-8">
            <label className="text-sm text-gray-200 font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="w-full mt-2 bg-transparent text-white border-b border-gray-400/60 focus:border-red-500 outline-none py-2 transition"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Link
            to="/food-partner/register"
            className="block text-right text-red-400 hover:underline"
          >
            Create new account
          </Link>

          <button
            type="submit"
            className="mt-4 w-full py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-lg shadow-red-700/20"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
