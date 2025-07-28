import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { config } from "dotenv";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
config({ path: "./config/config.env" });

cloudinary.config({
  cloud_name: "dvtlak2jy",
  api_key: "272191343579253",
  api_secret: "mFawyHBY5kIadGKq6pqU1_3zmfc",
});

export const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://billcarft-ry8l.vercel.app",
      "https://billcarft.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/invoice", invoiceRoutes);

connectDB();
app.use(errorMiddleware);
