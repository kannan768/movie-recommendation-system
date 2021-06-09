const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const register_post=(req,res,next)=>
{
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        let user=new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPass
        })
    })
    user.save()
    .then(user=>{
        res.json({
            message:'User Added Successfully!'
        })
    })
    .catch(error=>{
        res.json({
            message:'An error occured!'
        })
    })

} 

module.exprots={
    register_post
}