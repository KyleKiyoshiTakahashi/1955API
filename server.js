var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/1955_DB');


var UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'],
    }
    
},{timestamps: true});

mongoose.model('User', UserSchema); 
var User = mongoose.model('User')

app.get('/', function (req, res) {
    User.find(function(err, users){
        res.json(users)
    })
})

app.get('/new/:name', function(req, res){
    const user_inst = new User();
    user_inst.name= req.params.name;
    user_inst.save(function(err){
        if(err){}
        else{
            res.json(user_inst);
            // res.redirect('/')
        }
    })
})

app.get("/remove/:name", function(req, res){
    User.remove({name: req.params.name}, function(err, result){
        res.json(User)
    })
})

app.get('/:name', function(req, res){
    User.findOne({name: req.params.name}, function(err, user){
        if(err){}
        else{

            res.json(user);
        }
        
    })
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})
