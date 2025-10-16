const express = require("express");
const {
  addSingleProduct,
  addMultipleProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  updateProductItem,
  deleteProduct,
} = require("../controllers/productControllers");

const productRoute = express.Router();

// inset a product
productRoute.post("/add-single-product", addSingleProduct);

// inset multiple products
productRoute.post("/add-multiple-product", addMultipleProduct);

// get all products
productRoute.get("/all-products", getAllProducts);

// get a single product
productRoute.get("/single-product/:id", getSingleProduct);

// update a product
productRoute.put("/update-product/:id", updateProduct); // put request => replace the entire product data

// update a specific product item
productRoute.patch("/update-product-item/:id", updateProductItem); // patch request => update the specific product data

// delete a product
productRoute.delete("/delete-product/:id", deleteProduct);

module.exports = productRoute;
