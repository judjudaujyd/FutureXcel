// INCLUDING REQUIRED MODULES
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

// INITIALING ENVIORMENTAL VARIABLES
dotenv.config();
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

// ESTABLISHING CONNECTION WITH DATABASE
import connectToDB from "./connectDB/connectToDB.js";
connectToDB(DB_URL);

// INITIALIZING EXPRESS APP
const app = express();


// IMPLEMENTING REQUIRED MIDDLEWARES
app.use(express.json());
app.use(cors());

// SETTING UP ROUTERS FOR APP
import roleRouter from "./Routers/roleRouter.js";
import batchRouter from "./Routers/batchRouter.js";
import taskRouter from "./Routers/tasksRouter.js";
app.use("/roles",roleRouter);
app.use("/batches", batchRouter);
app.use("/tasks",taskRouter);

// SERVING EXPRESS APPLICATION TO PORT
app.listen(PORT,() => {
    console.log(`Server Is Listening On Port ${PORT}`);
})