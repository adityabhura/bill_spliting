const mongoose = require('mongoose');
var passportLocalMongoose=require("passport-local-mongoose");
const UserSchema  = new mongoose.Schema({
  name :{
      type  : String,
      required : true
  } ,
  email :{
    type  : String,
    required : true
} ,
password :{
    type  : String,
    required : true
} ,
date :{
    type : Date,
    default : Date.now
},
groups:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Group"
}]
});
UserSchema.plugin(passportLocalMongoose);
const User= mongoose.model('User',UserSchema);

module.exports = User;