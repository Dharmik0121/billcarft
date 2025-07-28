import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import Dashboard from '../components/Dashboard';
import Sidebar from '../layout/Sidebar';
import Products from '../components/Products';
import Customer from '../components/Customer';
import Invoice from '../components/Invoice';


const Home = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState("Dashboard");
    const { isAuthenticated } = useSelector(state => state.auth);
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div className="relative md:pl-64 flex min-h-screen bg-gray-100">
                <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-indigo-900 rounded-md h-9 w-9 text-white">
                    <GiHamburgerMenu className="text-2xl " onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                </div>
                <Sidebar isSideBarOpen={isSidebarOpen} setIsSideBarOpen={setIsSidebarOpen} setSelectedComponent={setSelectedComponent} selectedComponent={selectedComponent} />
                {
                    (() => {
                        switch (selectedComponent) {
                            case "Dashboard":
                                return <Dashboard />;

                            case "Products":
                                return <Products />;

                            case "Customer":
                                return <Customer />

                            case "Invoice":
                                return <Invoice />

                            default:
                                return <Dashboard />;
                        }
                    })()
                }
            </div>
        </>
    )
}

export default Home