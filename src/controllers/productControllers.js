const Product = require("../models/productModel");
const { successResponse, errorResponse } = require("./responseControllers");

// Add a single product
const addSingleProduct = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPrice = Number(price);
    if (isNaN(newPrice) || newPrice < 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
    });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    console.error("Product add failed :", error);
  }
};

// add multiple products
const addMultipleProduct = async (req, res, next) => {
  try {
    const products = req.body;

    const newProduct = await Product.insertMany([...products]);

    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    console.error("Product add failed :", error);
  }
};

// get all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    return successResponse(res, {
      statusCode: 200,
      message: "Products fetched successfully",
      payload: products,
    });
  } catch (error) {
    console.error(error);
  }
};

// get a single product
const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Product ID is required",
      });
    }

    const product = await Product.find({ _id: id });

    return successResponse(res, {
      statusCode: 200,
      message: "Product fetched successfully",
      payload: product,
    });
  } catch (error) {
    console.error(error);
  }
};

// update a product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    if (!id) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Product ID is required",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Product updated successfully",
      payload: updatedProduct,
    });
  } catch (error) {
    console.error(error);
  }
};

// update a specific product item
const updateProductItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    if (!id) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Product ID is required",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { price },
      { new: true }
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Product updated successfully",
      payload: updatedProduct,
    });
  } catch (error) {
    console.error(error);
  }
};

// delete a product
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Product ID is required",
      });
    }

    const dateProduct = await Product.findByIdAndDelete({ _id: id });

    return successResponse(res, {
      statusCode: 200,
      message: "Product deleted successfully",
      payload: dateProduct,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addSingleProduct,
  addMultipleProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  updateProductItem,
  deleteProduct,
};
