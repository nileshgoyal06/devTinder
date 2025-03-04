const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect(
    "mongodb+srv://nileshgoyal624:nilesh774@cluster0.umuuj.mongodb.net/devTinder"
  );
};

module.exports=connectDB;