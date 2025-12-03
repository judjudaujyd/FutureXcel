import express from "express";
import { body, validationResult } from "express-validator";
import { createHealth, getHealth } from "../Controllers/healthController.js";

const healthRouter = express.Router();

// Handle POST Requests
healthRouter.post(
    "/",
    [
        body("title", "Title Is Required").isLength({ min: 8 }),
        body("content", "Content Is Required").notEmpty(),
    ],
    (req, res ,next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // If valid
        next();
    },createHealth
);

// Handle GET Requests
healthRouter.use(getHealth);

export default healthRouter;
