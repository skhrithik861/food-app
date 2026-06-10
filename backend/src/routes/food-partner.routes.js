const express = require('express');
const foodPartnerController = require("../controllers/food-partner.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();


/* /api/food-partner/:id */
// Public: allow visitors to view a food partner's profile without logging in
router.get("/:id", foodPartnerController.getFoodPartnerById)

module.exports = router;