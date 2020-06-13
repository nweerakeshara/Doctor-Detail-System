const mongoose = require('mongoose');

const moment = require('moment');


const userSchema = mongoose.Schema({

    empUn: {
        type: String,
        maxlength:50,
        unique: 1
    },

    empEmail: {
        type:String,
        trim: true,
        unique: 1
    },

    empPw: {
        type:String,
        minlength:5
    },

    date : {
        type:Date,
        default:Date.now()
    },

    token : {
        type: String
    }


})





const User = mongoose.model('Employees', userSchema);
module.exports = {User};