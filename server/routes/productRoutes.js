import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  addProduct,
  deleteProduct,
  getMyProducts,
  updateProduct,
} from "../controllers/ProductController.js";

const router = express.Router();

router.post("/add/new-product", isAuthenticated, addProduct);
router.get("/my-products", isAuthenticated, getMyProducts);
router.put("/update/:id", isAuthenticated, updateProduct);
router.delete("/delete/:id", isAuthenticated, deleteProduct);

export default router;
