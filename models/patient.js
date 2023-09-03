const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please provide your patient name"],
        unique: true
    },
    reports:[{
        createdByDoctor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Doctor",
            required:true
        },
        status:{
            type:String,
            enum:["Negative","Traveled-Quarantine","Synptons-Qurantine","Positive-Admit"]
        },
        date:{
            type:Date
        }
    }],
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required: true
    }
})

const Patient = new mongoose.model("patient",patientSchema);

module.exports= Patient;