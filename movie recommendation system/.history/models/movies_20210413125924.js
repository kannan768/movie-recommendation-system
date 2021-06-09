const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MoviesSchema=new Schema({
    MovieID:{
        type:String,
    },
    Title:{
        type:String,
    },
    <Genre></Genre>:{
        type:String,
    },

},{timestamps:true});

const User=mongoose.model('User',userSchema);
module.exports=User;