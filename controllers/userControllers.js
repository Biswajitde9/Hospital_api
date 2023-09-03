const { json } = require('body-parser');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const jwt= require('jsonwebtoken');

module.exports.registerDoctor = async(req,res,next)=>{
    try{
        const { name, password } = req.body;
        await Doctor.create({ name, password });
        return res.status(200).json({
            success:true, 
            message:"doctor created successfully"
        })
    }catch(error){
        res.status(500,json({
            success:false,
            message:"could not create a doctor,internal server error"
        }));
    }
};

module.exports.login=async(req,res,next)=>{
    try{
        const user= await Doctor.findOne(req.body);
        if(user){
            const token = jwt.sign(user.toJSON(),"secret",{expiresIn:'1000000'});
            res.status(200).json({
                success:true,
                token
            });
        }else{
            res.status(400).json({
                success:false,
                message:"name or password is invalid"
            })
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Something went to wrong"
        });
    }
}

module.exports.registerPatient= async(req,res,next)=>{
    try{
        // req.body.doctor="64f436b59a0e22131a5a7f21";
        const patient= await Patient.create({
            name: req.body.name,
            doctor: req.user._id 
        });
        
        res.status(200).json({
            success:true,
            message:"Successfully created patients",
            patient:patient
        });
    }catch(error){
        console.error("Error creating patient:", error); 
        res.status(500).json({
            success:false,
            message:"could not create a patient,Internal Server Error"
        });
    }
};


module.exports.createReports = async(req,res,next)=>{
    try{
        const patient= await Patient.findById(req.params.id);
        req.body.date= Date.now();
        patient.reports.push({
            ...req.body,
            createdByDoctor:req.user._id
        });
        patient.save();

        res.status(200).json({
            success:true,
            message:"Reports Successfully Created"
        });
    }catch(error){
        res.status(500,json({
            success:false,
            message:"Could not create a report,Internal Server Error"
        }));
    }
};

module.exports.all_reports= async (req,res,next)=>{
    try{
        const patient= await Patient.findById(req.params.id);

        res.status(200).json({
            success: true,
            reports: patient.reports
        });
    }catch(error){
        res.status(500,json({
            success:false,
            message:"Could not able to fetch patient repots,Internal Server Error"
        }));
    }
}

module.exports.AllReports= async (req,res,next)=>{
    try{
        const patient = await Patient.find({ 
            reports: { $elemMatch: { status: req.params.status } } });
        res.status(200).json({
            success:true,
            data:patient
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Could not able to fetch the reports"
        });
    }
}