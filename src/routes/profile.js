const express = require("express");
const profileRouter = express.Router();
const {userAuth}  = require("../middlewares/auth");
//getProfile API
profileRouter.get("/profile",userAuth,async(req,res)=>{
  try{
        res.send(req.user);
  }
  catch(err){
    res.status(400).send("Error message is:"+err.message);
  }
});
module.exports =profileRouter;