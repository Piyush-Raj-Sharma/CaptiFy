const express = require("express");
const verifyAccessToken = require("../middlewares/auth.middleware");
// const createPostController = require('../controller/createPost.controller')
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post(
  "/",
  verifyAccessToken,
  upload.single("image"),
  createPostController
);

module.exports = router;
