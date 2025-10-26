import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    hsCode: {
      type: String,
      required: [true, "HS Code is required"],
      match: [/^\d{4}\.\d{4}$/, "HS Code must be in ####.#### format"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxLength: [60, "Description must be at most 60 characters"],
    },
    uom: {
      type: String,
      required: [true, "Unit of Measure is required"],
      default: "Numbers",
    },
    taxType: {
      type: String,
      required: [true, "Tax Type is required"],
      default: "Goods at Standard Rates (Default)",
    },
    qtyInHand: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be greater than 0"],
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
