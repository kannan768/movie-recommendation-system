const User=require('../models/user');
const Movies=require('../models/movies');
const Ratings=require('../models/ratings');

//get login page
const user_login_get=(req,res)=>{
    
    res.render('login',{heading:'User Login',title:'User Login'})
}

const user_login_post=(req,res)=>{
    const inputuserid=req.body.userId;
    const inputpassword=req.body.password;

    User.findOne({userId:inputuserid})
    .then(data=>{
        if(data.userId==inputuserid && data.password==inputpassword)
        {
           
            console.log('Rendering homepage.....');
            // res.redirect('/user/homepage');
            console.log(inputuserid);

            res.redirect(`user/home/${inputuserid}`);


                // var spawn = require('child_process').spawn;
                // var process = spawn('python', ['./model4.py',inputuserid]);

                // process.stdout.on('data', function (data)
                //  {
                    
                // var str=data.toString();
                // var result= "";      
                // for (var i = 1; i<str.length-28; i++){
     
    
                //   if(str[i]=="N")
                //     {
                //      result+=";";
                //      i=i+27;
                //     }
     
     
                // result += str[i];  
                // }     
                
                
                //   var finalstring=result.split(";",9);
                //   console.log(finalstring);
                //  res.render('home',{heading:"Home",title:"Home",userid:inputuserid,data:finalstring})
                // res.redirect(`user/home/${inputuserid}/${finalstring}`);
                //  });
        }
        else{
            res.render('failure',{heading:"Go Back",title:"Invalid User"})
            //res.render('login');
        }
    }).catch(err=>console.log(err));



}

//Get register page
const user_register_get=(req,res)=>{
    res.render('register',{heading:'User Registeration',title:'User Registeration'});
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

 const user_render_home=(req,res)=>{
   var inputuserid=req.params.inputuserid;

    var spawn = require('child_process').spawn;
                var process = spawn('python', ['./model4.py',inputuserid]);

                process.stdout.on('data', function (data)
                 {
                    
                var str=data.toString();
                var result= "";      
                for (var i = 1; i<str.length-28; i++){
     
    
                  if(str[i]=="N")
                    {
                     result+=";";
                     i=i+27;
                    }
     
                result += str[i];  
                }     
                
    var finalstring=result.split(";",9);
    console.log(inputuserid);
    console.log(finalstring);

    res.render('home',{heading:"Home",title:"Home",userid:inputuserid,data:finalstring})
   });
}


//blog details
const update_rating=(req,res)=>{
    
    const movieid=req.params.id.toString();
    const userid=req.params.userid.toString();
    const userrating=req.body.userrating.toString();
    console.log(movieid);
    console.log(userrating);

    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("MovieRec");
  var myobj = {userId:userid,movieId:movieid,rating:userrating,timestamp:"964982703"};
  dbo.collection("ratings").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("User Rating Updated Successfully!");
    db.close();
    res.render('home',{heading:"Home",title:"Home",message:})
  });
});

    
//      MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("MovieRec");
//     var myquery = { userId:userid,movieId: movieid};
//     var newvalues = { $set: {rating:userrating} };
//     dbo.collection("ratings").updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log("Updation successfull");
//     db.close();
//   });
// });
    
}


module.exports={
    user_login_get,
    user_login_post,
    user_register_get,
    user_register_post,
    user_render_home,
    update_rating,
}

