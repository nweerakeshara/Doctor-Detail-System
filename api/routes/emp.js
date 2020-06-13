const express = require('express');
const router = express.Router();
const {User} = require('../model/emp');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


////////////////////////////////////////////////////////////////////////////////////////////////////////
//register emps of hospitals
router.post('/register', (req,res) =>{

    //To register emp

    const {empUn , empEmail, empPw} = req.body;
    if(!empUn || !empEmail || !empPw){
        return res.status(400).json({msg:'Please Fill All Fields'});
    }

    User.findOne({empUn}).then(user => {
        if(user){
            return res.status(400).json({msg : 'Username Already Exist'})
        }
    });

    User.findOne({empEmail}).then(user => {
        if(user){
            return res.status(400).json({msg : 'Email Already Exist'})
        }
    });


    const user = new User(req.body);
    /*pw hashing*/
    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(user.empPw, saltRounds, function(error, hash) {
            if (error) {
                throw err;
            }
            user.empPw = hash;

            user.save().then(user  => {

                jwt.sign(
                    {_id : user._id}, "secret", {expiresIn: 10},
                    (error, token) =>{
                        if(error) {
                            throw error;
                        }
                        res.json({
                            token,
                            user: {
                                _id: user._id,
                                empUn: user.empUn,
                                empEmail: user.empEmail
                            }
                        });
                    }
                );
            });

        });

    });



});

////////////////////////////////////////////////////////////////////////////////////////////////
//login
router.post('/login', (req,res) =>{

    //To login emp

    const {empUn , empPw} = req.body;
    if(!empUn || !empPw){
        return res.status(400).json({msg:'Please Fill All Fields'});
    }

    User.findOne({empUn}).then(user => {
        if(!user){
            return res.status(400).json({msg : 'Invalid Username'})
        }
        /*pw checking, hash passwords are checked here*/
        bcrypt.compare(empPw, user.empPw).then(result => {
            if(!result){
                return res.status(400).json({
                    msg:'Invalid Credentials'
                });

            }

            jwt.sign(
                {_id : user._id}, "secret", {expiresIn: 3500},
                (error, token) =>{
                    if(error) {
                        throw error;
                    }
                    res.json({
                        token,
                        user: {
                            _id: user._id,
                            empUn: user.empUn,
                            empEmail: user.empEmail
                        }
                    });
                }
            );
        });


    });


});

/////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/get/emp', auth, (req, res) => {
    User.findById(req.user._id).select('-empPw').then(user => res.json(user));
});

module.exports = router;