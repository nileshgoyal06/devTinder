const express = require("express");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const {userAuth} = require("../middlewares/auth");
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const status = req.params.status;
    const toUserId = req.params.toUserId;

    // Ensure the receiver is registered on the platform
    const allowedUser = await User.findById(toUserId);
    if (!allowedUser) {
      throw new Error("User not found");
    }

    // Allowed statuses for sending requests
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      throw new Error("Invalid status");
    }

    // Users cannot send requests to themselves
    if (fromUserId.toString() === toUserId.toString()) {
      throw new Error("Can't send request to yourself");
    }

    // Check if a request already exists between these users
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      throw new Error("Request already exists");
    }

    // Create a new connection request
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    await connectionRequest.save();
    res.send(`${req.user.firstName} is ${status} in ${allowedUser.firstName}`);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});


requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  try{
    const loggedInUser = req.user._id;
    const newStatus = req.params.status;
    const requestId = req.params.requestId;

    //status should be accepted or rejected
    const allowedStatus =["accepted","rejected"];
    if(!allowedStatus.includes(newStatus)){
      res.status(404).json({message:"Invalid Status type"});
    };
  
    // my toUserId is loggedinuser
    const connectionRequest = await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedInUser,
      status:"interested"
    });

    if(!connectionRequest){
      throw new Error("Request not found");
    }

    //update status
    connectionRequest.status = newStatus;
    await connectionRequest.save();

    res.send("Connected request is"+ newStatus+"by "+ req.user.firstName);
  }
  catch(err){
    res.status(400).send("Error is:"+err.message);
  }
});



module.exports = requestRouter;