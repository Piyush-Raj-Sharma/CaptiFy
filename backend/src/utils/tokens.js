const jwt = require("jsonwebtoken");

exports.generateTokens = (user) => {
    const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
}