import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../layout/Header';
import {
    toggleAddNewProductPopup,
    toggleDeletePopup,
} from '../store/slices/popupSlice';
import AddNewProductPopup from "../popups/AddNewProductPopup";
import { getMyProducts } from '../store/slices/productSlice';
import { FaPen, FaProductHunt, FaTrash } from 'react-icons/fa6';
import UpdateProductPopup from '../popups/UpdateProductPopup';
import DeleteConfirmationPopup from '../popups/DeleteConfirmationPopup';
import { MdAddCircle, MdProductionQuantityLimits } from 'react-icons/md';

const Products = () => {
    const dispatch = useDispatch();

    const { addNewProductPopup, deletePopup } = useSelector((state) => state.popup);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { myProducts, loading } = useSelector((state) => state.product);

    const [editProduct, setEditProduct] = useState(null);
    const [searchedKeyword, setSearchedKeyword] = useState("");
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleSearch = (e) => {
        setSearchedKeyword(e.target.value.toLowerCase());
    };

    const searchedProducts = (myProducts || []).filter(product =>
        product.name.toLowerCase().includes(searchedKeyword)
    );

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getMyProducts());
        }
    }, [dispatch, isAuthenticated]);

    const handleDeleteClick = (productId) => {
        setSelectedProductId(productId);
        dispatch(toggleDeletePopup());
    };

    return (
        <>
            <main className="relative flex-1 p-4 pt-28">
                <Header />
                <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
                    <div className="flex items-center gap-3">
                        <FaProductHunt className="text-3xl text-indigo-900" />
                        <h1 className="text-2xl font-bold text-indigo-900">Products</h1>
                    </div>
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full sm:w-52 border-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                            value={searchedKeyword}
                            onChange={handleSearch}
                        />
                    </div>
                </header>

                {loading ? (
                    <p className="text-blue-500 mt-6">Loading products...</p>
                ) : myProducts && myProducts.length > 0 ? (
                    <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-indigo-900 text-white">
                                    <th className="px-4 py-2 text-left hidden md:table-cell">ID</th>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left hidden md:table-cell">Description</th>
                                    <th className="px-4 py-2 text-left">Price</th>
                                    <th className="px-4 py-2 text-left hidden md:table-cell">GST (%)</th>
                                    {isAuthenticated && <th className="px-4 py-2 text-center">Update</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {searchedProducts.map((product, index) => (
                                    <tr key={product._id} className={(index + 1) % 2 === 0 ? "bg-indigo-50" : ""}>
                                        <td className="px-4 py-2 hidden md:table-cell">{index + 1}</td>
                                        <td className="px-4 py-2">{product.name}</td>
                                        <td className="px-4 py-2 hidden md:table-cell">{product.description}</td>
                                        <td className="px-4 py-2">₹{product.price}</td>
                                        <td className="px-4 py-2 hidden md:table-cell">{product.gstRate}%</td>
                                        {isAuthenticated && (
                                            <td className="px-4 py-2 flex justify-center space-x-3">
                                                <FaPen
                                                    className="cursor-pointer text-green-600/70"
                                                    title="Update Product"
                                                    onClick={() => setEditProduct(product)}
                                                />
                                                <FaTrash
                                                    className="cursor-pointer text-red-600/70"
                                                    title="Delete Product"
                                                    onClick={() => handleDeleteClick(product._id)}
                                                />
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h3 className="text-3xl mt-5 font-medium text-gray-600">
                        You haven't added any products yet.
                    </h3>
                )}

                <button
                    className="fixed flex items-center gap-2 cursor-pointer bottom-10 right-10 bg-indigo-900 hover:bg-indigo-800 text-white px-5 py-2 rounded-full shadow-md"
                    onClick={() => dispatch(toggleAddNewProductPopup())}
                >
                    <MdAddCircle className="text-xl" />
                    <span className="hidden sm:inline">Add Product</span>
                </button>
            </main>

            {/* Popups */}
            {addNewProductPopup && <AddNewProductPopup />}
            {editProduct && (
                <UpdateProductPopup
                    product={editProduct}
                    onClose={() => setEditProduct(null)}
                />
            )}
            {deletePopup && selectedProductId && (
                <DeleteConfirmationPopup
                    productId={selectedProductId}
                    onClose={() => {
                        dispatch(toggleDeletePopup());
                        setSelectedProductId(null);
                    }}
                />
            )}
        </>
    );
};

export default Products;
