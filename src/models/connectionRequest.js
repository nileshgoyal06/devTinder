const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
    
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type: String,
        required: true,   
    }


},
{
    timestamps:true
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const ConnectionRequestModel = new mongoose.model("connectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;