const  express = require('express');
const storemanagerRoutes = express.Router();
var nodemailer = require("nodemailer");

let StoreManager = require('../model/storemanager.model');

//store
storemanagerRoutes.route('/add').post(function(req, res){
    let storemanager = new StoreManager(req.body);
    storemanager.save()
        .then(storemanager => {
            // res.status(200).json({'product': 'product is added successfully'});
            res.status(200).json({success: true});

            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "sliitgroup19@gmail.com",
                    pass: "sliit123",
                },
            });

            var mailOption = {
                from: "sliitgroup19@gmail.com",
                to: req.body.sm_email,
                subject: "HINT Fashion",
                text: `You have been added as a store manager.
                \nUsername : ` +req.body.sm_email+
                `\nPassword : ` +req.body.sm_password,
            };

            transporter.sendMail(mailOption, function (error, info) {
                if (error) {
                     console.log(error);
                } else {
                    // console.log("Email sent: " + info.response);
                 }
            });

        })
        .catch(err => {
            // res.status(400).send("unable to save product to database");
            res.status(400).json({success: false},err);
        });
});

//login
storemanagerRoutes.route("/login").post(function (req, res) {
    StoreManager.find({sm_email : req.body.sm_email, sm_password : req.body.sm_password}, function (err, storemanager) {
        if (err) console.log(err);
        res.json(storemanager);
    })
});


module.exports = storemanagerRoutes;
