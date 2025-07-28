import PDFDocument from "pdfkit";
import path from "path";
const logoPath = path.resolve("assets/logo.png");

export const generateInvoiceTemplate = (res, invoice) => {
  const doc = new PDFDocument({ margin: 50 });

  const safeCustomerName = invoice.customerName
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");
  const filename = `Invoice_${safeCustomerName}.pdf`;

  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
  res.setHeader("Content-Type", "application/pdf");

  doc.pipe(res);

  // === Branding / Header ===
  doc
    .fillColor("#312e81")
    .fontSize(26)
    .font("Helvetica-Bold")
    .text(`${invoice.user.businessName}`, { align: "left" }) // shift text right to leave space for logo

    .moveDown(0.2)
    .fontSize(10)
    .fillColor("#444")
    .font("Helvetica")
    .text("123 Business Street | City, State, 12345")
    .text("Phone: +91-9876543210")
    .text("Email: support@company.com")
    .text(`GST Number: ${invoice.user.gstNumber}`)
    .moveDown(1);

  // === Invoice Header ===
  doc
    .fontSize(20)
    .fillColor("#000")
    .font("Helvetica-Bold")
    .text("INVOICE", { align: "right" })
    .fontSize(12)
    .moveDown(0.3)
    .font("Helvetica")
    .text(`Invoice ID: ${invoice._id}`, { align: "right" })
    .text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, {
      align: "right",
    });

  doc.moveDown();

  // === Customer Info Box ===
  doc
    .roundedRect(50, doc.y, 500, 60, 6)
    .stroke("#312e81")
    // .fillOpacity(0.05)
    .fillColor("#f3f4f6")
    .fillAndStroke("#f9fafb", "#312e81");

  doc
    .fillColor("#312e81")
    .fontSize(12)
    .text(`Billed To: ${invoice.customerName}`, 60, doc.y + 8);

  doc.moveDown(4);

  // === Table Header ===
  const tableTop = doc.y;
  const colWidths = { name: 200, qty: 60, price: 80, gst: 60, total: 80 };

  const drawRow = (y, item, isHeader = false) => {
    doc
      .font(isHeader ? "Helvetica-Bold" : "Helvetica")
      .fontSize(11)
      .fillColor(isHeader ? "#000" : "#111")
      .text(item.name, 50, y, { width: colWidths.name })
      .text(item.qty, 50 + colWidths.name, y, { width: colWidths.qty })
      .text(item.price, 50 + colWidths.name + colWidths.qty, y, {
        width: colWidths.price,
      })
      .text(
        item.gst,
        50 + colWidths.name + colWidths.qty + colWidths.price,
        y,
        { width: colWidths.gst }
      )
      .text(
        item.total,
        50 + colWidths.name + colWidths.qty + colWidths.price + colWidths.gst,
        y,
        { width: colWidths.total }
      );

    // Add bottom border
    doc
      .moveTo(50, y + 15)
      .lineTo(550, y + 15)
      .strokeColor("#e5e7eb")
      .stroke();
  };

  // === Draw Table Header ===
  drawRow(
    tableTop,
    {
      name: "Product",
      qty: "Qty",
      price: "Price",
      gst: "GST",
      total: "Total",
    },
    true
  );

  // === Draw Table Rows ===
  let y = tableTop + 25;
  invoice.items.forEach((item) => {
    drawRow(y, {
      name: item.name || item.product.name,
      qty: item.quantity,
      price: `₹${item.price.toFixed(2)}`,
      gst: `${item.gstRate}%`,
      total: `₹${item.total.toFixed(2)}`,
    });
    y += 25;
  });

  // === Total Box ===
  const totalBoxY = doc.y + 30;

  doc
    .roundedRect(350, totalBoxY, 180, 40, 6)
    .fillColor("#f3f4f6") // Light gray background like Tailwind's bg-gray-100
    .stroke("#d1d5db") // Border gray-300
    .fillAndStroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#312e81") // Indigo-600 for title
    .text("Total Amount", 360, totalBoxY + 8, {
      align: "left",
    });

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#000")
    .text(`₹${invoice.totalAmount.toFixed(2)}`, 360, totalBoxY + 22, {
      align: "left",
    });

  // === Footer ===
  const bottomY = doc.page.height - 120; // ~120px above page bottom

  doc
    .fontSize(10)
    .fillColor("#000")
    .text("Terms & Conditions:", 50, bottomY)
    .moveDown(0.5)
    .fontSize(10)
    .fillColor("#111")
    .text(
      "1. Payment is due within 15 days.\n" +
        "2. Late payment will attract a 5% penalty.\n" +
        "3. Goods once sold will not be taken back or exchanged.",
      {
        align: "left",
        width: 500,
      }
    );

  doc.end();
};
