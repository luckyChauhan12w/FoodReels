import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
  getFoodPartnerByID
} from '../controllers/auth.controller.js';

const router = express.Router();

// user
router.post('/register-user', registerUser);
router.post('/login-user', loginUser);
router.post('/logout-user', logoutUser);

// food partners
router.post('/register-foodPartners', registerFoodPartner);
router.post('/login-foodPartners', loginFoodPartner);
router.post('/logout-foodPartners', logoutFoodPartner);


export default router;
