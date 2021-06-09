const User=require('../models/user');
//const Movies=require('../models/movies');

//get login page
const user_login_get=(req,res)=>{
    res.render('login',{heading:'Login',title:'Login'})
}

const user_login_post=(req,res)=>{
    const inputuserid=req.body.userId;
    const inputpassword=req.body.password;

     User.findOne({userId:inputuserid})
      .then(data=>{
          if(data.userId==inputuserid && data.password==inputpassword)
          {
              //res.status(201).render('success');
              //res.status(201).render('home',{title:"Home"});
              console.log('Rendering homepage.....');
              //res.redirect('/user/homepage');
              console.log(inputuserid);
                var spawn = require('child_process').spawn;
                var process = spawn('python', ['./model4.py',inputuserid]);

                process.stdout.on('data', function (data) {
                var str=data.toString();
                 var datastring1=str.split("Name: title, dtype: object,").toString()
                 var datastring2=datastring1.split("Name: title, dtype: object]").toStrign()
                 var finalstrign=datastring2.split()
                res.render('home',{heading:'Home',title:'Home',data:datastring2})
    
    });
            }
          else{
              res.send("Invalid credentials");
              res.render('login',{heading:'Login',title:'Login'})
          }
      }).catch(err=>console.log(err));

}

//Get register page
const user_register_get=(req,res)=>{
    res.render('register',{heading:'Register',title:'Register'});
}

//post register page info
const user_register_post=(req,res)=>{
    const user=new User(req.body);
 
         user.save()
         .then((result)=>{
             console.log('Registered successfully');
             res.redirect('/user');
         }).catch((err)=>{
             console.log(err);

         })
}

// const user_render_home=(req,res)=>{

//     console.log("calling python script");
    
//     const user_id=req.body.userid;
//     console.log(user_id);
//     var spawn = require('child_process').spawn;
//     var process = spawn('python', ['./model4.py',1]);

//     process.stdout.on('data', function (data) {

//         res.render('home',{heading:'Home',title:'Home',data:data.toString()})
    
//     });
// }

// const user_render_movies=(req,res)=>{
//     Movies.find()
//     .then((result)=>{
//         res.render('movies',{title:'All Movies',movies:result})
//     }).catch(err=>console.log(err));

// }

module.exports={
    user_login_get,
    user_login_post,
    user_register_get,
    user_register_post,
    //user_render_home,
    //user_render_movies,
}