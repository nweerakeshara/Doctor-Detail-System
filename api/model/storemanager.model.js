const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StoreManager = new Schema({
    sm_fname : {
        type : String
    },
    sm_lname : {
        type : String
    },
    sm_address : {
        type : String
    },
    sm_email : {
        type : String
    },
    sm_password : {
        type : String
    },
    sm_pnumber: {
        type: Number
    }
},{
    collection : 'storemanager'
});

module.exports = mongoose.model('StoreManager', StoreManager);
