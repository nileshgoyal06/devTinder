const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const validateuserData = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const {userAuth}  = require("./middlewares/auth");


// const jwt = require("jsonwebtoken");
// const cookie = require("cookie-parsar");

app.use(express.json());  //middleware to convert JSON object to JS object
// Insert data API
app.use(cookieParser()); //middleware used to access cookies like in cookies generally authenticated token information is stored which needed further

app.post("/signup", async (req, res) => {
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

//login api
app.post("/login",async(req,res)=>{
  try{

    const{emailid,password} = req.body;
    const user = await User.findOne({emailid});
    if(!user){
      throw new Error("Invalid crediantials");
    }
      const isPassword = await bcrypt.compare(password,user.password);
     if(!isPassword){
        throw new Error("Paasword does not match");
    } 
    //Token is generated
    const jwtToken = await jwt.sign({_id:user._id},"@Nilesh774",{expiresIn:"7d"});
    res.cookie("token",jwtToken);
    res.send("Login successfull");


  }
  catch(err){
    res.status(400).send("Error message is:"+err.message);
  }
})

app.post("/hello",userAuth,async(req,res)=>{
  try{
    res.send("hello");
  }
  catch(err){
    res.status(400).send("Error message is "+err.message);
  }
});
//get profile api

app.get("/profile",userAuth,async(req,res)=>{
  try{
        res.send(req.user);
  }
  catch(err){
    res.status(400).send("Error message is:"+err.message);
  }
});

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
    res.status(400).send("Something went"+err.message);
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
