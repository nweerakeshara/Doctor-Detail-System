const  express = require('express');
const productCategoryRoutes = express.Router();

let ProductCategory = require('../model/productCategory.model.js');

//store
productCategoryRoutes.route('/add').post(function(req, res){
    let productcategory = new ProductCategory(req.body);
    productcategory.save()
        .then(productcategory => {
            // res.status(200).json({'product': 'product is added successfully'});
            res.status(200).json({success: true});
        })
        .catch(err => {
            // res.status(400).send("unable to save product to database");
            res.status(400).json({success: false},err);
        });
});

//get data
productCategoryRoutes.route('/').get(function(req,res){
    ProductCategory.find(function(err, productCategory){
        if(err)
            console.log(err);
        else{
            res.json(productCategory);
        }
    });
});

module.exports = productCategoryRoutes;
