const { registerUser, loginUser } = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, accessToken, refreshToken } = await registerUser(username, password);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    if (err.message === "USER_EXISTS") {
      return res.status(409).json({ message: "User already exists" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, accessToken, refreshToken } = await loginUser(username, password);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logged in successfully",
    });
  } catch (err) {
    if (err.message === "INVALID_USER" || err.message === "INVALID_PASSWORD") {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
