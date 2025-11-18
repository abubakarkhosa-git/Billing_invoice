import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  hsCode: { type: String, required: true },
  productDescription: { type: String, required: true },
  uom: { type: String, required: true },
  taxType: {
    descriptionType: { type: String, required: true },
    salesTaxValue: { type: Number, required: true },
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },

  furtherTax: { type: Number, default: 0 },

  productValueBeforeTax: { type: Number, required: true },
  productValueAfterTax: { type: Number, required: true },

  
  rate: { type: String },
  saleType: { type: String },
  discount: { type: Number, default: 0 },
  fedPayable: { type: Number, default: 0 },
  sroItemSerialNo: { type: String, default: "" },
  sroScheduleNo: { type: String, default: "" },
  salesTaxApplicable: { type: Number, default: 0 },
  valueSalesExcludingST: { type: Number, default: 0 },
  totalValues: { type: Number, default: 0 },
  fixedNotifiedValueOrRetailPrice: { type: Number, default: 0 },
  extraTax: { type: String, default: "" },
});

const salesInvoiceSchema = new mongoose.Schema(
  {
    invoiceType: { type: String, default: "Sale Invoice" },
    invoiceDate: { type: String, required: true },

  
    sellerNTNCNIC: { type: String, required: true },
    sellerBusinessName: { type: String, required: true },
    sellerProvince: { type: String, required: true },
    sellerAddress: { type: String, required: true },

    
    buyerNTNCNIC: { type: String, required: true },
    buyerBusinessName: { type: String, required: true },
    buyerProvince: { type: String, required: true },
    buyerAddress: { type: String, required: true },
    buyerRegistrationType: { type: String, enum: ["Registered", "Unregistered"], required: true },

  
    scenarioId: { type: String, default: "" },
    invoiceRefNo: { type: String, default: "" },

    items: [itemSchema],

  
    grandTotal: { type: Number, required: true },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("SalesInvoice", salesInvoiceSchema);
