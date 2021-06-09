const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    UserID:{
        type:String,
    },
    Gender:{
        type:String,
    },
    Age:{
        type:String,
    },
    Phone:{
        type:String,
    },
    Password:{
        type:String,
    },

},{timestamps:true});

const User=mongoose.model('User',userSchema);
module.exports=User;