const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Rating = new Schema(
  {
    user_id: {
      type: String,
    },
    product_id: {
      type: String,
    },
    value: {
      type: Number,
    },
  },
  {
    collection: "ratings",
  }
);

module.exports = mongoose.model("Rating", Rating);
