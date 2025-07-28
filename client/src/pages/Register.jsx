/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { register, resetAuthSlice } from '../store/slices/authSlice'
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";
import logo from "../assets/logo.png"
import logo2 from "../assets/logo2.png"
import toast from "react-hot-toast";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [gstNumber, setGstNumber] = useState("");
    const [businessName, setBusinessName] = useState("");

    const dispatch = useDispatch();
    const { loading, error, message, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("password", password);
        data.append("gstNumber", gstNumber);
        data.append("businessName", businessName);
        dispatch(register(data));
    }

    useEffect(() => {
        if (message) {
            navigate(`/otp-verification/${email}`);
            toast.success(message)
            dispatch(resetAuthSlice());
        }
        if (error) {
            toast.error(error)
            dispatch(resetAuthSlice());
        }
    }, [dispatch, isAuthenticated, error, loading]);

    if (isAuthenticated) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-white to-gray-100">
            {/* Left Side – Register Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
                <div className="w-full max-w-md space-y-1">
                    {/* Logo */}
                    <div className="w-full flex justify-center">
                        <div className="w-60 rounded-2xl p-2 flex items-center justify-center space-x-3 mb-6 bg-indigo-900">
                            <img src={logo2} alt="logo" className="h-10 w-auto" />
                            <h1 className="text-3xl font-bold text-white tracking-wide">BillCraft</h1>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-indigo-900 mb-2">Create Your Account</h2>
                        <p className="text-gray-700">Please fill in your details to register</p>
                    </div>

                    {/* Register Form */}
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900" />

                        <input type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} placeholder="GST Number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900" />

                        <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Business Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900" />

                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900" />

                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-4 text-indigo-900">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Mobile link */}
                        <div className="block md:hidden text-gray-600 text-sm">
                            Already have an account? <Link to='/login' className="text-indigo-900 font-medium hover:underline">Sign In</Link>
                        </div>

                        {/* Submit Button */}
                        {loading ? (
                            <button disabled className="w-full py-2 bg-indigo-800 text-white font-semibold rounded-md flex items-center justify-center mt-4">
                                <FaSpinner className="animate-spin mr-2" /> Processing...
                            </button>
                        ) : (
                            <button type="submit" className="w-full py-2 bg-indigo-900 text-white font-semibold rounded-md hover:bg-indigo-800 transition mt-4">
                                Sign Up
                            </button>
                        )}
                    </form>

                    {/* Desktop Link */}
                    <div className="hidden md:block text-center text-sm text-gray-600 mt-6">
                        Already have an account? <Link to='/login' className="text-indigo-900 font-medium hover:underline">Sign In</Link>
                    </div>
                </div>
            </div>

            {/* Right Side – Image */}
            <div
                className="hidden md:flex w-1/2 bg-cover bg-no-repeat relative"
                style={{ backgroundImage: `url('/main2.png')` }}
            >
                <div className="absolute top-4 right-4 w-[200px]">
                    <img src={logo} alt="Logo" className="w-full" />
                </div>
            </div>
        </div>
    )
}

export default Register;