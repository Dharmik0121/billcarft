import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, resetAuthSlice } from '../store/slices/authSlice';
import { MdClose, MdLogout, MdOutlineDashboard } from "react-icons/md";
import logo from "../assets/logo2.png";
import { FaFileInvoice, FaProductHunt, FaUser } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const Sidebar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent, selectedComponent }) => {
    const dispatch = useDispatch();
    const { loading, error, message, isAuthenticated } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (error) {
            toast.error(error, "error");
            dispatch(resetAuthSlice());
        }
        if (message) {
            toast.success(message, "message");
            dispatch(resetAuthSlice());
        }
    }, [dispatch, isAuthenticated, error, loading, message]);

    const buttonClasses = (name) => `
        w-full py-3 px-4 font-medium rounded-md flex cursor-pointer items-center space-x-3 transition-all duration-300
        ${selectedComponent === name
            ? "bg-white text-indigo-900 shadow-sm"
            : "text-white hover:bg-indigo-800"}
    `;

    return (
        <>
            <aside
                className={`${isSideBarOpen ? "left-0" : "-left-full"
                    } z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-indigo-900 text-white flex-col h-full`}
                style={{ position: "fixed" }}
            >
                <div className="p-4 border-b border-indigo-800">
                    <img src={logo} alt="logo" className="w-70 mx-auto" />
                </div>

                <nav className="flex-1 px-4 pt-8 space-y-3">
                    <button
                        onClick={() => setSelectedComponent("Dashboard")}
                        className={buttonClasses("Dashboard")}
                    >
                        <MdOutlineDashboard className="text-2xl" />
                        <span className="text-base cursor-pointer">Dashboard</span>
                    </button>

                    <button
                        onClick={() => setSelectedComponent("Products")}
                        className={buttonClasses("Products")}
                    >
                        <FaProductHunt className="text-2xl" />
                        <span className="text-base  cursor-pointer">Products</span>
                    </button>

                    <button
                        onClick={() => setSelectedComponent("Invoice")}
                        className={buttonClasses("Invoice")}
                    >
                        <FaFileInvoice className="text-2xl" />
                        <span className="text-base  cursor-pointer">Invoice</span>
                    </button>


                </nav>

                <div className="px-4 py-6 border-t border-indigo-800">
                    <button
                        onClick={handleLogout}
                        className="w-full py-3 cursor-pointer px-4 font-medium bg-transparent text-white rounded-md flex items-center justify-center space-x-3 
                        hover:bg-white hover:text-indigo-900 transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                        <MdLogout className="text-xl" />
                        <span>Log Out</span>
                    </button>
                </div>

                {/* <img
                    src={""}
                    alt="closeIcon"
                    onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                    className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden"
                /> */}
                <MdClose className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden" onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
            </aside>
        </>
    );
};

export default Sidebar;
