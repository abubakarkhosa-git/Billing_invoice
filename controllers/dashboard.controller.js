import SalesInvoice from "../models/saleInvoice.model.js";
import Customer from "../models/customer.Model.js";

export const  getDashboardStats = async (req, res) => {
  try {
    const userId = req.userId;

    const totalInvoices = await SalesInvoice.countDocuments({ userId });

    const totalSales = await SalesInvoice.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$grandTotal" } } }
    ]);

    const recentInvoices = await SalesInvoice.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    const customers = await Customer.countDocuments({ userId });

    res.status(200).json({
      status: true,
      data: {
        totalInvoices,
        totalSales: totalSales[0]?.total || 0,
        recentInvoices,
        customers,
      },
    });

  } catch (error) {
    res.status(500).json({ status: false, message: "Dashboard error" });
  }
};



















// export const getDashboardStats = async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

  
//     const totalInvoices = await SalesInvoice.countDocuments();

  
//     const totalSales = await SalesInvoice.aggregate([
//       { $group: { _id: null, total: { $sum: "$grandTotal" } } }
//     ]);

   
//     const todayInvoices = await SalesInvoice.countDocuments({
//       createdAt: { $gte: today }
//     });

//     const todaySales = await SalesInvoice.aggregate([
//       { $match: { createdAt: { $gte: today } } },
//       { $group: { _id: null, total: { $sum: "$grandTotal" } } }
//     ]);

   
//     const last7Days = await SalesInvoice.aggregate([
//       {
//         $group: {
//           _id: {
//             day: { $dayOfMonth: "$createdAt" },
//             month: { $month: "$createdAt" },
//             year: { $year: "$createdAt" }
//           },
//           totalSales: { $sum: "$grandTotal" },
//           invoiceCount: { $sum: 1 }
//         }
//       },
//       { $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 } },
//       { $limit: 7 }
//     ]);

    
//     const latestInvoices = await SalesInvoice.find()
//       .sort({ createdAt: -1 })
//       .limit(20)
//       .lean(); 

//     return res.status(200).json({
//       success: true,
//       summary: {
//         totalInvoices,
//         totalSales: totalSales[0]?.total || 0,

//         todayInvoices,
//         todaySales: todaySales[0]?.total || 0,
//       },

//       chart: {
//         last7Days,
//       },

//       invoices: latestInvoices, 
//     });

//   } catch (error) {
//     console.error("Dashboard Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to load dashboard",
//       error: error.message
//     });
//   }
// };
