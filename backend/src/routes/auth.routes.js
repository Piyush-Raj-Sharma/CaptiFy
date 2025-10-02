const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const ifUserExists = await userModel.findOne({ username });

  if (ifUserExists) {
    return res.status(409).json({
      message: "username already exists",
    });
  }

  try {
    const user = await userModel.create({
      username: username,
      password: password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true, // makes cookie inaccessible via JS (security)
      secure: false, // set true in production with HTTPS
      sameSite: "strict",
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
});

module.exports = router;
