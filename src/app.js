const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');
app.use(express.json());  //middleware to convert JSON object to JS object
app.use(cookieParser()); //middleware used to access cookies like in cookies generally authenticated token information is stored which needed further

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

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
