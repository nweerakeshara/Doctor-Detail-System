const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductCategory = new Schema({
    productcategory_name : {
        type : String
    }
},{
    collection : 'productCategory'
});

module.exports = mongoose.model('ProductCategory', ProductCategory);
