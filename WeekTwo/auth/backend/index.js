// LOADING REQUIRED MODULES
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 

// CONFIGURING ENVIORMENTAL VARIABLES
dotenv.config();
const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/WeekTwo";

// CONFIGURE WITH DB
import connectToDB from "./connectToDB.js";
connectToDB(DB_URL);

// CONFIGURE EXPRESS APP
const app = express();

// DEFING EXPRESS MIDDLEWARES
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://mywebsite.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// EXPRESS ROUTERS
import userRouter from "./Routers/userRouter.js";
app.use("/users",userRouter);

// LISTEN EXPRESS APP
app.listen(PORT,(e) => {
    console.log(`SERVER HAS STARTED AT PORT ${PORT}`);
})