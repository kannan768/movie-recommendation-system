const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    uname:{
        type:String,
        required:true
    },
    password:{
        type:varchar,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{timestamps:true});

const Blog=mongoose.model('Blog',blogSchema);
module.exports=Blog;