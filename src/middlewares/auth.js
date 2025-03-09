const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new Error("Token is not provided");
        }
        const decode = jwt.verify(token, "@Nilesh774");

        const user = await User.findById(decode._id).lean(); //  Convert to plain JSON object

        if (!user) {
            throw new Error("User not found");
        }

        req.user = user; // Assign a clean user object
        next();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { userAuth };
