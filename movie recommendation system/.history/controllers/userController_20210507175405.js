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
                var spawn = require('child_process').spawn;
                var process = spawn('python', ['./model4.py',inputuserid]);

                process.stdout.on('data', function (data)
                 {
                    //  console.log(data.toString());
                 var tempstr=data.toString();
                 var str=tempstr.substring(1,tempstr.length-1);
                  var datastring1=str.split("Name: title, dtype: object, "||"Name: title, dtype: object]").toString()
                //   var datastring2=datastring1.split("Name: title, dtype: object]").toString()
                  var finalstring=datastring1.split(",")
                //   var finalstring=data.toString()
                  console.log(finalstring);
                 res.render('home',{heading:"Home",title:"Home",userid:inputuserid,data:finalstring})
                 });
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
    console.log("1 document inserted");

    // db.close();
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
    update_rating,
}

