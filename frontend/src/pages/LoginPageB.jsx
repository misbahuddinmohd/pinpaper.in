// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import Api from "../Api";
// import {useAuth} from "../contexts/AuthContext";

// const LoginPageB = () => {
//     const [step, setStep] = useState("phone");
//     const [phone, setPhone] = useState("");
//     const [otp, setOtp] = useState("");
//     const [error, setError] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();
//     const {setAuthState} = useAuth();
//     const handlePhoneSubmit = async (e) => {
//         e.preventDefault();
//         setError(""); // Reset errors
//         setIsLoading(true); // Show loading state
//         try {
//             const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/v1/auth/sendOTP`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ to: phone }),
//             });
//             const data = await response.json();

//             if (data.status === "success") {
//                 setStep("otp");
//             } else {
//                 setError(data.error || "Failed to send OTP. Please try again.");
//             }
//         } catch (err) {
//             setError("An error occurred while sending OTP. Please try again.");
//         } finally {
//             setIsLoading(false); // Remove loading state
//         }
//     };

//     const handleOtpSubmit = async (e) => {
//         e.preventDefault();
//         setError(""); // Reset errors
//         setIsLoading(true); // Show loading state

//         try {
//             const response = await Api.post(`/api/v1/auth/verifyOTP`, {
//                 to: phone,
//                 code: otp,
//             });
//             const data = await response.data;

//             if (data.status === "success") {
//                 // setAuthState({
                    
//                 // })
//                 // Redirect based on whether the user exists or not
//                 const userExists = data.userExists; // Assumes the API returns user existence
//                 if (userExists) {
//                     navigate("/");
//                 } else {
//                     navigate("/signup");
//                 }
//             } else {
//                 setError("Invalid OTP. Please try again.");
//             }
//         } catch (err) {
//             setError("An error occurred while verifying OTP. Please try again.");
//         } finally {
//             setIsLoading(false); // Remove loading state
//         }
//     };

//     useEffect(() => {
//         console.log(phone);
//     },[phone]);
//     return (
//         <div className="mx-4 -mt-10 flex items-center justify-center h-screen bg-gray-50">
//             <div className="w-full max-w-sm">
//                 <h2 className="text-2xl font-semibold mb-4 text-left">Login</h2>
//                 <div className="space-y-4">
//                     <div className="px-4 py-8 border rounded-lg shadow-md bg-white">
//                         {step === "phone" ? (
//                             <form onSubmit={handlePhoneSubmit} className="space-y-4">
//                                 <div>
//                                     <label htmlFor="phone" className="block text-lg py-2 font-medium text-gray-700">
//                                         Phone Number
//                                     </label>
//                                     <PhoneInput
//                                         country={"in"} // Default and locked to India
//                                         value={phone}
//                                         onChange={(phone) => {
//                                             // Ensure the phone value always starts with '+'
//                                             if (!phone.startsWith("+")) {
//                                                 phone = "+" + phone;
//                                             }
//                                             setPhone(phone);
//                                         }}
//                                         inputClass="w-full rounded-md border px-3 py-2"
//                                         containerClass="w-full"
//                                         placeholder="Enter your phone number"
//                                         disableDropdown={true} // Disable dropdown for country selection
//                                         onlyCountries={["in"]} // Ensure only India is valid
//                                         countryCodeEditable={false} // Prevent users from editing the country code
//                                         inputStyle={{
//                                             width: "100%", // Enforce full width
//                                             borderRadius: "6px", // Rounded corners
//                                         }}
//                                     />
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//                                 >
//                                     Send OTP
//                                 </button>
//                             </form>
//                         ) : (
//                             <form onSubmit={handleOtpSubmit} className="space-y-4">
//                                 <div>
//                                     <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
//                                         Enter OTP sent to {phone}
//                                     </label>
//                                     <input
//                                         type="number"
//                                         id="otp"
//                                         value={otp}
//                                         onChange={(e) => setOtp(e.target.value)}
//                                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
//                                         maxLength={6}
//                                         required
//                                     />
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//                                 >
//                                     Verify OTP
//                                 </button>
//                             </form>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPageB;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Api from "../Api";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";

const LoginPageB = () => {
    const [step, setStep] = useState("phone");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setAuthState } = useAuth();
    const {showLoading, hideLoading} = useLoading();

    const handlePhoneSubmit = async (e) => {
        showLoading("Sending OTP");
        e.preventDefault();
        setError(""); // Reset errors
        setIsLoading(true); // Show loading state
        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/v1/auth/sendOTP`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ to: phone }),
            });
            const data = await response.json();

            if (data.status === "success") {
                hideLoading();
                setStep("otp");
            } else {
                hideLoading();
                setError(data.error || "Failed to send OTP. Please try again later.");
            }
        } catch (err) {
            hideLoading();
            setError("An error occurred while sending OTP. Please try again.");
        } finally {
            hideLoading();
            setIsLoading(false); // Remove loading state
        }
    };

    const handleOtpSubmit = async (e) => {
        showLoading("Verifying OTP");
        e.preventDefault();
        if(otp.length != 4){
            return setError("Please enter a valid OTP")
        }
        setError(""); // Reset errors
        setIsLoading(true); // Show loading state

        try {
            const response = await Api.post(`/api/v1/auth/verifyOTP`, {
                to: phone,
                code: otp,
            });
            const data = await response.data;
            console.log("after verifying otp data: ", data);

            if (data.status === "success") {
                const { userExists, isDetailSetup } = data;
                hideLoading();
                if (!isDetailSetup) {
                    setStep("details");
                } else if (userExists) {
                    navigate("/");
                    window.location.reload();
                } else {
                    navigate("/signup");
                }
            } else {
                hideLoading();
                setError("Invalid OTP. Please try again.");
            }
        } catch (err) {
            hideLoading();
            setError("An error occurred while verifying OTP. Please try again.");
        } finally {
            hideLoading();
            setIsLoading(false); // Remove loading state
        }
    };

    const handleDetailsSubmit = async (e) => {
        showLoading("Submitting details");
        e.preventDefault();
        setError(""); // Reset errors
        setIsLoading(true); // Show loading state

        try {
            const response = await Api.post(`/api/v1/auth/submitDetails`, {
                phone,
                name,
                email,
            });
            const data = await response.data;
            console.log(data);
            hideLoading();

            if (data.status === "success") {
                navigate("/"); // Redirect to home page after setting details
                window.location.reload(); // Reload the app
            } else {
                setError(data.error || "Failed to set up details. Please try again.");
            }
        } catch (err) {
            hideLoading();
            console.log(err);
            setError("An error occurred while submitting details. Please try again.");
        } finally {
            hideLoading();
            setIsLoading(false); // Remove loading state
        }
    };

    useEffect(() => {
        console.log(phone);
    }, [phone]);

    return (
        <div className="mx-4 -mt-10 flex items-center justify-center h-screen bg-gray-50">
            <div className="w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-4 text-left">Login</h2>
                <div className="space-y-4">
                    <div className="px-4 py-8 border rounded-lg shadow-md bg-white">
                        {step === "phone" && (
                            <form onSubmit={handlePhoneSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-lg py-2 font-medium text-gray-700"
                                    >
                                        Phone Number
                                    </label>
                                    <PhoneInput
                                        country={"in"}
                                        value={phone}
                                        onChange={(phone) => {
                                            if (!phone.startsWith("+")) {
                                                phone = "+" + phone;
                                            }
                                            setPhone(phone);
                                        }}
                                        inputClass="w-full rounded-md border px-3 py-2"
                                        containerClass="w-full"
                                        placeholder="Enter your phone number"
                                        disableDropdown={true}
                                        onlyCountries={["in"]}
                                        countryCodeEditable={false}
                                        inputStyle={{
                                            width: "100%",
                                            borderRadius: "6px",
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Send OTP
                                </button>
                            </form>
                        )}

                        {step === "otp" && (
                            <form onSubmit={handleOtpSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="otp"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Enter OTP sent to {phone}
                                    </label>
                                    <input
                                        type="number"
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

                        {step === "details" && (
                            <form onSubmit={handleDetailsSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email (Optional)
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Submit Details
                                </button>
                            </form>
                        )}
                    </div>
                    {error && (
                        <div className="text-red-600 bg-red-100 border border-red-400 p-2 rounded">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPageB;
 