const mongoose = require('mongoose');
const GroupSchema  = new mongoose.Schema({
  name :{
      type  : String,
      required : true
  } ,
  description :{
    type  : String,
} ,
admin:{
    id:{
        type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    },
    email:String,
    name:String
},
members:[{
    email:String,
    name:String
}],
expense:[{
    description:String,
    date :{
        type : Date,
        default : Date.now
    },
    payer:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
           ref:"User"
        }, 
        email:String,
        name:String
    },
    debtPaidBy:[{
        id:{
            type:mongoose.Schema.Types.ObjectId,
           ref:"User"
        }, 
        email:String,
        name:String
    }]
}],
date :{
    type : Date,
    default : Date.now
}

});
const Group= mongoose.model('Group',GroupSchema);

module.exports = Group;