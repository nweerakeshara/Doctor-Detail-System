const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Order = new Schema(
  {
    order_id: {
      type: String,
    },
    total_price: {
      type: Number,
    },
    items: {
      type: Array,
    },
  },
  {
    collection: "orders",
  }
);

module.exports = mongoose.model("Order", Order);
