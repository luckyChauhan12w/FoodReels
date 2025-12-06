import express from 'express';
import { getFoodPartnerByID } from "../controllers/auth.controller.js";

const router = express.Router();

router.get('/food-partner/:id', getFoodPartnerByID);

export default router;