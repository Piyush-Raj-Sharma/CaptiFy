const express = require("express");
const verifyAccessToken = require("../middlewares/auth.middleware");
const {createPostController} = require("../controller/Post.controller");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post(
  "/",
  verifyAccessToken, //req.user = userData 
  upload.single("image"),
  createPostController
);

module.exports = router;
