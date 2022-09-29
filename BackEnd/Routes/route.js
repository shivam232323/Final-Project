
const pool = require('../database');
const admin = require('../Controller/admin');
const user = require('../Controller/user');
const express = require('express');
const router = express.Router();





router.post('/landPage', user.userValidate);


//admin routes
router.post('/postJob', admin.addJobs);
router.get('/getJobs', admin.sendJob);
router.get('/applicants/:jobId', admin.applicants);


//user routes
router.post('/userSignUp', user.userSignUp);
router.post('/sendUserDetails', user.userDetails);
router.post('/applyJob', user.applyForJob);
router.get('/appliedJobs/:id', user.appliedJobs);
router.get('/displayUserDetails/:userId', user.displayUserDetails);
router.get('/checkUserDetails/:userId',user.checkUserDetails);

module.exports = router;