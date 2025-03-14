const express = require("express");
const requestRouter = express.Router();
const {userAuth}  = require("../middlewares/auth");
//connection API
requestRouter.post("/connection",userAuth,async(req,res)=>{
    const user = req.user;
    try{
      res.send("Connection send by:"+user.firstName);
    }
    catch(err){
      res.status(400).send("Error message is "+err.message);
    }
  });

module.exports =requestRouter;
