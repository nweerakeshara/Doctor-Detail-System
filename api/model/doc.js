const mongoose = require('mongoose');

const moment = require('moment');


const docSchema = mongoose.Schema({

    docUn: {
        type: String,
        maxlength:50,
        unique: 1
    },
    docName : {
        type : String
    },
    channelFee : {
        type : Number
    },

    specialization: {
        type: String
    },

    hospital: {
        type: String
    },

    channelDays: {
        type: String
    },

    time: {
        type: String
    },

    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    }


})





const Doc = mongoose.model('Doctors', docSchema);
module.exports = {Doc};