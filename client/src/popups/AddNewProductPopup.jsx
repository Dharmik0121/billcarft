import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../store/slices/productSlice';
import { toggleAddNewProductPopup } from '../store/slices/popupSlice';
import { FaBoxOpen, FaSpinner } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';

const AddNewProductPopup = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.product);

    const [productName, setProductName] = useState('');
    const [description, setDiscription] = useState('');
    const [price, setPrice] = useState('');
    const [gst, setGst] = useState('');

    const handleAddProduct = (e) => {
        e.preventDefault();

        const productData = {
            name: productName,
            description,
            price,
            gstRate: gst
        };

        dispatch(createProduct(productData));
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-500/40 p-5 flex items-center justify-center z-50">
                <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl">
                    <div className="p-6">
                        {/* Header */}
                        <header className="flex justify-between items-center mb-6 pb-3 border-b border-indigo-900">
                            <div className="flex items-center gap-3">
                                <FaBoxOpen className="bg-indigo-100 text-indigo-900 rounded-lg p-2 text-4xl" />
                                <h3 className="text-xl font-bold text-indigo-900">Add New Product</h3>
                            </div>
                            <MdClose
                                className="text-indigo-900 text-xl cursor-pointer hover:text-indigo-700"
                                onClick={() => dispatch(toggleAddNewProductPopup())}
                            />
                        </header>

                        {/* Form */}
                        <form onSubmit={handleAddProduct} className="space-y-5">
                            {/* Product Name */}
                            <div>
                                <label className="block text-indigo-900 font-medium mb-1">Product Name</label>
                                <input
                                    type="text"
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                                    placeholder="e.g., iPhone 15"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-indigo-900 font-medium mb-1">Discription</label>
                                <input
                                    type="text"
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                                    placeholder="e.g., Electronics"
                                    value={description}
                                    onChange={(e) => setDiscription(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-indigo-900 font-medium mb-1">Price (₹)</label>
                                <input
                                    type="number"
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                                    placeholder="e.g., 79999"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Stock */}
                            <div>
                                <label className="block text-indigo-900 font-medium mb-1">GST (%)</label>
                                <input
                                    type="number"
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                                    placeholder="e.g., 100"
                                    value={gst}
                                    onChange={(e) => setGst(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => dispatch(toggleAddNewProductPopup())}
                                    className="px-4 cursor-pointer py-2 bg-indigo-100 text-indigo-900 rounded-md hover:bg-indigo-200"
                                >
                                    Close
                                </button>

                                {loading ? (
                                    <button
                                        disabled
                                        className="px-4 cursor-pointer py-2 font-semibold bg-indigo-900 text-white rounded-md flex items-center justify-center"
                                    >
                                        <FaSpinner className="animate-spin mx-2" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-4 py-2 cursor-pointer font-semibold bg-indigo-900 text-white rounded-md hover:bg-indigo-800"
                                    >
                                        Add Product
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNewProductPopup