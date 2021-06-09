const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ratingsSchema=new Schema({
    UserID:{
        type:String,
    },
    Title:{
        type:String,
    },
    Genre:{
        type:String,
    },

},{timestamps:true});

const Movies=mongoose.model('Movies',moviesSchema);
module.exports=Movies;