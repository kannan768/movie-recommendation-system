const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MoviesSchema=new Schema({
    MovieID:{
        type:String,
    },
    Title:{
        type:String,
    },
    Genre:{
        type:String,
    },

},{timestamps:true});

const Movies=mongoose.model('Movies',userSchema);
module.exports=User;