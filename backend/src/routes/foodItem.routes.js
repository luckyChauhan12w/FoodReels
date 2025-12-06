import express from 'express';
import { createFood, getFoodItem } from "../controllers/foodItem.controller.js"
import { authFoodPartner, authUser } from "../middleware/auth.middleware.js"
import multer from "multer"

const upload = multer({
    storage: multer.memoryStorage(),
})

const router = express.Router();

// prefix ---> /api/v1/foodItem/ [protected]
router.post('/create', authFoodPartner, upload.single("video"), createFood);

router.get('/getFoodItem', authUser, getFoodItem)


export default router;
