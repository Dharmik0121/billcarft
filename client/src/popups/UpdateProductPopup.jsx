import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../store/slices/productSlice";
import { FaBoxOpen, FaSpinner } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

const UpdateProductPopup = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    gstRate: product.gstRate,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateProduct(product._id, form));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500/40 p-5 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-6 pb-3 border-b border-indigo-900">
            <div className="flex items-center gap-3">
              <FaBoxOpen className="bg-indigo-100 text-indigo-900 rounded-lg p-2 text-4xl" />
              <h3 className="text-xl font-bold text-indigo-900">Update Product</h3>
            </div>
            <MdClose
              className="text-indigo-900 text-xl cursor-pointer hover:text-indigo-700"
              onClick={onClose}
            />
          </header>

          {/* Form */}
          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Product Name */}
            <div>
              <label className="block text-indigo-900 font-medium mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                placeholder="e.g., MacBook Air"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-indigo-900 font-medium mb-1">Description</label>
              <input
                type="text"
                name="description"
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                placeholder="e.g., Electronics"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-indigo-900 font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                placeholder="e.g., 89999"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* GST Rate */}
            <div>
              <label className="block text-indigo-900 font-medium mb-1">GST Rate (%)</label>
              <input
                type="number"
                name="gstRate"
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                placeholder="e.g., 18"
                value={form.gstRate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-indigo-100 text-indigo-900 rounded-md hover:bg-indigo-200"
              >
                Cancel
              </button>

              {loading ? (
                <button
                  disabled
                  className="px-4 py-2 font-semibold bg-indigo-900 text-white rounded-md flex items-center justify-center"
                >
                  <FaSpinner className="animate-spin mx-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 cursor-pointer py-2 font-semibold bg-indigo-900 text-white rounded-md hover:bg-indigo-800"
                >
                  Update Product
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPopup;
