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