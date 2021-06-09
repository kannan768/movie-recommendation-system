const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MoviesSchema=new Schema({
    Genre:{
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
    },
    ZipCode:{
        type:String,
    },
    Password:{
        type:String,
    },

},{timestamps:true});

const User=mongoose.model('User',userSchema);
module.exports=User;