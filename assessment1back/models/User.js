const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    contact: {
        type: Number,
    }
},
{timestamps:true}
)

module.exports = new mongoose.model("Customer",userSchema);