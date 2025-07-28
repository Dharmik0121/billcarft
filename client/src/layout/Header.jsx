import React, { useEffect, useState } from 'react'
import { FaAviato, FaUser } from 'react-icons/fa6';
import { MdSettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSettingPopup } from '../store/slices/popupSlice';
import SettingPopup from "../popups/SettingPopup"

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { settingPopup } = useSelector((state) => state.popup);


    const [currentTime, setCurrentTime] = useState("")
    const [currentDate, setCurrentDate] = useState("")

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const hours = now.getHours() % 12 || 12;
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const ampm = now.getHours() >= 12 ? "PM" : "AM";
            setCurrentTime(`${hours}:${minutes} ${ampm}`);
            const options = {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
            setCurrentDate(now.toLocaleDateString("en-US", options))
        }
        updateDateTime();
        const intervalId = setInterval(
            updateDateTime,
            1000
        )
        return () => clearInterval(intervalId)
    }, [])

    return (
        <div>
            <header className="absolute top-0 bg-white w-full py-4 px-6 left-0 shadow-md flex justify-between items-center">
                {/* Left Side */}
                <div className="flex items-center gap-2">
                    <FaUser className="w-8 h-8 text-indigo-900" />
                    <div className="border border-indigo-900 h-[45px]"></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-indigo-900">Hello, {user?.businessName}</span>
                        <span className="text-sm font-medium text-indigo-900">
                            <span className="font-semibold">GST :</span> {user?.gstNumber}
                        </span>
                    </div>
                </div>
                {/* Right Side */}
                <div className="hidden md:flex gap-2 items-center">
                    <div className="flex flex-col text-sm lg:text-base text-indigo-900 items-end font-semibold">
                        <span>{currentTime}</span>
                        <span>{currentDate}</span>
                    </div>
                    <span className="bg-black h-14 w=[2px]" />
                    <div className="group w-10 h-10 border border-indigo-900 text-indigo-900 hover:text-white rounded-md flex items-center justify-center hover:bg-indigo-900">
                        <MdSettings className="w-8 h-8 cursor-pointer animate-spin " onClick={() => dispatch(toggleSettingPopup())} />
                    </div>
                </div>
            </header>
            {settingPopup && <SettingPopup />}

        </div>
    )
}

export default Header