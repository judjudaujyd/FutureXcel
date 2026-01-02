import express from "express";

const projectRouter = express.Router();

projectRouter.get("/",(req,res) => {
    res.send("This Is A GET REquest From The Projects Section");
})

export default projectRouter;