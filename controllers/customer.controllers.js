import customerModel from "../models/customer.Model.js"

export const addCustomer = async (req, res) => {
  try {
    const { name, ntnCnic, address, contact, product, province, customertype } = req.body;

    // ✅ Validation check (optional but good)
    if (!name || !ntnCnic || !address || !contact || !product || !province || !customertype) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Create new customer
    const customer = await customerModel.create({
      name,
      ntnCnic,
      address,
      contact,
      product,
      province,
      customertype,
    });

    // ✅ Success response
    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      data: customer,
    });

  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



