const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const bodyParser=require("body-parser");

//passport config:
require('./config/passport')(passport)
//mongoose
// mongoose.connect('mongodb+srv://rekhav:rekhav123@cluster0.fj0hh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
// .then(() => console.log('connected,,'))
// .catch((err)=> console.log(err));
mongoose.connect("mongodb://localhost/bill_split");

//EJS
app.set('view engine','ejs');
// app.use(expressEjsLayout);
//BodyParser
app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })
    
//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/group',require('./routes/group'));

app.listen(3000); 