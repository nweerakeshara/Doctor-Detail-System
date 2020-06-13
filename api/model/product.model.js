const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    Image Schema for storing images in the
    mongodb database
*/
var ProductSchema = new Schema({
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

    days: {
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
},{
    collection : 'products'
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

