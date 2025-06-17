const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const {userAuth}  = require("../middlewares/auth");

//signupup API
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req.body); // Pass req.body instead of req

    const { firstName, lastName, emailid, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailid,
      password: hashPassword,
    });

    const savedUser =await user.save();
    const jwtToken = await savedUser.getJWT();
     res.cookie("token",jwtToken);
    
    res.json({message:"User Added successfully!",data:savedUser});
  } catch (err){
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
    res.send(user);

  }
  catch(err){
    res.status(400).send("Error message is:"+err.message);
  }
});

//Logout API
authRouter.post("/logout",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        if(!user){
            throw new Error("User not found");
        }
        res.clearCookie("token");
        res.send("Logout Successfully by:"+user.firstName);
    }
    catch(err){
        res.status(400).send("Error is:"+err.message);
    }

});
module.exports = authRouter;