const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength:4,
        maxlength: 20
    },
    lastName:{
        type:String
    },
    emailid:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number
    },
    password:{
        type:String
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Invalid gender");
            }
        },
    },
    photoUrl:{
        type:String,
        default:"https://conferenceoeh.com/wp-content/uploads/profile-pic-dummy.png"
    },
    skills:{
        type:[String], 
    }


},
{
    timestamps:true
}
);

module.exports = mongoose.model("User",userSchema);
