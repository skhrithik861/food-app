//create server
const express = require("express");

const cookiePaser = require("cookie-parser");

//auth routes
const authRoutes = require("./routes/auth.routes");
//food routes
const foodRoutes = require("./routes/food.routes");

const foodPartnerRoutes = require("./routes/food-partner.routes");

const cors = require("cors");

//middleware
const app = express();



// Configure CORS with runtime allowed origins and a dynamic origin checker.
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || "";
const allowedOrigins = allowedOriginsEnv
  ? allowedOriginsEnv.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://127.0.0.1:5173"];

const corsOptions = {
  origin: (origin, cb) => {
    // allow requests with no origin (like mobile apps, curl, or same-origin)
    if (!origin) return cb(null, true);

    // allow explicit wildcard
    if (allowedOrigins.indexOf("*") !== -1) return cb(null, true);

    // allow exact matches
    if (allowedOrigins.includes(origin)) return cb(null, true);

    // allow Vercel deployments (your-frontend.vercel.app)
    if (origin.endsWith(".vercel.app") || origin.endsWith(".now.sh"))
      return cb(null, true);

    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));




app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//for token middleware
app.use(cookiePaser());

app.get("/", (req, res) => {
  res.send("hi");
});

//use auth routes
app.use("/api/auth", authRoutes);

//use food routes
app.use("/api/food", foodRoutes);

app.use("/api/food-partner", foodPartnerRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

module.exports = app;
