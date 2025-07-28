// store/slices/popupSlice.js
import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    settingPopup: false,
    addNewProductPopup: false,
    deletePopup: false,
    createInvoicePopup: false,
  },
  reducers: {
    toggleSettingPopup(state) {
      state.settingPopup = !state.settingPopup;
    },
    toggleAddNewProductPopup(state) {
      state.addNewProductPopup = !state.addNewProductPopup;
    },
    toggleDeletePopup(state) {
      state.deletePopup = !state.deletePopup;
    },
    toggleCreateInvoicePopup(state) {
      state.createInvoicePopup = !state.createInvoicePopup;
    },
    closeAllPopup(state) {
      state.settingPopup = false;
      state.addNewProductPopup = false;
      state.deletePopup = false;
    },
  },
});

export const {
  toggleSettingPopup,
  toggleAddNewProductPopup,
  toggleDeletePopup,
  closeAllPopup,
  toggleCreateInvoicePopup,
} = popupSlice.actions;

export default popupSlice.reducer;
