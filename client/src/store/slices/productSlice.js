import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleAddNewProductPopup } from "./popupSlice";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null,
    message: null,
    myProducts: [],
  },
  reducers: {
    productRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    productSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    productFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getUserProductsSuccess(state, action) {
      state.loading = false;
      state.myProducts = action.payload.products;
    },
    resetProductSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  productRequest,
  productSuccess,
  productFailed,
  getUserProductsSuccess,
  resetProductSlice,
} = productSlice.actions;

export default productSlice.reducer;

// Add Product
export const createProduct = (data) => async (dispatch) => {
  dispatch(productRequest());
  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/products/add/new-product`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(productSuccess(res.data));
    dispatch(toggleAddNewProductPopup());
    dispatch(getMyProducts()); // Refresh product list after adding
  } catch (error) {
    dispatch(
      productFailed(error.response?.data?.message || "Failed to add product")
    );
  }
};

// Fetch products created by the logged-in user
export const getMyProducts = () => async (dispatch) => {
  dispatch(productRequest());
  try {
    const res = await axios.get(`${BACKEND_URL}/api/v1/products/my-products`, {
      withCredentials: true, // Important for cookie-based auth
    });
    dispatch(getUserProductsSuccess(res.data));
  } catch (error) {
    dispatch(
      productFailed(error.response?.data?.message || "Failed to load products")
    );
  }
};

export const updateProduct = (id, data) => async (dispatch) => {
  dispatch(productRequest());
  try {
    const res = await axios.put(
      `${BACKEND_URL}/api/v1/products/update/${id}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(productSuccess(res.data));
    toast.success("Product Updated Successfully.");
    dispatch(getMyProducts()); // Refresh list
  } catch (error) {
    dispatch(
      productFailed(error.response?.data?.message || "Failed to update product")
    );
    toast.error("Something went wrong.");
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(productRequest());
  try {
    const res = await axios.delete(
      `${BACKEND_URL}/api/v1/products/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(productSuccess(res.data));
    toast.success("Product deleted successfully.");
    dispatch(getMyProducts());
  } catch (error) {
    dispatch(
      productFailed(error.response?.data?.message || "Failed to delete product")
    );
    toast.error("Error deleting product.");
  }
};
