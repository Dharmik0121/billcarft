import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  createInvoice,
  deleteInvoice,
  generateInvoicePDF,
  getMyInvoices,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/create", isAuthenticated, createInvoice);
router.get("/my-invoices", isAuthenticated, getMyInvoices);
router.get("/download/:id", isAuthenticated, generateInvoicePDF);
router.delete("/delete/:id", isAuthenticated, deleteInvoice);
export default router;
