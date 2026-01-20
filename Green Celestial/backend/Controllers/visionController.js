import visionModel from "../Models/visionSchema.js";

const getVision = async (req, res) => {
    try {
        const vision = await visionModel.findOne();
        res.status(200).json(vision || { content: "Our Vision..." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateVision = async (req, res) => {
    try {
        let vision = await visionModel.findOne();
        if (vision) {
            vision.content = req.body.content;
            await vision.save();
        } else {
            vision = new visionModel({ content: req.body.content });
            await vision.save();
        }
        res.status(200).json({ message: "Vision Updated Successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { getVision, updateVision };
