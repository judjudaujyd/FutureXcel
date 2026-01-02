import express from "express";
import connectToDb from "./Db/dbConnect.js";
import cors from 'cors';

const PORT = process.env.PORT || 8000;
const DB_URL = process.env.URL || 'mongodb://localhost:27017/greencelestial';

connectToDb(DB_URL);

const app = express();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://localhost:5173"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use(cors())




// =============Importing Routers========
import router from "./Routers/teamRouter.js";
import adminRouter from "./Routers/adminRouter.js";
import blogRouter from "./Routers/blogsRouter.js";
import projectRouter from "./Routers/projectRouter.js";
import categoryRouter from "./Routers/categoryRouter.js";
import trafficRouter from "./Routers/trafficRouter.js";

app.use("/blogs",blogRouter);

app.use(express.json({ limit: '50mb' })); // For JSON requests
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // For URL-encoded requests

app.use("/team",router);
app.use("/admin",adminRouter);
app.use("/category",categoryRouter);
app.use("/projects",projectRouter);
app.use("/traffic",trafficRouter);

app.listen(PORT,() => console.log(`SERVER IS UP ON PORT ${PORT}`));