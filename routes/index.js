const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth'); 
const Group = require('../models/group');
const User=require("../models/user.js");

//login page
router.get('/', (req,res)=>{
    res.render('register');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    User.findById(req.user._id).populate({path:"groups",model:Group}).exec(function(err,user){
            if(err){
                res.send(err);
            }else{
                res.render('dashboard',{
                    user: user
                });
            }
    })

})
module.exports = router; 