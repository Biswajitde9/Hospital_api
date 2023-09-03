const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const passport= require('passport');
const passportStrategy= require('./config/passport');
const router = require('./routes/index');

const app= express();
const port= 8500;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

//use express router
app.use('/', require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`Server is giving an error,${err}`);

    }else{
        console.log("Server is running successfully up and running",port);
    }
})
