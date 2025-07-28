import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import popupReduces from "./slices/popupSlice";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import invoiceReducer from "./slices/invoiceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReduces,
    user: userReducer,
    product: productReducer,
    invoice: invoiceReducer,
  },
});
