import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../store/slices/authSlice';
import { toggleSettingPopup } from '../store/slices/popupSlice';
import { MdClose, MdSettings } from 'react-icons/md';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa6';

const SettingPopup = () => {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);




    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.user)

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        const data = {
            currentPassword,
            newPassword,
            confirmNewPassword,
        };
        dispatch(updatePassword(data));
    }


    return (
        <div className="fixed inset-0 bg-gray-500/40 p-5 flex items-center justify-center z-50">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl">
                <div className="p-6">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-6 pb-3 border-b border-indigo-900">
                        <div className="flex items-center gap-3">
                            <MdSettings className="bg-indigo-100 text-indigo-900 rounded-lg p-2 text-4xl" />
                            <h3 className="text-xl font-bold text-indigo-900">Update Password</h3>
                        </div>
                        <MdClose
                            className="text-indigo-900 text-xl cursor-pointer hover:text-indigo-700"
                            onClick={() => dispatch(toggleSettingPopup())}
                        />
                    </header>

                    {/* Form */}
                    <form onSubmit={handleUpdatePassword} className="space-y-5">
                        {/* Current Password */}
                        <div className="relative">
                            <label className="block text-indigo-900 font-medium mb-1">Current Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-indigo-900"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* New Password */}
                        <div className="relative">
                            <label className="block text-indigo-900 font-medium mb-1">New Password</label>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-9 text-indigo-900"
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label className="block text-indigo-900 font-medium mb-1">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-900"
                                placeholder="Confirm Password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-9 text-indigo-900"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4 pt-2">
                            <button
                                type="button"
                                onClick={() => dispatch(toggleSettingPopup())}
                                className="px-4 cursor-pointer py-2 bg-indigo-100 text-indigo-900 rounded-md hover:bg-indigo-200"
                            >
                                Close
                            </button>

                            {loading ? (
                                <button
                                    disabled
                                    className="px-4 cursor-pointer py-2 font-semibold bg-indigo-900 text-white rounded-md flex items-center justify-center"
                                >
                                    <FaSpinner className="animate-spin mx-2" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 cursor-pointer font-semibold bg-indigo-900 text-white rounded-md hover:bg-indigo-800"
                                >
                                    Update
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default SettingPopup