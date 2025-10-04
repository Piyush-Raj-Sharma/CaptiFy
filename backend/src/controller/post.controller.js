const postModel = require('../models/post.model');
const generateCaption = require('../services/ai.service');

const createPostController = async (req, res) => {

    const image = req.file;
    console.log(image);
    const base64ImageData = Buffer.from(image.buffer).toString('base64');
    
    try {
        const caption = await generateCaption(base64ImageData);
        res.status(201).json({ caption });
        // console.log("Generated Caption:", caption); 
    } catch (error) {
        console.error("Error generating caption:", error);
        return res.status(500).json({ message: "Error generating caption" });
    }

}


module.exports = {createPostController};
