import express from "express";
import connectToDb from "./Db/dbConnect.js";
import cors from 'cors';
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import compression from "compression";

const PORT = process.env.PORT || 8000;
const DB_URL = process.env.URL || 'mongodb://localhost:27017/greencelestial';
// Backend URL used in policies (set this in production to your deployed backend URL)
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

connectToDb(DB_URL);

const app = express();

// Security Middleware
// Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "img-src": ["'self'", "data:", "https://images.unsplash.com", "https://via.placeholder.com", BACKEND_URL],
        },
    },
})); // Set security headers
app.use(cors()); // Enable CORS

// Compression Middleware
app.use(compression()); // Gzip compression for responses

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // limit each IP to 100 requests per windows
});
app.use(limiter);

// Data Sanitization
app.use(mongoSanitize()); // Prevent NoSQL Injection
app.use(xss()); // Prevent XSS
app.use(hpp()); // Prevent Parameter Pollution

// Body Parsers (Increased limit for handling base64 images if needed, but we use multer now)
app.use(express.json({ limit: '10kb' })); // Standardize limit
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


// =============Importing Routers========
import router from "./Routers/teamRouter.js";
import adminRouter from "./Routers/adminRouter.js";
import blogRouter from "./Routers/blogsRouter.js";
import projectRouter from "./Routers/projectRouter.js";
import categoryRouter from "./Routers/categoryRouter.js";
import trafficRouter from "./Routers/trafficRouter.js";
import visionRouter from "./Routers/visionRouter.js";
import contactRouter from "./Routers/contactRouter.js";

app.use("/blogs", blogRouter);
app.use("/team", router);
app.use("/admin", adminRouter);
app.use("/category", categoryRouter);
app.use("/projects", projectRouter);
app.use("/traffic", trafficRouter);
app.use("/vision", visionRouter);
app.use("/contact", contactRouter);
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(PORT, () => console.log(`SERVER IS UP ON PORT ${PORT}`));