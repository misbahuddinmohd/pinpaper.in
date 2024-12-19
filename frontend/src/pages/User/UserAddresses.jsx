import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Trash2, FilePenLine } from "lucide-react";
import { useUser } from "../../contexts/UserContext";
import { useAlert } from "../../contexts/AlertContext";
import Api from "../../Api";

const UserAddresses = () => {
    const { address, refreshUserAddress } = useUser();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    console.log("simple address: ", address);

    // Fetch existing addresses when the component mounts
    const fetchAddresses = async () => {

        if (address) {
            setAddresses(address || []);
        }
        // try {
        //     const userAddresses = await fetchUserAddress();
        //     setAddresses(userAddresses || []); // Ensure it defaults to an empty array
        // } catch (error) {
        //     console.error("Error fetching addresses:", error);
        //     showAlert("Failed to load addresses. Please try again.", "error");
        // }
    };

    useEffect(() => {
        fetchAddresses();
    }, [address]);

    // Handle address selection
    const handleAddressSelection = (address) => {
        setSelectedAddress(address);
        console.log(address);
        navigate('/account/addEditAddress', { state: { address } });
    };

    // Navigate to add/edit address page
    const handleAddOrEditAddress = () => {
        navigate('/account/addEditAddress');
    };

    // Handle address selection
    const handleDeleteAddress = async (address) => {
        if (!address) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this address?");
        if (!confirmDelete) return;

        try {
            // Call your API to delete the address
            const response = await Api.delete(`/api/v1/user/deleteAddress/${address.addressID}`);
            if (response.status === 200) {
                await refreshUserAddress();
                showAlert("Address deleted successfully.", "success");
            } else {
                showAlert("Failed to delete the address. Please try again.", "error");
            }
        } catch (error) {
            console.error("Error deleting address:", error);
            showAlert("An error occurred while deleting the address. Please try again.", "error");
        }
    };


    return (
        <div className="mt-16 p-4">
            {/* Address Section */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Addresses</h3>
                {addresses.length > 0 ? (
                    <div className="space-y-4">
                        {addresses.map((addr, index) => (
                            <div className="border rounded-lg shadow-md bg-white">
                                <div
                                    key={index}
                                    className="flex p-3 rounded-md"
                                // onClick={() => handleAddressSelection(addr)} // Fixed the `onClick` handler
                                >
                                    {/* Icon Section */}
                                    <div className="flex items-center mr-4 text-blue-600">
                                        <MapPin />
                                    </div>

                                    {/* Address Content */}
                                    <div className="flex-grow text-gray-700">
                                        <p className="text-sm font-medium">
                                            {`${addr.userMobNumber}, ${addr.userStreet}, ${addr.userLandmark || "No Landmark"}`}
                                        </p>
                                        <p className="text-sm font-medium">
                                            {`${addr.userCity}, ${addr.userState}, ${addr.userPincode}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex border-t-2 border-gray-300 divide-x-2 divide-gray-300">
                                    <button
                                        type="button"
                                        onClick={() => handleAddressSelection(addr)}
                                        className="w-1/2 p-3 text-blue-600 hover:text-blue-800 flex justify-center items-center"
                                    >
                                        <FilePenLine className="w-5 h-6 mr-1" />
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteAddress(addr)}
                                        className="w-1/2 p-3 text-red-600 hover:text-red-800 flex justify-center items-center"
                                    >
                                        <Trash2 className="w-6 h-6 mr-1" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-600 text-center">
                        No addresses found. <br />
                        Please add an address by clicking the button below.
                    </div>
                )}

                {/* Add/Edit Button */}
                <button
                    onClick={handleAddOrEditAddress}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Add Address
                </button>
            </div>
        </div>
    );
};

export default UserAddresses;
