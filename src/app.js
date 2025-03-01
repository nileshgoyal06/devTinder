const express = require("express");
const app =express();

app.use("/nilesh",(req,res)=>{
    res.send("Hello from Nilesh");
}) 

app.get("/user",(req,res)=>{
    res.send({
        firstName:"Nilesh",
        lastName:"Goyal"
    });
})
app.use("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000"); 
})