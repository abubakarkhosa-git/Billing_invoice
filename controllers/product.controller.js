import productModel from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const { hsCode, description, uom, taxType, qtyInHand } = req.body;

    const product = await productModel.create({
      hsCode,
      description,
      uom,
      taxType,
      qtyInHand,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updates = req.body; // The data to update

  try {
    // Find the product by ID and update it
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updates,
      { new: true, runValidators: true } // return the updated doc & validate data
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};