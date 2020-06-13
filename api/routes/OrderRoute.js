const express = require("express");
const orderRoutes = express.Router();

let Order = require("../model/OrderModel");

//order
orderRoutes.route("/add").post(function (req, res) {
  let order = new Order(req.body);
  order
    .save()
    .then((order) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false }, err);
    });
});

module.exports = orderRoutes;
