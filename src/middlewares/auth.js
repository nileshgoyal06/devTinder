const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send("Please Login!");
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
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
