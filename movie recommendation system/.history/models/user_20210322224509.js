const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    Uint8ClampedArray:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{timestamps:true});

const Blog=mongoose.model('Blog',blogSchema);
module.exports=Blog;