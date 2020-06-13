const mongoose = require('mongoose');
const Schema = mongoose.Schema;




let Comments = new Schema({
    cusUn: {
        type: String

    },


    product_id: {
        type: String

    },

    commBody : {
        type:String

    },
},{
    collection : 'Comments'
});

module.exports = mongoose.model('Comments', Comments);