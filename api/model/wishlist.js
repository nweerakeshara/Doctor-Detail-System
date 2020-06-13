///Wish List Database Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Wishlist = new Schema({
    product_id : {
        type : String,
        unique : true
        
    },
    product_name : {
        type : String
    },
    product_price : {
        type : Number
    },
    user_ID : {
        type : String,          
    },
    img_ID: {
        type: String,            
    },
    item_ID: {
        type: String,            
    }
},{
    collection : 'wishlist'
    
});

module.exports = mongoose.model('wishlist', Wishlist);