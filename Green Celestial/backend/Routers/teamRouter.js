import express from "express";
import { getTeam, setTeam, deleteTeam } from "../Controllers/teamController.js";
import { body, validationResult } from 'express-validator'
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTeam);



// ================ENDPOINT FOR CREATING A USER=================
router.post("/", authenticate, [
    body('name', 'The Name Must Be Atleast 5 Characters In Length').isLength({ min: 5 }),
    body('role', 'Role Must be 3 Characters In Length').isLength({ min: 3 }),
    body('about', 'This Feild Must Contain Atleast 20 Characters').isLength({ min: 20 }),
    body('img', 'Image Cant Be Empty').not().isEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
    } else {
        next();
    }



}, setTeam);

router.delete("/delete/:id", authenticate, deleteTeam); // Added delete route

export default router;