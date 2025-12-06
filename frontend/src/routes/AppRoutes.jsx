import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "../pages/auth/UserLogin.jsx";
import UserRegister from "../pages/auth/UserRegister";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import Home from "../pages/general/Home.jsx";
import CreateFood from "../pages/food-partner/CreateFood.jsx";
import FoodPartnerProfile from "../pages/food-partner/FoodPartnerProfile.jsx";

const AppRoutes = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegister />}
        />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route
          path="/food-partner-profile/:id"
          element={<FoodPartnerProfile />}
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
