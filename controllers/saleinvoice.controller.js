import SalesInvoice from "../models/saleInvoice.model.js";
import User from "../models/user.model.js"


export const createInvoice = async (req, res) => {
  try {
    const invoice = await SalesInvoice.create(req.body);

    return res.status(201).json({
      status: true,
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    console.error("Create Invoice Error:", error);
    return res.status(500).json({ status: false, message: "Server Error" });
  }
};


export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await SalesInvoice.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      data: invoices,
    });
  } catch (error) {
    console.error("Get All Error:", error);
    return res.status(500).json({ status: false, message: "Server Error" });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await SalesInvoice.findById(req.params.id);

    if (!invoice)
      return res.status(404).json({ status: false, message: "Invoice not found" });

    return res.status(200).json({
      status: true,
      data: invoice,
    });
  } catch (error) {
    console.error("Get By ID Error:", error);
    return res.status(500).json({ status: false, message: "Server Error" });
  }
};

export const getSellerDetails = async (req, res) => {
  try {
    // Logged-in user ka id middleware se milta hai
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "NTNCNIC BusinessName Address Province"
    );

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Seller details fetched successfully",
      data: user, // 👍 single object, array nahi!
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching seller details",
      error: error.message,
    });
  }
};


// export const updateInvoice = async (req, res) => {
//   try {
//     const updated = await SalesInvoice.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updated)
//       return res.status(404).json({ status: false, message: "Invoice not found" });

//     return res.status(200).json({
//       status: true,
//       message: "Invoice updated successfully",
//       data: updated,
//     });
//   } catch (error) {
//     console.error("Update Error:", error);
//     return res.status(500).json({ status: false, message: "Server Error" });
//   }
// };


// export const deleteInvoice = async (req, res) => {
//   try {
//     const deleted = await SalesInvoice.findByIdAndDelete(req.params.id);

//     if (!deleted)
//       return res.status(404).json({ status: false, message: "Invoice not found" });

//     return res.status(200).json({
//       status: true,
//       message: "Invoice deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete Error:", error);
//     return res.status(500).json({ status: false, message: "Server Error" });
//   }
// };
