const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    userId:{
        type:String,
    },
    gender:{
        type:String,
    },
    age:{
        type:String,
    },
    occupation:{
        type:String,
    },
    
    Password:{
        type:String,
    },

},{timestamps:true});

const User=mongoose.model('User',userSchema);
module.exports=User;