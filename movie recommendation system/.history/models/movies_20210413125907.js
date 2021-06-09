const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MoviesSchema=new Schema({
    MovieID:{
        type:String,
    },
    Genre:{
        type:String,
    },
    Age:{
        type:String,
    },

},{timestamps:true});

const User=mongoose.model('User',userSchema);
module.exports=User;