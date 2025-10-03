const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const generateTokens = require("../utils/tokens");

exports.registerUser = async (username, password) => {
  const existingUser = await userModel.findOne({ username });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({ username, password: hashedPassword });

  const { accessToken, refreshToken } = generateTokens(user);

  return { user, accessToken, refreshToken };
};

exports.loginUser = async (username, password) => {
  const user = await userModel.findOne({ username });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const { accessToken, refreshToken } = generateTokens(user);

  return { user, accessToken, refreshToken };
};
