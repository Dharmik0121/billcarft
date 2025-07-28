/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice } from "../store/slices/invoiceSlice";
import { getMyProducts } from "../store/slices/productSlice";
import { toggleCreateInvoicePopup } from "../store/slices/popupSlice";
import { MdClose } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa6";

const AddInvoicePopup = () => {
    const dispatch = useDispatch();
    const { myProducts } = useSelector((state) => state.product);
    const { loading } = useSelector((state) => state.invoice);

    const [customerName, setCustomerName] = useState("");
    const [selectedProductId, setSelectedProductId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        dispatch(getMyProducts());
    }, []);

    const handleAddItem = () => {
        if (!selectedProductId || quantity <= 0) return;

        const existingIndex = selectedItems.findIndex(
            (item) => item.productId === selectedProductId
        );

        if (existingIndex !== -1) {
            // If already added, update quantity
            const updatedItems = [...selectedItems];
            updatedItems[existingIndex].quantity += quantity;
            setSelectedItems(updatedItems);
        } else {
            setSelectedItems([
                ...selectedItems,
                { productId: selectedProductId, quantity },
            ]);
        }

        // Reset dropdown and quantity
        setSelectedProductId("");
        setQuantity(1);
    };

    const handleRemoveItem = (productId) => {
        setSelectedItems(selectedItems.filter((item) => item.productId !== productId));
    };

    const calculateLineTotal = (product, quantity) => {
        const gstAmount = (product.price * product.gstRate * quantity) / 100;
        return product.price * quantity + gstAmount;
    };

    const calculateTotal = () => {
        return selectedItems.reduce((acc, item) => {
            const product = myProducts.find((p) => p._id === item.productId);
            if (!product) return acc;
            return acc + calculateLineTotal(product, item.quantity);
        }, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!customerName || selectedItems.length === 0) return;

        const items = selectedItems.map(({ productId, quantity }) => ({
            productId,
            quantity,
        }));

        dispatch(createInvoice({ customerName, items }));
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-6">
                {/* Header */}
                <header className="flex justify-between items-center border-b pb-4 mb-4">
                    <div className="flex items-center gap-3">
                        <FaFileInvoice className="text-indigo-900 text-3xl" />
                        <h2 className="text-xl font-bold text-indigo-900">Create Invoice</h2>
                    </div>
                    <MdClose
                        onClick={() => dispatch(toggleCreateInvoicePopup())}
                        className="text-2xl text-indigo-900 cursor-pointer"
                    />
                </header>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer Name */}
                    <div>
                        <label className="block font-medium text-indigo-900 mb-1">Customer Name</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                            placeholder="e.g., Rahul Sharma"
                            required
                        />
                    </div>

                    {/* Product Dropdown */}
                    <div className="flex gap-4 items-end flex-wrap">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-indigo-900 mb-1">Select Product</label>
                            <select
                                value={selectedProductId}
                                onChange={(e) => setSelectedProductId(e.target.value)}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                            >
                                <option value="">-- Select Product --</option>
                                {myProducts.map((product) => (
                                    <option key={product._id} value={product._id}>
                                        {product.name} (₹{product.price} + {product.gstRate}% GST)
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-indigo-900 mb-1">Qty</label>
                            <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="w-24 border border-gray-300 px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddItem}
                            className="bg-indigo-900 hover:bg-indigo-800 text-white px-4 py-2 rounded-md"
                        >
                            Add
                        </button>
                    </div>

                    {/* Selected Items */}
                    {selectedItems.length > 0 && (
                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full border mt-2">
                                <thead className="bg-indigo-100 text-indigo-900">
                                    <tr>
                                        <th className="py-2 px-4 text-left">Product</th>
                                        <th className="py-2 px-4 text-left">Qty</th>
                                        <th className="py-2 px-4 text-left">Price</th>
                                        <th className="py-2 px-4 text-left">GST</th>
                                        <th className="py-2 px-4 text-left">Total</th>
                                        <th className="py-2 px-4 text-left">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedItems.map((item) => {
                                        const product = myProducts.find((p) => p._id === item.productId);
                                        if (!product) return null;

                                        return (
                                            <tr key={item.productId} className="border-t">
                                                <td className="py-2 px-4">{product.name}</td>
                                                <td className="py-2 px-4">{item.quantity}</td>
                                                <td className="py-2 px-4">₹{product.price}</td>
                                                <td className="py-2 px-4">{product.gstRate}%</td>
                                                <td className="py-2 px-4">₹{calculateLineTotal(product, item.quantity).toFixed(2)}</td>
                                                <td className="py-2 px-4">
                                                    <button
                                                        onClick={() => handleRemoveItem(item.productId)}
                                                        className="text-red-500 hover:text-red-700"
                                                        type="button"
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Total */}
                    <div className="text-right text-lg font-bold text-indigo-900">
                        Total: ₹{calculateTotal().toFixed(2)}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => dispatch(toggleCreateInvoicePopup())}
                            className="px-4 py-2 bg-indigo-100 text-indigo-900 rounded-md hover:bg-indigo-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-indigo-900 text-white font-semibold rounded-md hover:bg-indigo-800"
                        >
                            {loading ? "Creating..." : "Create Invoice"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddInvoicePopup;
