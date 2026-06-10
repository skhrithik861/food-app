const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

// api /food/protected
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

//food items scrolling api

router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

//likefood api
router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood,
);

router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood,
);

router.get(
  "/saved",
  authMiddleware.authUserMiddleware,
  foodController.getSaveFood,
);

module.exports = router;
