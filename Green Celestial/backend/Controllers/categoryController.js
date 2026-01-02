import categoryModel from "../Models/categorySchema.js";

const createCategory = (req,res) => {
    let record = new categoryModel({
        title : req.body.categoryName,
        desc : req.body.categoryDesc
    })

    try{
        record
        .save()
        .then((response) => res.status(200).json({ msg : "A New Category Has Been Created"}))
        .catch((error) => res.status(402).json({ msg : "Error Occoured"}))
    }catch(e){
        res.status(501).json({ error : "Internal Server Error"})
    }
}

const getCategory = async (req,res) => {
    try {
        let results = await categoryModel.find();
        res.status(200).send(results)
    } catch (error) {
        res.status(501).json({ msg : "Internal Server Error"});
    }
}

export { createCategory , getCategory }