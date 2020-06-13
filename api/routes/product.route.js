var express = require("express");
var Product = require("../model/product.model");
var ProductRouter = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, 'api/uploads/');
    cb(null, "client/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

/*
    stores image in uploads folder
    using multer and creates a reference to the
    file
*/
ProductRouter.route("/add").post(
  upload.single("imageData"),
  (req, res, next) => {
    console.log(req.body);
    const newProduct = new Product({
      imageName: req.body.imageName,
      // imageData: req.file.path,
      imageData: req.file.path.substr(22),
      product_id: req.body.product_id,
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_discount: req.body.product_discount,
      product_category: req.body.product_category,
    });

    newProduct
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          success: true,
          document: result,
        });
      })
      .catch((err) => next(err));
  }
);

//get data
ProductRouter.route("/").get(function (req, res) {
  Product.find(function (err, product) {
    if (err) console.log(err);
    else {
      res.json(product);
    }
  });
});

//edit
ProductRouter.route("/edit/:id").get(function (req, res) {
  let id = req.params.id;
  Product.findById(id, function (err, product) {
    res.json(product);
  });
});

//update
ProductRouter.route("/update/:id").post(function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (!product) res.status(404).send("data is not found");
    else {
      product.product_id = req.body.product_id;
      product.product_name = req.body.product_name;
      product.product_price = req.body.product_price;
      product.product_discount = req.body.product_discount;
      product.product_category = req.body.product_category;

      product
        .save()
        .then((product) => {
          res.json("Update complete");
        })
        .catch((err) => {
          res.status(400).send("Unable to update database");
        });
    }
  });
});

//delete
ProductRouter.route('/delete/:id').get(function(req, res){
  Product.findByIdAndRemove({_id:req.params.id}, function(err, business){
    if(err)res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = ProductRouter;
