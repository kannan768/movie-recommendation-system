const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose'); 
const userRoutes=require('./routes/userRoutes');
const homepage=require('./views/home.js');

const app=express();

//connect to Mongo db
const dbURI='mongodb+srv://gopi:gopi2611@nodetuts.tw0ef.mongodb.net/MovieRec?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));


//register viewengine
app.set('view engine','ejs');

//middleware(run on server inbetween request and response) & static
app.use(express.static('public'));

//middleware to use data from other ejs files or accepting form data
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


app.get('/',(req,res)=>{
    res.redirect('/user');
});

app.get('/logout',(req,res)=>{
    res.redirect('/user');
});

//will go to user routes //render blog data
app.use('/user', userRoutes);

app.get('/covid_19_timeseries', function (req, res) {
    var spawn = require('child_process').spawn;
    var process = spawn('python', ['./covid19aggregator.py',
    ]  
    );
    process.stdout.on('data', function (data) {
        res.send(data.toString());
    });
});
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
});

