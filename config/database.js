const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017');

const db = mongoose.connection;

db.on('error', console.error.bind(console,"error connection to MongoDB"));

db.once('open',()=>{
    console.log("Successfully connecting with mongodb");
})

module.exports=db;