const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    uname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
},{timestamps:true});

const User=mongoose.model('User',blogSchema);
module.exports=Blog;