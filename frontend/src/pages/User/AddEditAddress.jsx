// import { useState, useEffect } from "react";
// import Api from "../../Api";
// import { useAlert } from '../../contexts/AlertContext';
// import { useUser } from "../../contexts/UserContext";   
// import { useLoading } from "../../contexts/LoadingContext";
// import { ChevronLeft } from 'lucide-react';
// import { useNavigate, useLocation } from "react-router-dom";

// const AddEditAddress = () => {
//     const { showAlert } = useAlert();
//     const { refreshUserAddress } = useUser();
//     const { showLoading, hideLoading } = useLoading();
//     const location = useLocation();
//     const navigate = useNavigate();

//     const addressDetails = location.state?.address || {};

//     console.log("address in edit/add:", addressDetails);

//     const [street, setStreet] = useState("");
//     const [landmark, setLandmark] = useState("");
//     const [city, setCity] = useState("");
//     const [state, setState] = useState("");
//     const [pincode, setPincode] = useState("");
//     const [gmapUrl, setGmapUrl] = useState("");

//     // Fetch existing address data when the component mounts
//     useEffect(() => {
//         const fetchAddressData = () => {
//             if (addressDetails) {
//                 setStreet(addressDetails.userStreet || "");
//                 setLandmark(addressDetails.userLandmark || "");
//                 setCity(addressDetails.userCity || "");
//                 setState(addressDetails.userState || "");
//                 setPincode(addressDetails.userPincode || "");
//                 setGmapUrl(addressDetails.userGmapUrl || "");
//             } else {
//                 console.warn("User address data is not available.");
//             }
//         };

//         fetchAddressData();
//     }, [addressDetails]);

//     // Get current geolocation for GMap URL
//     const fetchGeolocation = () => {
//         showLoading("Fetching your location...");
//         if (!navigator.geolocation) {
//             showAlert("Geolocation is not supported by your browser.", "error");
//             return;
//         }

//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
//                 setGmapUrl(googleMapsUrl);
//                 hideLoading();
//                 showAlert("Geolocation retrieved successfully!", "success");
//             },
//             (error) => {
//                 console.error("Error retrieving geolocation:", error);
//                 showAlert("Failed to retrieve geolocation.", "error");
//             }
//         );
//     };

//     // Handle form submission
//     const handleAddressSubmit = async (event) => {
//         event.preventDefault(); // Prevent default form submission behavior

//         try {
//             const response = await Api.put("/api/v1/user/updateAddress", {
//                 addressID: addressDetails.addressID,
//                 userMobNumber: addressDetails.userMobNumber,
//                 userStreet: street,
//                 userLandmark: landmark,
//                 userCity: city,
//                 userState: state,
//                 userPincode: pincode,
//                 userGmapUrl: gmapUrl,
//             });

//             console.log(response);

//             if (response.status !== 200) {
//                 throw new Error(`Failed to update address details. Status code: ${response.status}`);
//             }
//             await refreshUserAddress();
//             showAlert("Address updated successfully!", "success");
//             navigate('/account/getAddress');
//         } catch (error) {
//             console.error("Error updating address details:", error.message);
//             showAlert("Failed to update address. Try again.", "error");
//         }
//     };

//     return (
//         <div className="mt-16 p-4">
//             {/* Back Button */}
//             <button
//                 className="flex items-center mb-6 text-gray-700 hover:text-blue-600 transition-colors duration-300"
//                 onClick={() => navigate("/account/getAddress")}
//             >
//                 <ChevronLeft className="mr-2" />
//                 <span className="font-medium">Back</span>
//             </button>

//             <h2 className="text-xl font-semibold mb-4">User Address</h2>
//             <form onSubmit={handleAddressSubmit} className="space-y-4">
//                 <div>
//                     <label
//                         htmlFor="street"
//                         className="block text-sm font-medium text-gray-700"
//                     >
//                         Street
//                     </label>
//                     <input
//                         type="text"
//                         id="street"
//                         value={street}
//                         onChange={(e) => setStreet(e.target.value)}
//                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label
//                         htmlFor="landmark"
//                         className="block text-sm font-medium text-gray-700"
//                     >
//                         Landmark (Optional)
//                     </label>
//                     <input
//                         type="text"
//                         id="landmark"
//                         value={landmark}
//                         onChange={(e) => setLandmark(e.target.value)}
//                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
//                     />
//                 </div>
//                 <div>
//                     <label
//                         htmlFor="city"
//                         className="block text-sm font-medium text-gray-700"
//                     >
//                         City
//                     </label>
//                     <input
//                         type="text"
//                         id="city"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label
//                         htmlFor="state"
//                         className="block text-sm font-medium text-gray-700"
//                     >
//                         State
//                     </label>
//                     <input
//                         type="text"
//                         id="state"
//                         value={state}
//                         onChange={(e) => setState(e.target.value)}
//                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label
//                         htmlFor="pincode"
//                         className="block text-sm font-medium text-gray-700"
//                     >
//                         Pincode
//                     </label>
//                     <input
//                         type="text"
//                         id="pincode"
//                         value={pincode}
//                         onChange={(e) => setPincode(e.target.value)}
//                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label
//                         htmlFor="gmapUrl"
//                         className="block text-sm font-medium text-gray-700"
//                     >
//                         Google Maps URL
//                     </label>
//                     <input
//                         type="text"
//                         id="gmapUrl"
//                         value={gmapUrl}
//                         readOnly
//                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none bg-gray-100"
//                     />
//                     <button
//                         type="button"
//                         onClick={fetchGeolocation}
//                         className="mt-2 text-sm text-blue-600 hover:underline"
//                     >
//                         Get Current Location
//                     </button>
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//                 >
//                     Submit Address
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddEditAddress ;





import { useState, useEffect } from "react";
import Api from "../../Api";
import { useAlert } from '../../contexts/AlertContext';
import { useUser } from "../../contexts/UserContext";
import { useLoading } from "../../contexts/LoadingContext";
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";

const AddEditAddress = () => {
    const { showAlert } = useAlert();
    const { refreshUserAddress } = useUser();
    const { showLoading, hideLoading } = useLoading();
    const location = useLocation();
    const navigate = useNavigate();

    const addressDetails = location.state?.address || {}; // Optional chaining
    const isEditMode = !!addressDetails.addressID;

    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [gmapUrl, setGmapUrl] = useState("");

    useEffect(() => {
        if (isEditMode) {
            setStreet(addressDetails.userStreet || "");
            setLandmark(addressDetails.userLandmark || "");
            setCity(addressDetails.userCity || "");
            setState(addressDetails.userState || "");
            setPincode(addressDetails.userPincode || "");
            setGmapUrl(addressDetails.userGmapUrl || "");
        }
    }, [addressDetails, isEditMode]);

    const fetchGeolocation = () => {
        showLoading("Fetching your location...");
        if (!navigator.geolocation) {
            showAlert("Geolocation is not supported by your browser.", "error");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                setGmapUrl(googleMapsUrl);
                hideLoading();
                showAlert("Geolocation retrieved successfully!", "success");
            },
            (error) => {
                console.error("Error retrieving geolocation:", error);
                hideLoading();
                showAlert("Failed to retrieve geolocation.", "error");
            }
        );
    };

    const handleAddressSubmit = async (event) => {
        event.preventDefault();

        try {
            showLoading(isEditMode ? "Updating address..." : "Adding address...");
            const endpoint = isEditMode
                ? "/api/v1/user/updateAddress"
                : "/api/v1/user/addAddress";
            const payload = {
                userStreet: street,
                userLandmark: landmark,
                userCity: city,
                userState: state,
                userPincode: pincode,
                userGmapUrl: gmapUrl,
            };

            if (isEditMode) {
                payload.addressID = addressDetails.addressID;
                payload.userMobNumber = addressDetails.userMobNumber;
            }

            const response = await Api.post(endpoint, payload);

            if (response.status !== 200) {
                throw new Error(
                    `${isEditMode ? "Failed to update" : "Failed to add"} address.`
                );
            }

            await refreshUserAddress();
            hideLoading();
            showAlert(
                `Address ${isEditMode ? "updated" : "added"} successfully!`,
                "success"
            );
            navigate('/account/getAddress');
        } catch (error) {
            console.error(error.message);
            hideLoading();
            showAlert(
                `Failed to ${isEditMode ? "update" : "add"} address. Try again.`,
                "error"
            );
        }
    };

    return (
        <div className="mt-16 p-4">
            <button
                className="flex items-center mb-6 text-gray-700 hover:text-blue-600 transition-colors duration-300"
                onClick={() => navigate("/account/getAddress")}
            >
                <ChevronLeft className="mr-2" />
                <span className="font-medium">Back</span>
            </button>

            <h2 className="text-xl font-semibold mb-4">
                {isEditMode ? "Edit Address" : "Add Address"}
            </h2>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
                {/* Form Fields */}
                <div>
                    <label
                        htmlFor="street"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Street
                    </label>
                    <input
                        type="text"
                        id="street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="landmark"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Landmark (Optional)
                    </label>
                    <input
                        type="text"
                        id="landmark"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                    >
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                    >
                        State
                    </label>
                    <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="pincode"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Pincode
                    </label>
                    <input
                        type="text"
                        id="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="gmapUrl"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Google Maps URL
                    </label>
                    <input
                        type="text"
                        id="gmapUrl"
                        value={gmapUrl}
                        readOnly
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none bg-gray-100"
                    />
                    <button
                        type="button"
                        onClick={fetchGeolocation}
                        className="mt-2 text-sm text-blue-600 hover:underline"
                    >
                        Get Current Location
                    </button>
                </div>
                {/* Add other fields here */}
                <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    {isEditMode ? "Update Address" : "Add Address"}
                </button>
            </form>
        </div>
    );
};

export default AddEditAddress;
