const User=require('../models/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');


//will post the data into db
const register_post=(req,res,next)=>
{
    const hashedpass="";
    bcrypt.hash(req.body.password, 10, function(err, hashedpass){
        if(err){
            res.json({
                error:err
            })
        }
        else{
            let user=new User({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                password:hashedpass
        })
        }

    })
  
    

} 

//will render register page
//Get register page
const register_get=(req,res)=>{
    res.render('register',{title:'Register'});
}

const login_get=(req,res)=>{
    res.render('login',{title:'Login'});
}


module.exports={
    register_post,
    register_get,
    login_get
}