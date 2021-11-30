const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Group = require("../models/group");

const { findById, db } = require("../models/user.js");
//Route to create group
router.post('/create',(req,res)=>{
    
    var names=req.body.member.name;
    var emails=req.body.member.email;
    var length=names.length;

    Group.create({
        name: req.body.name
    },
        (err, group) => {
            if (err) {
                console.log(err);
            } else {
                for (var i = 0; i < length; i++) {
                    if (names[i] && emails[i]) {
                        User.findOne({email:emails[i]},(err,user)=>{
                            if(err){
                                res.send(err);
                            }else if(!user){
                                console.log("Yeh user nahin hai. Yaha nodemailer dhalna hai");
                            }else{
                                user.groups.push(group);
                                user.save();
                                console.log(user);
                            }
                        })
                        group.members.push({name:names[i],email:emails[i]});
                        group.save();
                    }
                }
                res.redirect("../dashboard");

            }
        })
})

module.exports  = router;