import React from 'react';
import Header from '../layout/Header';
import { FaBox, FaProductHunt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { FaFileInvoice } from 'react-icons/fa6';

const Dashboard = () => {
    const { myProducts, loading } = useSelector((state) => state.product);
    const { myInvoices } = useSelector((state) => state.invoice);


    return (
        <main className="relative flex-1 p-6 pt-28 bg-gray-50 min-h-screen">
            <Header />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
                <p className="text-gray-600 text-sm">Here's a quick overview of your business.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
                    <div>
                        <h3 className="text-sm text-gray-500">Total Products</h3>
                        <p className="text-2xl font-semibold text-gray-800">
                            {loading ? '...' : myProducts?.length || 0}
                        </p>
                    </div>
                    <FaProductHunt className="text-indigo-700 text-3xl" />
                </div>
                <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
                    <div>
                        <h3 className="text-sm text-gray-500">Total Products</h3>
                        <p className="text-2xl font-semibold text-gray-800">
                            {loading ? '...' : myInvoices?.length || 0}
                        </p>
                    </div>
                    <FaFileInvoice className="text-indigo-700 text-3xl" />
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-lg font-medium text-gray-700 mb-4">Recent Activity</h2>
                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500">This section can include recent orders, customer activity, or system logs.</p>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
