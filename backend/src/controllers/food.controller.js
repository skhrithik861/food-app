const foodModel = require("../models/food.model");

const likeModel = require("../models/likes.model");

const saveModel = require("../models/save.model");
const storageService = require("../services/storage.service");

const { v4: uuid } = require("uuid");

const createFood = async (req, res) => {
  // console.log(req.body);
  // console.log(req.foodPartner);
  // console.log(req.file);

  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid(),
  );

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message: "food created succesfully",
    food: foodItem,
  });
};

const getFoodItems = async (req, res) => {
  const foodItems = await foodModel.find({});

  res.status(200).json({
    message: "food items fatched succesfully",
    foodItems,
  });
};

const likeFood = async (req, res) => {
  try {
    const { foodId } = req.body;
    const user = req.user;

    // Check if foodId is provided
    if (!foodId) {
      return res.status(400).json({
        message: "foodId is required",
      });
    }

    // Check if user already liked this food
    const existingLike = await likeModel.findOne({
      user: user._id,
      food: foodId,
    });

    // ====================
    // UNLIKE
    // ====================
    if (existingLike) {
      await existingLike.deleteOne();

      const updatedFood = await foodModel.findByIdAndUpdate(
        foodId,
        {
          $inc: { likeCount: -1 }, // decrease by 1
        },
        {
          new: true, // return updated document
        },
      );

      return res.status(200).json({
        liked: false,
        likeCount: updatedFood.likeCount,
      });
    }

    // ====================
    // LIKE
    // ====================
    await likeModel.create({
      user: user._id,
      food: foodId,
    });

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        $inc: { likeCount: 1 }, // increase by 1
      },
      {
        new: true, // return updated document
      },
    );

    return res.status(200).json({
      liked: true,
      likeCount: updatedFood.likeCount,
    });
  } catch (error) {
    console.error("likeFood error:", error);

    return res.status(500).json({
      message: "Unable to process like",
    });
  }
};

//

const saveFood = async (req, res) => {
  try {
    const { foodId } = req.body;

    const existing = await saveModel.findOne({
      user: req.user._id,
      food: foodId,
    });

    if (existing) {
      await existing.deleteOne();

      const food = await foodModel.findByIdAndUpdate(
        foodId,
        {
          $inc: { savesCount: -1 },
        },
        {
          returnDocument: "after",
        },
      );

      return res.json({
        saved: false,
        savesCount: food.savesCount,
      });
    }

    await saveModel.create({
      user: req.user._id,
      food: foodId,
    });

    const food = await foodModel.findByIdAndUpdate(
      foodId,
      {
        $inc: { savesCount: 1 },
      },
      {
        returnDocument: "after",
      },
    );

    return res.json({
      saved: true,
      savesCount: food.savesCount,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Save failed",
    });
  }
};

const getSaveFood = async (req, res) => {
  try {
    const user = req.user;
    const saveFoods = await saveModel.find({ user: user._id }).populate("food");

    if (!saveFoods || saveFoods.length === 0) {
      return res.status(404).json({ message: "No saved food found" });
    }

    return res.status(200).json({ saveFoods });
  } catch (err) {
    console.error("getSaveFood error:", err);
    return res.status(500).json({ message: "Unable to fetch saved foods" });
  }
};




module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSaveFood,
};
