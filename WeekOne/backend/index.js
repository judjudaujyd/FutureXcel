import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Configuring Enviormental Variables
dotenv.config()

// Retriving Enviormental Variables
const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL;

// Configuring Database
import connectToDB from "./databaseConfig/databaseConfig.js";
connectToDB(DB_URL);

// Initiallizing Express App
const app = express();

// Initializing Express Middlewares
app.use(cors());
app.use(express.json());

// Importing Express Routers
import healthRouter from "./Routes/healthRouter.js";

// Integrating Routes Into Express App
app.use("/health",healthRouter);

app.listen(PORT,() => {
    console.log(`Server Is Listening On Port ${PORT}`);
})
