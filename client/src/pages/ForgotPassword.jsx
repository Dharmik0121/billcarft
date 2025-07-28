/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import logo2 from "../assets/logo2.png";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice";
import { FaSpinner } from "react-icons/fa6";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const dispatch = useDispatch()
    const { loading, error, message, isAuthenticated } = useSelector(state => state.auth)

    const handelForgotPassword = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email))
    }

    useEffect(() => {
        if (message) {
            toast.success(message)
            dispatch(resetAuthSlice());
            setEmail("");
        }
        if (error) {
            toast.error(error)
            dispatch(resetAuthSlice());
        }
    }, [dispatch, isAuthenticated, error, loading])

    if (isAuthenticated) {
        return <Navigate to={'/'} />;
    }
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left (Form) - 50% */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                <div className="w-full max-w-sm">
                    <div className="w-full flex justify-center">
                        <div className="w-60 rounded-2xl p-2 flex items-center justify-center space-x-3 mb-6 bg-indigo-900">
                            <img src={logo2} alt="logo" className="h-10 w-auto" />
                            <h1 className="text-3xl font-bold text-white tracking-wide">BillCraft</h1>
                        </div>
                    </div>

                    <h1 className="text-3xl font-semibold text-center mb-3 text-indigo-900">
                        Forgot Password
                    </h1>
                    <p className="text-center text-gray-700 mb-8">
                        Please enter your registered email to reset your password
                    </p>

                    <form onSubmit={handelForgotPassword}>
                        <input
                            type="email"

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="📧 Enter your email"
                            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                        />

                        {loading ? (
                            <button disabled className="w-full py-2 bg-indigo-800 text-white font-semibold rounded-md flex items-center justify-center mt-4">
                                <FaSpinner className="animate-spin mr-2" /> Processing...
                            </button>
                        ) : (
                            <button type="submit" disabled={loading} className="w-full cursor-pointer py-2 bg-indigo-900 text-white font-semibold rounded-md hover:bg-indigo-800 transition mt-4">
                                Forgot Password
                            </button>
                        )}
                    </form>

                    <div className="text-center mt-6">
                        <Link to="/login" className="text-indigo-900 font-medium hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Panel - 50% */}
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center relative"
                style={{ backgroundImage: `url('/main2.png')` }}
            >
                {/* Top-right logo */}
                <div className="absolute top-6 right-6">
                    <img src={logo} alt="Logo" className="h-20 w-auto" />
                </div>
            </div>
        </div>




    )
}

export default ForgotPassword