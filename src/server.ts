import express from "express";
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();
import userRouter from "./controllers/user/user.routes";
import productRouter from "./controllers/products/products.routes";
import goalRouter from "./controllers/goals/goals.routes";

// Connecting to database
mongoose.connect("mongodb://localhost:27017/demo");
var conn = mongoose.connection;
conn.on("connected", function () {
  console.log("Database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("Database is disconnected");
});

const app = express();
const PORT = process.env.PORT || 8000;

//Cors
app.use(
  cors({
    origin: "*",
  })
);

//bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(userRouter);
app.use(productRouter);
app.use(goalRouter);

app.get("/", (req, res) => {
  return res.status(200).send({
    success: true,
    message: "Welcome back",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
