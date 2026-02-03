const foodModel = require('../models/food.model');
const storageService = require('../services/storage.services');
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
    try {
        console.log("🔥🔥🔥 CREATE FOOD API HIT 🔥🔥🔥");

        console.log("FOOD PARTNER:", req.foodPartner);
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        if (!req.file) {
            return res.status(400).json({
                message: "Video file is required",
            });
        }

        // Upload video to ImageKit
        const fileUploadResult = await storageService.uploadFile(
            req.file.buffer,
            `${uuid()}.mp4`
        );

        // Save food in DB
        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id,
        });

        console.log("UPLOAD RESULT:", fileUploadResult);

        return res.status(201).json({
            message: "food created successfully",
            food: foodItem,
        });

    } catch (error) {
        console.error("CREATE FOOD ERROR:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}

module.exports = {
    createFood,
    getFoodItems
};
