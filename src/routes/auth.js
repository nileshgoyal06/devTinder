const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const validateuserData = require("../utils/validation");
const bcrypt = require("bcrypt");
//signupup API
authRouter.post("/signup", async (req, res) => {
  try {
    validateuserData(req.body); // Pass req.body instead of req

    const { firstName, lastName, emailid, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailid,
      password: hashPassword,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error message: " + err.message);
  }
});

//Login API
authRouter.post("/login",async(req,res)=>{
  try{

    const{emailid,password} = req.body;
    const user = await User.findOne({emailid});
    if(!user){
      throw new Error("Invalid crediantials");
    }
      const isPassword = await user.validatePassword(password);
     if(!isPassword){
        throw new Error("Paasword does not match");
    } 
    //Token is generated
    const jwtToken = await user.getJWT();
    res.cookie("token",jwtToken);
    res.send("Login successfull");


  }
  catch(err){
    res.status(400).send("Error message is:"+err.message);
  }
});
module.exports = authRouter;