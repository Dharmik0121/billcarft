import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { toggleCreateInvoicePopup } from "./popupSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    loading: false,
    error: null,
    message: null,
    myInvoices: [],
  },
  reducers: {
    invoiceRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    invoiceSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    invoiceFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getUserInvoicesSuccess(state, action) {
      state.loading = false;
      state.myInvoices = action.payload.invoices;
    },

    resetInvoiceSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  invoiceRequest,
  invoiceSuccess,
  invoiceFailed,
  getUserInvoicesSuccess,
  resetInvoiceSlice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

// Create Invoice
export const createInvoice = (data) => async (dispatch) => {
  dispatch(invoiceRequest());
  try {
    const res = await axios.post(`${BACKEND_URL}/api/v1/invoice/create`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob", // If backend sends PDF
    });
    const blob = new Blob([res.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `invoice_${Date.now()}.pdf`;
    link.click();

    dispatch(invoiceSuccess({ message: "Invoice created successfully" }));
    toast.success("Invoice created successfully!");
    dispatch(toggleCreateInvoicePopup());
    dispatch(getMyInvoices());
  } catch (error) {
    dispatch(
      invoiceFailed(error.response?.data?.message || "Failed to create invoice")
    );
    toast.error("Failed to create invoice.");
  }
};

// Get Invoices
export const getMyInvoices = () => async (dispatch) => {
  dispatch(invoiceRequest());
  try {
    const res = await axios.get(`${BACKEND_URL}/api/v1/invoice/my-invoices`, {
      withCredentials: true,
    });
    dispatch(getUserInvoicesSuccess(res.data));
  } catch (error) {
    dispatch(
      invoiceFailed(error.response?.data?.message || "Failed to load invoices")
    );
  }
};

// Download Invoice
export const downloadInvoice =
  ({ invoiceId, customerName }) =>
  async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/invoice/download/${invoiceId}`,
        {
          withCredentials: true,
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice_${customerName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      toast.error("Failed to download PDF");
      console.log(err);
    }
  };

// export const deleteInvoice = (id) => async (dispatch) => {
//   dispatch(invoiceRequest());
//   try {
//     const res = await axios.delete(
//       `${BACKEND_URL}/api/v1/invoice/delete/${id}`,
//       {
//         withCredentials: true,
//       }
//     );
//     dispatch(invoiceSuccess(res.data));
//     toast.success("Invoice deleted successfully.");
//     dispatch(getMyInvoices());
//   } catch (error) {
//     dispatch(
//       invoiceFailed(error.response?.data?.message || "Failed to delete invoice")
//     );
//     toast.error("Error deleting invoice.");
//   }
// };

export const deleteInvoice = (id) => async (dispatch) => {
  dispatch(invoiceRequest());
  try {
    const res = await axios.delete(
      `${BACKEND_URL}/api/v1/invoice/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(invoiceSuccess(res.data));
    toast.success("Invoice deleted successfully.");
    dispatch(getMyInvoices());
  } catch (error) {
    dispatch(
      invoiceFailed(error.response?.data?.message || "Failed to delete invoice")
    );
    toast.error("Failed to delete invoice.");
  }
};
