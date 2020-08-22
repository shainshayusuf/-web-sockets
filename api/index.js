const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const cors = require('cors');
const User = require('../model/user');
// const http = require('http').createServer(app);
// const io=require('socket.io')(http);

app.use(express.json());
app.use(cors())
 


 

mongoose.connect('mongodb://thilak:thilakal123@ds042677.mlab.com:42677/socketasses', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (req, res) => {
    console.log("Connected to database");
})

app.post('/signup', (req, res) => {

    User.find({ email: req.body.email })
        .then(user => {
            if (user.length >= 1) {
                return res.json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.json({
                            error: err
                        });
                    }
                    const newUser = new User({
                        email: req.body.email,
                        password: hash,
                        
                    })
                     try {
                        newUser.save();
                        // mongoose.save(newUser);
                        res.json({message:"Sign up successful"});
                    } catch (err) {
                        console.log(err)
                    }
                })
            }

        })
})


app.post("/login", (req, res) => {
    User.find({ email: req.body.email })
        .then(user => {
            if (user.length < 1) {
                return res.json({
                    message: "User Not exist"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (result) {
                    
                    res.json({
                        message: "Auth successful",
                      
                    });
                }
                else {
                    return res.json({
                        message:"Password did not match" ,
                    });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
});



app.get('/guest',(req,res)=>{
    User.find({}, function(err, users) {
        var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
    
        res.send(userMap);  
      });
})


module.exports = {
    path: '/api',
    handler: app
}