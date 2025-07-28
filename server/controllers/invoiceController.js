import { Product } from "../models/productModel.js";
import { Invoice } from "../models/invoiceModel.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { generateInvoiceTemplate } from "../utils/invoiceTemplate.js";
import fs from "fs";

export const createInvoice = catchAsyncErrors(async (req, res, next) => {
  const { customerName, items } = req.body;

  if (!customerName || !items || !Array.isArray(items) || items.length === 0) {
    return next(new ErrorHandler("Customer name and items are required", 400));
  }

  const detailedItems = [];
  let totalAmount = 0;

  for (const item of items) {
    const product = await Product.findOne({
      _id: item.productId,
      user: req.user._id,
    });

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const quantity = item.quantity;
    const price = product.price;
    const gstRate = product.gstRate || 0;

    const gstAmount = (price * gstRate * quantity) / 100;
    const total = price * quantity + gstAmount;

    totalAmount += total;

    detailedItems.push({
      product: product._id,
      name: product.name,
      quantity,
      price,
      gstRate,
      gstAmount,
      total,
    });
  }

  const invoice = await Invoice.create({
    user: req.user._id,
    customerName,
    items: detailedItems,
    totalAmount,
  });

  res.status(201).json({
    success: true,
    message: "Invoice created successfully.",
    invoice,
  });
});

export const getMyInvoices = catchAsyncErrors(async (req, res, next) => {
  const invoices = await Invoice.find({ user: req.user._id }).populate(
    "items.product"
  );

  res.status(200).json({
    success: true,
    invoices,
  });
});

// export const generateInvoicePDF = catchAsyncErrors(async (req, res, next) => {
//   const { id } = req.params;

//   const invoice = await Invoice.findOne({
//     _id: id,
//     user: req.user._id,
//   }).populate("items.product");

//   if (!invoice) {
//     return next(new ErrorHandler("Invoice not found", 404));
//   }

//   const doc = new PDFDocument();
//   const filename = `Invoice_${invoice._id}.pdf`;

//   // Set headers
//   res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
//   res.setHeader("Content-Type", "application/pdf");

//   doc.pipe(res); // pipe output to response

//   // === PDF CONTENT START ===
//   doc.fontSize(20).text("INVOICE", { align: "center" });
//   doc.moveDown();

//   doc.fontSize(12).text(`Customer Name: ${invoice.customerName}`);
//   doc.text(`Invoice ID: ${invoice._id}`);
//   doc.text(`Date: ${invoice.createdAt.toDateString()}`);
//   doc.moveDown();

//   // Table Headers
//   doc
//     .fontSize(12)
//     .text("Product", 50)
//     .text("Qty", 200)
//     .text("Price", 250)
//     .text("GST", 300)
//     .text("Total", 370);
//   doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
//   doc.moveDown(0.5);

//   invoice.items.forEach((item) => {
//     doc
//       .text(item.product.name, 50)
//       .text(item.quantity, 200)
//       .text(`₹${item.price.toFixed(2)}`, 250)
//       .text(`${item.gstRate}%`, 300)
//       .text(`₹${item.total.toFixed(2)}`, 370);
//     doc.moveDown(0.5);
//   });

//   doc.moveDown();
//   doc.fontSize(14).text(`Total Amount: ₹${invoice.totalAmount.toFixed(2)}`, {
//     align: "right",
//   });

//   doc.end(); // finalize PDF
// });

export const generateInvoicePDF = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const invoice = await Invoice.findOne({
    _id: id,
    user: req.user._id,
  })
    .populate("items.product")
    .populate("user", "gstNumber")
    .populate("user", "businessName");

  if (!invoice) {
    return next(new ErrorHandler("Invoice not found", 404));
  }

  generateInvoiceTemplate(res, invoice);
});

export const deleteInvoice = catchAsyncErrors(async (req, res, next) => {
  const invoice = await Invoice.findOne({
    _id: req.params.id,
    user: req.user._id, // <-- uses "user" instead of "createdBy"
  });

  if (!invoice) {
    return next(new ErrorHandler("Invoice not found", 404));
  }

  // Optional: delete associated PDF if stored on disk
  const pdfPath = `invoices/${invoice._id}.pdf`; // Adjust if different
  if (fs.existsSync(pdfPath)) {
    fs.unlinkSync(pdfPath);
  }

  await invoice.deleteOne();

  res.status(200).json({
    success: true,
    message: "Invoice deleted successfully",
  });
});
