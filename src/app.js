const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());  //middleware to convert JSON object to JS object
// Insert data API
app.post("/signup",async(req,res)=>{
    const user = new User(req.body);
  try{
    await user.save();
    res.send("User created successfully");
  }
  catch(err){
    res.status(400).send("Error message is"+err.message);
  }
})

//get data API
app.get("/user",async(req,res)=>{
  const user = await User.find(req.body);
    try{
      if(user.length===0){
        res.send("User not found");
      }
      else{
        res.send(user);
      }
    }
    catch(err){
      res.status(400).send("Error message is "+err.message);
    }
})

//delete data API
app.delete("/user",async(req,res)=>{
  const user = await User.findByIdAndDelete(req.body.userId);
  try{
    res.send("User Deleted successfully");
  }
  catch(err){
    res.status(400).send("error message is"+err.message);
  }

  
})

//update data API
app.patch("/updateuser",async(req,res)=>{
  const user = await User.findByIdAndUpdate(req.body.userId,req.body)
  try{
    await user.save();
    res.send("Updated user successfully");
  }
  catch(err){
    res.status(400).send("Something went wrong");
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
