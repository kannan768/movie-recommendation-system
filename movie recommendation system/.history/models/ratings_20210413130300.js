const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ratingsSchema=new Schema({
    UserID:{
        type:String,
    },
    MovieID:{
        type:String,
    },
    Ratings:{
        type:String,
    },

},{timestamps:true});

const Ratings=mongoose.model('Movies',moviesSchema);
module.exports=Movies;