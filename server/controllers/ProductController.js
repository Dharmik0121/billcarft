import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import { Product } from "../models/productModel.js";
import ErrorHandler from "../middleware/errorMiddleware.js";

export const addProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, gstRate } = req.body;

  if (!name || !price) {
    return next(new ErrorHandler("Please fill all the fields.", 400));
  }

  if (price <= 0) {
    return next(new ErrorHandler("Price must be greater than zero.", 400));
  }

  const product = await Product.create({
    user: req.user._id,
    name,
    description,
    price,
    gstRate,
  });

  res.status(201).json({
    success: true,
    message: "Product added successfully.",
    product,
  });
});

export const getMyProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({ user: req.user._id });

  if (products.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No products found for this user.",
      products: [],
    });
  }

  res.status(200).json({
    success: true,
    products,
  });
});

export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, gstRate } = req.body;

  const product = await Product.findOne({ _id: id, user: req.user._id });

  if (!product) {
    return next(new ErrorHandler("Product not found or unauthorized.", 404));
  }

  // Update fields
  if (name !== undefined) product.name = name;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = price;
  if (gstRate !== undefined) product.gstRate = gstRate;

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    product,
  });
});

export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!product) {
    return next(new ErrorHandler("Product not found or unauthorized.", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
  });
});
