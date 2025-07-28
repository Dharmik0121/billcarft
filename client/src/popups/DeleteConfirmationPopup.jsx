// popups/DeleteConfirmationPopup.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../store/slices/productSlice";
import { toggleDeletePopup } from "../store/slices/popupSlice";
import { MdClose } from "react-icons/md";
import { FaTrash, FaSpinner } from "react-icons/fa6";

const DeleteConfirmationPopup = ({ productId }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.product);

    const handleDelete = () => {
        dispatch(deleteProduct(productId));
        dispatch(toggleDeletePopup());
    };

    return (
        <div className="fixed inset-0 bg-gray-500/40 p-5 flex items-center justify-center z-50">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl">
                <div className="p-6">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-6 pb-3 border-b border-red-600">
                        <div className="flex items-center gap-3">
                            <FaTrash className="bg-red-100 text-red-600 rounded-lg p-2 text-4xl" />
                            <h3 className="text-xl font-bold text-red-600">Delete Product</h3>
                        </div>
                        <MdClose
                            className="text-red-600 text-xl cursor-pointer hover:text-red-800"
                            onClick={() => dispatch(toggleDeletePopup())}
                        />
                    </header>

                    {/* Body */}
                    <p className="text-gray-700 mb-6 text-sm">
                        Are you sure you want to permanently delete this product? This action cannot be undone.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4 pt-2">
                        <button
                            onClick={() => dispatch(toggleDeletePopup())}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="px-4 py-2 font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center"
                        >
                            {loading ? <FaSpinner className="animate-spin mx-2" /> : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationPopup;
