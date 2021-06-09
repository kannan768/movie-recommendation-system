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
              //res.status(201).render('success');
              //res.status(201).render('home',{title:"Home"});
              console.log('Rendering homepage.....');
              //res.redirect('/user/homepage');
              console.log(inputuserid);
              
              /* Generate a python process using nodejs child_process module */
var spawn = require('child_process').spawn,
py_process = spawn('python3', ['son.py']),
data = getData(),
dataResult = '';

/* Define what to do on everytime node application receives data from py_process */
py_process.stdout.on('data', function(data){
dataResult += data.toString();
});

/* At the end, show the result from py_process computing (stored in 'dataResult') */
py_process.stdout.on('end', function(){
console.log('Sum result: ', dataResult);
});

/* Stringify the array before send to py_process */
py_process.stdin.write(JSON.stringify(data));

/* Close the stream */
py_process.stdin.end();

function getData() {
return [1, 8, 16, 32, 64, 128, 256];
}

                // var spawn = require('child_process').spawn;
                // var process = spawn('python', ['./moviemodel.py',inputuserid]);

                // process.stdout.on('data', function (data) {

                // // var tempstr=data.toString();
                // // var str=tempstr.substring(1,tempstr.length)
                // //  var datastring1=str.split("Name: title, dtype: object,").toString()
                // //  var datastring2=datastring1.split("Name: title, dtype: object]").toString()
                // //  var finalstring=datastring2.split(",")
                // var finalstring=data.toString()
                // // res.render('home',{data:finalstring})
                // // console.log(data.toString());

                // res.write(finalstring);
    
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

//blog details
const update_rating=(req,res)=>{
    
    const id=req.params.id;
    const userrating=req.body.userrating;
    console.log(id);
    console.log(userrating);
    
    
    Ratings.findOne({movieId:id})
    .then(data=>{
          
            console.log('Updated successfully.....');

            console.log(data.rating);
    }).catch(err=>console.log("Cant find collections"));
    //  Movies.findById(id)
    //  .then((result)=>{
    //      res.render('moviedetails',{title:'Movie Details',heading:'Movie Details', data:result})
    //  }).catch((err)=>{
    //     res.status(404).render('404',{title:'Movie not found',heading:'Movie Not found'});
    //  });
}

module.exports={
    user_login_get,
    user_login_post,
    user_register_get,
    user_register_post,
    //user_render_home,
    //user_render_movies,
    update_rating,
}