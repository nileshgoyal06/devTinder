const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup",async(req,res)=>{
    const user = new User({
        firstName:"Lakshya",
        lastName:"Mudgal",
        emailid:"lakshya123@gmail.com"
    })
    try{
        await user.save();
    res.send("User created succesfully");
    }
    catch(err){
        res.status(400).send("The error is "+err.message);
    }
    
})

 

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database not connected", err);
  });

  // Ensure that first database is connected then server start
