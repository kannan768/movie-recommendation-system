const User=require('../models/user');
const Movies=require('../models/movies');
const Ratings=require('../models/ratings');

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
            console.log('Rendering homepage.....');
            // res.redirect('/user/homepage');
            console.log(inputuserid);

            const { spawn } = require('child_process');
const pythonDir = (__dirname + "model4.py"); // Path of python script folder
const python = pythonDir + "C:\Users\Gopi\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Python 3.7"; // Path of the Python interpreter

/** remove warning that you don't care about */
function cleanWarning(error) {
    return error.replace("/Detector is not able to detect the language reliably.\n/g,"");
}

function callPython(scriptName, args) {
    return new Promise(function(success, reject) {
        const script = pythonDir + scriptName;
        const pyArgs = [script, JSON.stringify(args) ]
        const pyprog = spawn(python, pyArgs );
        let result = "";
        let resultError = "";
        pyprog.stdout.on('data', function(data) {
            result += data.toString();
        });

        pyprog.stderr.on('data', (data) => {
            resultError += cleanWarning(data.toString());
        });

        pyprog.stdout.on("end", function(){
            if(resultError == "") {
                success(JSON.parse(result));
            }else{
                console.error(`Python error, you can reproduce the error with: \n${python} ${script} ${pyArgs.join(" ")}`);
                const error = new Error(resultError);
                console.error(error);
                reject(resultError);
            }
        })
   });
}
                // var spawn = require('child_process').spawn;
                // var process = spawn('python', ['./model4.py',inputuserid]);

                // process.stdout.on('data', function (data)
                //  {

                //  var tempstr=data.toString();
                //  var str=tempstr.substring(1,tempstr.length)
                //   var datastring1=str.split("Name: title, dtype: object,").toString()
                //   var datastring2=datastring1.split("Name: title, dtype: object]").toString()
                //   var finalstring=datastring2.split(",")
                // //   var finalstring=data.toString()
                //  res.render('home',{heading:"Home",title:"Home",userid:inputuserid,data:finalstring})
                //  });
        }
        else{
            res.send("Invalid credentials");
            //res.render('login');
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

//blog details
const update_rating=(req,res)=>{
    
    const movieid=req.params.id;
    const userid=req.params.userid;
    const userrating=req.body.userrating;
    console.log(movieid);
    console.log(userrating);

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url,{useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("MovieRec");
        var myobj = {userId:userid,movieId:movieid,rating:userrating,timestamp:"964982703" };
        dbo.collection("Ratings").insert(myobj, function(err, res) {
          if (err) throw err;
          console.log("Rated Successfully!");
          
          db.close();
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
    
    // Ratings.find({userId:userid,movieId:movieid})
    // .then(data=>{
          
    //         console.log(data.rating);
    // }).catch(err=>console.log("Cant find collections"));
   
}

module.exports={
    user_login_get,
    user_login_post,
    user_register_get,
    user_register_post,
    update_rating,
}