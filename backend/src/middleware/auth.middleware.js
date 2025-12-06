import jwt from 'jsonwebtoken';
import foodPartnersModel from "../models/foodPartner.model.js"
import userModel from "../models/user.model.js"

async function authFoodPartner(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token || typeof token !== 'string' || token.trim() === '') {
            return res.status(401).json({ message: "Invalid Token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodPartner = await foodPartnersModel.findById(decoded.id);

        req.foodPartner = foodPartner;


        next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

async function authUser(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token || typeof token !== 'string' || token.trim() === '') {
            return res.status(401).json({ message: "Invalid Token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        req.user = user;

        next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export { authFoodPartner, authUser }