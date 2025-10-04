const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadFile = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");

const createPostController = async (req, res) => {
  const image = req.file;
  console.log(image);
  const base64ImageData = Buffer.from(image.buffer).toString("base64");

  try {
    const caption = await generateCaption(base64ImageData);
    const result = await uploadFile(image.buffer, `${uuidv4()}`);

    const newPost = new postModel({
      image: result.url,
      caption: caption,
      user: req.user._id,
    });

    res.status(201).json({message: "Post created successfully", newPost });
  } catch (error) {
    console.error("Error generating caption:", error);
    return res.status(500).json({ message: "Error generating caption" });
  }
};

module.exports = { createPostController };
