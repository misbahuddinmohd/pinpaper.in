// LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [step, setStep] = useState("phone");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        setStep("otp");
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        const userExists = false; // Replace with actual API check
        if (userExists) {
            navigate("/home");
        } else {
            navigate("/signup");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-bold text-gray-900">
                    Login
                </h2>
            </div>

            <div className="mt-5 mx-2">
                <div className="py-8 px-4 border rounded-lg shadow-md bg-white">
                    {step === "phone" ? (
                        <form onSubmit={handlePhoneSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Send OTP
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                    Enter OTP sent to {phone}
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Verify OTP
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;