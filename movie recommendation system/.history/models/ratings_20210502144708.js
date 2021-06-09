const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ratingsSchema=new Schema({
    userId:{
        type:String,
    },
    movieId:{
        type:String,
    },
    rating:{
        type:String,
    },
    timestamp:{
        type:String,
    }

},{timestamps:true});

const Ratings=mongoose.model('Ratings',ratingsSchema);
module.exports=Ratings;