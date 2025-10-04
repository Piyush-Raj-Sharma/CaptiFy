const express = require("express");
const verifyAccessToken = require('../middlewares/auth.middleware');
// const createPostController = require('../controller/createPost.controller')

const router = express.Router();

router.post('/', verifyAccessToken, createPostController);


module.exports = router;