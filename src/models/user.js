const mongoose = require("mongoose");
const validator = require("validator");  // library to use add validation in email,password for strongness and in email(@,.com,gmail) includes validation 

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 20,
    },
    lastName: {
      type: String,
    },
    emailid: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email: " + value);
        }
      },
    },
    age: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("password is not strong enough");
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value.toLowerCase())) {
          throw new Error("Invalid gender");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://conferenceoeh.com/wp-content/uploads/profile-pic-dummy.png",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("User", userSchema);
