import { useState, useEffect } from "react";
import Api from "../../Api";
import { useUser } from '../../contexts/UserContext';
import { useAlert } from '../../contexts/AlertContext';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
    const { user, fetchUserAddress } = useUser();
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Fetch existing data when the component mounts
    useEffect(() => {
        const fetchUserData = () => {
            if (user) {
                // Populate the state with fetched data
                setName(user.userName || "");
                setEmail(user.userEmail || "");
            } else {
                console.warn("User data is not available.");
            }
        };
        fetchUserData();
    }, [user]); // Adding `user` as a dependency ensures updates when `user` changes.

    // Handle form submission
    const handleDetailsSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            console.log("hereeeeeeee");
            const response = await Api.post("/api/v1/user/updateUser", { 
                name, 
                email
            });
            console.log(response);

            if (response.status !== 200) {
                throw new Error(`Failed to update user details. Status code: ${response.status}`);
            }
            showAlert("User details updated successfully!", 'success');
        } catch (error) {
            console.error("Error updating user details:", error.message);
            showAlert("Failed to update user details. Try again", 'error');
        }
    };

    return (
        <div className="mt-16 p-4">
            {/* Back Button */}
            <button
                className="flex items-center mb-6 text-gray-700 hover:text-blue-600 transition-colors duration-300"
                onClick={() => navigate("/account")}
            >
                <ChevronLeft className="mr-2" />
                <span className="font-medium">Back</span>
            </button>

            <h2 className="text-xl font-semibold mb-4">User Details</h2>
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
        </div>
    );
};

export default UserDetails;
