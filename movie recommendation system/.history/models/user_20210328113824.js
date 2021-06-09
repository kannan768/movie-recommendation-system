const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    UserID:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    Occupation:{
        type:String,
        required:true
    },
    
   
},{timestamps:true});

const User=mongoose.model('User',userSchema);
module.exports=User;