/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { FaSpinner } from "react-icons/fa6";
import logo from "../assets/logo2.png";
import toast from "react-hot-toast";

const OTP = () => {
    const { email } = useParams();
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, message, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const handleOtpVerification = (e) => {
        e.preventDefault();
        dispatch(otpVerification(email, otp));
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(resetAuthSlice());
            navigate("/");
        }
        if (error) {
            toast.error(error, "error");
            dispatch(resetAuthSlice());
        }
    }, [dispatch, isAuthenticated, error, loading]);

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex flex-col md:flex-row h-screen w-full">
            {/* Left Image Section - Hidden on small devices */}
            <div
                className="hidden md:flex md:w-1/2 bg-cover bg-center relative"
                style={{ backgroundImage: `url('/main2.png')` }}
            >
                <div
                    className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-no-repeat bg-contain bg-right"
                    style={{ backgroundImage: `url(${logo})` }}
                ></div>
            </div>

            {/* OTP Form Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-4 py-10 md:py-0">
                <div className="w-full max-w-sm flex flex-col items-center justify-center space-y-5">

                    {/* Logo */}
                    <div className="w-60 rounded-2xl px-4 py-2 flex items-center justify-center space-x-3 bg-indigo-900">
                        <img src={logo} alt="logo" className="h-8 w-auto" />
                        <h1 className="text-3xl font-bold text-white tracking-wide">BillCraft</h1>
                    </div>

                    {/* Title and subtitle */}
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">Enter OTP</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            We have sent a 6-digit code to your email
                        </p>
                    </div>

                    {/* OTP Form */}
                    <form
                        onSubmit={handleOtpVerification}
                        className="w-full space-y-4"
                    >
                        <input
                            type="number"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg text-white transition ${loading
                                ? "bg-indigo-700 cursor-not-allowed flex justify-center items-center"
                                : "bg-indigo-900 hover:bg-indigo-800"
                                }`}
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify"
                            )}
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-600">
                        Didn't receive OTP?{" "}
                        <Link
                            to="/register"
                            className="text-indigo-700 font-medium hover:underline"
                        >
                            Back to Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OTP;
