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



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://frontend-vercel-3ksg.vercel.app",
    ],
    credentials: true,
  })
);




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
