import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyInvoices, downloadInvoice, deleteInvoice } from "../store/slices/invoiceSlice";
import { toggleCreateInvoicePopup } from "../store/slices/popupSlice";
import { MdDownload, MdAddCircle } from "react-icons/md";
import AddInvoicePopup from "../popups/AddInvoicePopup";
import Header from "../layout/Header";
import { FaFileInvoice, FaTrash } from "react-icons/fa6";

const Invoice = () => {
    const dispatch = useDispatch();
    const { myInvoices, loading } = useSelector((state) => state.invoice);
    const { createInvoicePopup } = useSelector((state) => state.popup);
    const [searchedKeyword, setSearchedKeyword] = useState("");

    useEffect(() => {
        dispatch(getMyInvoices());
    }, [dispatch]);

    const handleDownload = (invoiceId, customerName) => {
        dispatch(downloadInvoice({ invoiceId, customerName }));
    };

    const handleSearch = (e) => {
        setSearchedKeyword(e.target.value.toLowerCase());
    };

    const searchedInvoices = (myInvoices || []).filter((invoice) =>
        invoice.customerName.toLowerCase().includes(searchedKeyword)
    );

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this invoice?")) {
            dispatch(deleteInvoice(id));
        }
    };

    return (
        <main className="relative flex-1 p-6 pt-28">
            <Header />

            {/* Header */}
            <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center mb-6">
                <div className="flex items-center gap-3">
                    <FaFileInvoice className="text-3xl text-indigo-900" />
                    <h1 className="text-2xl font-bold text-indigo-900">My Invoices</h1>
                </div>
                <input
                    type="text"
                    placeholder="Search by customer..."
                    className="w-full sm:w-52 border-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                    value={searchedKeyword}
                    onChange={handleSearch}
                />
            </header>

            {loading ? (
                <p className="text-blue-500 mt-6">Loading invoices...</p>
            ) : searchedInvoices.length > 0 ? (
                <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-indigo-900 text-white">
                                <th className="px-4 py-2 text-left">Customer</th>
                                <th className="px-4 py-2 text-left hidden md:table-cell">Date</th>
                                <th className="px-4 py-2 text-left hidden md:table-cell">Items</th>
                                <th className="px-4 py-2 text-left hidden md:table-cell">Total</th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedInvoices.map((inv, index) => (
                                <tr key={inv._id} className={(index + 1) % 2 === 0 ? "bg-indigo-50" : ""}>
                                    <td className="px-4 py-2">{inv.customerName}</td>
                                    <td className="px-4 py-2 hidden md:table-cell">
                                        {new Date(inv.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2 hidden md:table-cell">
                                        {inv.items.map((i) => (
                                            <div key={i.product._id}>
                                                {i.product.name} x {i.quantity}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-4 py-2 hidden md:table-cell">₹{inv.totalAmount.toFixed(2)}</td>
                                    <td className="px-4 py-2 flex items-center gap-2">
                                        <button
                                            onClick={() => handleDownload(inv._id, inv.customerName)}
                                            className="flex items-center gap-1 text-indigo-900 hover:text-indigo-700"
                                        >
                                            <MdDownload className="text-xl" />
                                            {/* <span className="text-sm hidden sm:inline">Download</span> */}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(inv._id)}
                                            className="flex items-center gap-1 text-indigo-900 hover:text-indigo-700"
                                        >
                                            <FaTrash className="text-md text-red-400" />
                                            {/* <span className="text-sm hidden sm:inline"></span> */}
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h3 className="text-3xl mt-5 font-medium text-gray-600">
                    No invoices found.
                </h3>
            )}

            {/* Add Invoice Button */}
            <button
                className="fixed flex items-center gap-2 bottom-10 right-10 bg-indigo-900 hover:bg-indigo-800 text-white px-5 py-2 rounded-full shadow-md"
                onClick={() => dispatch(toggleCreateInvoicePopup())}
            >
                <MdAddCircle className="text-xl" />
                <span className="hidden sm:inline">Add Invoice</span>
            </button>

            {/* Popup */}
            {createInvoicePopup && <AddInvoicePopup />}
        </main>
    );
};

export default Invoice;