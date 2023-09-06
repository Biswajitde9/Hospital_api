const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://biswajitde487:biswajit123@cluster0.0cry1zn.mongodb.net/hospitalapi');

const db = mongoose.connection;

db.on('error', console.error.bind(console,"error connection to MongoDB"));

db.once('open',()=>{
    console.log("Successfully connecting with mongodb");
})

module.exports=db;
