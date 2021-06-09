const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ratingsSchema=new Schema({
    UserID:{
        type:String,
    },
    MovieID:{
        type:String,
    },
    :{
        type:String,
    },

},{timestamps:true});

const Movies=mongoose.model('Movies',moviesSchema);
module.exports=Movies;