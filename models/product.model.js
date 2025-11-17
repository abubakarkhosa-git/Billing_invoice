import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    hsCode: {
      type: String,
      unique: true,
      required: [true, "HS Code is required"],
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
      descriptionType:{
        type: String, 
        required: true
      },
      salesTaxValue:{
        type: String,
        reuired: true
      }
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
