const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please Enter your name"]
    },
    password:{
        type: String,
        required: [true,"Please Enter your password"],
        minLength:[6,"Password Should be greater than six chracter"]
    }
})

const Doctor = new mongoose.model('Doctor',doctorSchema);

module.exports= Doctor;