const paginate = require('jw-paginate');

const express = require('express');
const router = express.Router();


const shoppingItem = require('../model/product.model');

router.get('/get/all/paginate', (req,res) => {
   shoppingItem.find().then(items => {

      const page = parseInt(req.query.page) || 1;

      // get size of items that should display
      const pageSize = 5;
      const pager = paginate(items.length, page, pageSize);

      // get the page number from item list
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

      // return pagination related data and items in the selected page
      return res.json({ pager, pageOfItems });

   });


});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////



router.get('/get/all/paginate/search', (req,res) => {
   shoppingItem.find({ product_name: new RegExp(req.query.sitem, 'i')   }).then(items => {

      const page = parseInt(req.query.page) || 1;

      // get size of items that should display
      const pageSize = 5;
      const pager = paginate(items.length, page, pageSize);

      // get the page number from item list
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

      // return pagination related data and items in the selected page
      return res.json({ pager, pageOfItems });

   });


});



module.exports = router;