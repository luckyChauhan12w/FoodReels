import foodItemModel from "../models/foodItem.model.js";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuidv4 } from "uuid";



async function createFood(req, res) {
    try {
        if (!req.file?.buffer) {
            return res.status(400).json({ message: "File is required" });
        }

        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (!req.foodPartner?._id) {
            return res.status(401).json({ message: "Unauthorized food partner" });
        }

        const fileUploadResult = await uploadFile(req.file.buffer, uuidv4());

        if (!fileUploadResult?.url || !fileUploadResult?.fileId) {
            return res.status(400).json({ message: "Failed to upload file to cloud" });
        }

        const foodItem = await foodItemModel.create({
            name,
            video: fileUploadResult.url,
            foodId: fileUploadResult.fileId,
            description,
            foodPartner: req.foodPartner._id
        });

        if (!foodItem) {
            return res.status(500).json({ message: "Database insert failed" });
        }

        return res.status(201).json({
            message: "Food Item Created Successfully",
            food: foodItem
        });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

async function getFoodItem(req, res) {
    const foodItem = await foodItemModel.find({});
    return res.status(201).json({
        message: "Food Item Fetched successfully!",
        foodItem
    })
}

export { createFood, getFoodItem }