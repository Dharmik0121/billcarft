/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { login, resetAuthSlice } from '../store/slices/authSlice'
import { FaArrowRight, FaEye, FaEyeSlash, FaMailchimp, FaSpinner } from "react-icons/fa6";
import logo from "../assets/logo.png"
import logo2 from "../assets/logo2.png"
import toast from "react-hot-toast";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch()
    const { loading, error, message, isAuthenticated } = useSelector(state => state.auth)

    const handleLogin = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("email", email)
        data.append("password", password)
        dispatch(login(data))
    }

    useEffect(() => {
        if (message) {
            toast.success(message)
            //   dispatch(resetAuthSlice());
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
        <>
            {/* <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-100 p-4">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-10 flex flex-col justify-center space-y-6">
                        <div className="flex justify-center mb-2">
                            <div className="rounded-full flex items-center justify-center">
                                <img src={logo} alt="logo" className="h-44 w-auto" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-mono text-center overflow-hidden mb-8">
                            Welcome Back !!
                        </h1>
                        <p className="text-gray-800 text-center mb-8">
                            Please enter your credientials to login
                        </p>
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    autoComplete="username"
                                    className="w-full px-4 py-3 border border-black rounded-md focus:outline-none "
                                />
                            </div>
                            <div className="mb-4 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    className="w-full px-4 py-3 border border-black rounded-md focus:outline-none "
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-4 text-black"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="block md:hidden font-semibold mt-5 ">
                                <p>New to our platform : <Link to={'/register'} className="text-sm text-gray-500 hover:underline">Sign in</Link></p>
                            </div>
                            <div className="text-right">
                                <Link to={'/password/forgot'} className="font-semibold rounded-md text-black mb-12 ">Forgot Password?</Link>
                            </div>
                            {loading ? <>
                                <button
                                    disabled
                                    className="border-2 mt-5 border-black w-full font-semibold bg-gray-800 text-white py-2 rounded-lg flex justify-center items-center"
                                >
                                    <FaSpinner className="animate-spin mr-2" />
                                    Processing...
                                </button>
                            </> : <>
                                <button
                                    disabled={loading}
                                    className="border-2 mt-5 border-black  w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">Sign In</button>
                            </>}
                        </form>
                    </div>

                    <div className="bg-black text-white p-10 md:flex flex-col justify-center items-center space-y-6 hidden">
                        <div className="text-center h-[400px]">
                            <div className="flex justify-center mb-12">
                                <img src={logo2} alt="" className="h-44 w-auto" />
                            </div>
                            <p className="text-gray-300 mb-12 ">New to our Platform? Sign up now.</p>
                            <Link to='/register' className="border-2 mt-5 border-white px-8 w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">{" "}Sign Up</Link>

                        </div>
                    </div>
                </div>
            </div> */}
            <div className="min-h-screen flex bg-gradient-to-r from-white to-gray-100">
                {/* Left Side - Fullscreen Image */}
                <div
                    className="hidden md:flex w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: `url('/public/main2.png')` }}
                >
                    <div className="p-2 w-[200px]">
                        <img src={logo} alt="Logo" className="w-full" />
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
                    <div className="w-full max-w-md space-y-1">
                        {/* Logo + Title */}
                        <div className="w-full flex justify-center">
                            <div className="w-60 rounded-2xl p-2 flex items-center justify-center space-x-3 mb-6 bg-indigo-900">
                                <img src={logo2} alt="logo" className="h-10 w-auto" />
                                <h1 className="text-3xl font-bold text-white tracking-wide">BillCraft</h1>
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-indigo-900 mb-2">Welcome Back !!</h2>
                            <p className="text-gray-700">Please enter your credentials to login</p>
                        </div>

                        {/* Login Form */}
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                autoComplete="username"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-4 text-indigo-900"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <div className="flex justify-between items-center text-sm mt-2">
                                <Link to={'/password/forgot'} className="text-indigo-900 font-medium hover:underline">Forgot Password?</Link>
                                <div className="md:hidden text-gray-600">
                                    New to our platform?{" "}
                                    <Link to={'/register'} className="text-indigo-900 font-medium hover:underline">Sign Up</Link>
                                </div>
                            </div>

                            {/* Submit Button */}
                            {loading ? (
                                <button
                                    disabled
                                    className="w-full py-2 bg-indigo-800 text-white font-semibold rounded-md flex items-center justify-center mt-4"
                                >
                                    <FaSpinner className="animate-spin mr-2" />
                                    Processing...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-indigo-900 text-white font-semibold rounded-md hover:bg-indigo-800 transition mt-4"
                                >
                                    Sign In
                                </button>
                            )}
                        </form>

                        {/* Register Link for Desktop */}
                        <div className="hidden md:block text-center text-sm text-gray-600 mt-6">
                            New to our platform?{" "}
                            <Link to={'/register'} className="text-indigo-900 font-medium hover:underline">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default Login;
