const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    UserID:{
        type:Number,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    Age:{
        type:String,
        required:true
    },
    Occupation:{
        type:String,
        required:true
    },
    ZipCode:{
        type:String,
        required:true
    },

},{timestamps:true});

const User=mongoose.model('User',userSchema);
module.exports=User;