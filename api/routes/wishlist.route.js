//Wish List Routings
const express = require("express");
const wishListRoute = express.Router();

let WishList = require("../model/wishlist");

//Add items to the wishlist
wishListRoute.route("/add").post(function (req, res) {
  let wishList = new WishList(req.body);
  wishList
    .save()
    .then((data) => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false });      
    });
});

//get items from wishlist from user ID
wishListRoute.route("/get/:id").get(function (req, res) {
  WishList.find({ user_ID: req.params.id }, function (err, product) {
    if (err) console.log(err);
    else {
      res.json(product);
    }
  });
});

//delete an item from the wishlist
wishListRoute.route("/delete/:id/:cus_id").delete(function (req, res) {
  WishList.deleteOne(
    { product_id: req.params.id, user_ID: req.params.cus_id },
    function (err, product) {
      if (err) res.json(err);
      else res.json("Successfully Removed");
    }
  );
});

module.exports = wishListRoute;
