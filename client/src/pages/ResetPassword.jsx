/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import logo_with_title from "../assets/logo2.png";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetAuthSlice, resetPassword } from "../store/slices/authSlice";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();
    const { loading, error, message, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const { token } = useParams();

    const handleResetPassword = (e) => {
        e.preventDefault();
        const data = { password, confirmPassword };
        dispatch(resetPassword(data, token));
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(resetAuthSlice());
            setPassword("");
            setConfirmPassword("");
        }
        if (error) {
            toast.error(error);
            dispatch(resetAuthSlice());
        }
    }, [dispatch, isAuthenticated, error, loading]);

    if (isAuthenticated) return <Navigate to={"/"} />;

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row">
            {/* Left Panel */}
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url('/main2.png')` }}
            >
                <div className="p-2 w-[200px]">
                    <img src={logo} alt="Logo" className="w-full" />
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
                <div className="w-full max-w-sm">
                    <div className="flex justify-center mb-6">
                        <img src={logo_with_title} alt="logo" className="h-20 w-auto" />
                    </div>
                    <h1 className="text-3xl font-bold text-center mb-3 text-indigo-900">
                        Reset Password
                    </h1>
                    <p className="text-center text-gray-600 mb-6">
                        Please enter your new password
                    </p>

                    <form onSubmit={handleResetPassword}>
                        <div className="mb-4 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New Password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-4 text-indigo-800"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="mb-4 relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-4 text-indigo-800"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {loading ? (
                            <button
                                disabled
                                className="mt-5 w-full font-semibold bg-indigo-700 text-white py-2 rounded-lg flex justify-center items-center"
                            >
                                <FaSpinner className="animate-spin mr-2" />
                                Processing...
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="mt-5 w-full font-semibold bg-indigo-900 text-white py-2 rounded-lg hover:bg-white hover:text-indigo-800 border-2 border-indigo-800 transition"
                            >
                                Reset Password
                            </button>
                        )}
                    </form>

                    <div className="text-center mt-6">
                        <Link
                            to="/login"
                            className="text-indigo-900 font-semibold hover:underline"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
