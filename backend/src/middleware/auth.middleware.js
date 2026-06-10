const foodPartnerModel = require("../models/foodpartner.model");

const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");

//for adding food, protected routes
const authFoodPartnerMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "please login first",
    });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodPartnerModel.findById(decoded.id);
    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
};

//for scrolling food

const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "plz login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
};

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware
};
