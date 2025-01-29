import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required:true,
        trim:true
    },
    lastname: {
        type:String,
        required:true,
        trim:true
    },
    username: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password: {
        type:String,
        required:true,
    },
    phone: String
})

const user= mongoose.model("user", userSchema);

export default user;