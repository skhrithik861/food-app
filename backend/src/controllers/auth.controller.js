//user
const userModel = require("../models/user.model");

//food partner
const foodPartnerModel = require("../models/foodpartner.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

//user register
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const isUserAlreadyExists = await userModel.findOne({
    email,
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "user already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

//user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    message: "user login succesfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

//user logout
const logoutUser = async (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({
    message: "logout successful",
  });
};

//foodpartner register
const registerFoodPartner = async (req, res) => {
  const { name, contactName, phone, address, email, password } = req.body;
  const isAccountExist = await foodPartnerModel.findOne({
    email,
  });

  if (isAccountExist) {
    return res.status(400).json({
      message: " foodPartner account already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    contactName,
    phone,
    address,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    message: "Food partner registered successfully",
    
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
      address: foodPartner.address,
      contactName: foodPartner.contactName,
      phone: foodPartner.phone,
    },
  });
};

//foodpartner login
const loginFoodPartner = async (req, res) => {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({
    email,
  });

  if (!foodPartner) {
    return res.status(400).json({
      messsage: "invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    message: "foodPartner account logged in successfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
};

//foodpartner logout
const logoutFoodPartner = (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({
    message: "foodPartner logged out successfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,

  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
