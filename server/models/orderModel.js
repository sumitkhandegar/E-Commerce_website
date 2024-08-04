import mongoose from "mongoose";
import Products from "./productModel.js";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Products,
      },
    ],
    buyer: {
      type: String,
      ref: 'User',
    },
    status: {
      type: String,
      default: 'Not Processed',
      enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);