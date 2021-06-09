const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const register=(req,res,next)=>
{
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
    })

}