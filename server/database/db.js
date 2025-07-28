import mongoose from "mongoose";

export const connectDB = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI, {
        dbName: "Data",
      })
      .then(() => {
        console.log("Database connected...");
      });
  } catch (error) {
    console.error(error);
    console.log("Error while connecting...");
    process.exit(1);
  }
};
