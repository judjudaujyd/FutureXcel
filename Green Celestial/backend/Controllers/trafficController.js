import trafficModel from "../Models/trafficSchema.js"

const markRecord = async(req,res) => {
    const trafficDetails = new trafficModel({
        device : req.body.device,
        ip : req.ip,
        preview_id : req.body.previewId,
        userAgent : req.get('User-Agent')
    })

    try {
        await trafficDetails.save({
            device : req.body.device
        })
        .then((result) => res.status(200).json({ msg : "Record Saved" }) )
    } catch (error) {
        res.status(501).json({ error : "Internal Server Error" })
    }
}

const sendRecord = async (req,res) => {
    try{
        const result = await trafficModel.find();
        res.status(200).json({ msg : result });
    }catch(e){
        res.send("Internal Server Error")
    }
}

export { markRecord ,sendRecord }