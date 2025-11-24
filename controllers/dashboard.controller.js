
import mongoose from "mongoose";
import saleInvoice from "../models/saleInvoice.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10); 
    const now = new Date();

    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .slice(0, 10);

    
    const todayInvoices = await saleInvoice.find({
      invoiceDate: today,
    });

    const todaySales = todayInvoices.reduce(
      (sum, inv) => sum + (inv.grandTotal || 0),
      0
    );

   
    const todayInvoiceCount = todayInvoices.length;

   
    const monthInvoices = await saleInvoice.find({
      invoiceDate: { $gte: firstDayOfMonth, $lte: today },
    });

    const monthSales = monthInvoices.reduce(
      (sum, inv) => sum + (inv.grandTotal || 0),
      0
    );

   
    const monthInvoiceCount = monthInvoices.length;

  
    const todayBreakdown = todayInvoices.map((inv) => ({
      date: inv.invoiceDate,
      invoiceNo: inv._id,
      amount: inv.grandTotal,
      customer: inv.buyerBusinessName,
      tax: inv.items.reduce((s, i) => s + (i.salesTaxApplicable || 0), 0),
      createdBy: inv.userId,
    }));

    return res.status(200).json({
      success: true,
      data: {
        todaySales,
        todayInvoiceCount,
        monthSales,
        monthInvoiceCount,
        todayBreakdown,
      },
    });
  } catch (err) {
    console.error("Dashboard Error: ", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
