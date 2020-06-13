const express = require("express");
const Comments = express.Router();

let Comm = require("../model/comments");

//add items to the comments
Comments.route("/add").post(function (req, res) {
    let comments = new Comm(req.body);
    comments
        .save()
        .then((data) => {
            res.json({ success: true });
        })
        .catch((err) => {
            res.json({ success: false });
        });
});

//get items from comments
Comments.route("/get/:id").get(function (req, res) {
    Comm.find({product_id: req.params.id},function (err, comments) {
        if (err) console.log(err);
        else {
            res.json(comments);
        }
    });
});


module.exports = Comments;