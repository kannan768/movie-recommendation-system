const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const moviesSchema=new Schema({
    movieId:{
        type:String,
    },
    title:{
        type:String,
    },
    genre:{
        type:String,
    },

},{timestamps:true});

const Movies=mongoose.model('Movies',moviesSchema);
module.exports=Movies;