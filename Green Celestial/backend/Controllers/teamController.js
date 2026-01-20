import teamModel from "../Models/teamSchema.js";


const getTeam = async (req, res) => {
    try {

        let teamResult = await teamModel.find();
        res.send(teamResult);
    } catch (error) {
        res.status(400).json({ error: "Internal Server Error Try Again" });
    }
}

const setTeam = async (req, res) => {
    try {
        let record = new teamModel({
            name: req.body.name,
            role: req.body.role,
            about: req.body.about,
            img: req.body.img,
            skills: req.body.skills
        });
        let result = await record.save()
            .then((result) => {
                res.status(200).json({ message: "A New Member Has Been Added" });
            }).catch((errors) => {
                res.status(400).json({ error: errors });
            });

    } catch (error) {
        res.send(error);
    }

}

const deleteTeam = async (req, res) => {
    try {
        await teamModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Team Member Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export { getTeam, setTeam, deleteTeam }