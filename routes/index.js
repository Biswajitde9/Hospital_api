const express= require('express');
const passport = require('passport');
const { registerDoctor, registerPatient, createReports, all_reports, AllReports, login } = require('../controllers/userControllers');
const router= express.Router();

router.post('/doctors/register',registerDoctor);    
router.post('/doctors/login',login);
router.post('/patients/register',passport.authenticate('jwt',{session:false}),registerPatient);
router.post('/patients/:id/create_report',passport.authenticate('jwt',{session:false}),createReports);
router.get('/patients/:id/all_reports',all_reports);
router.get('/reports/:status',AllReports);
module.exports= router;