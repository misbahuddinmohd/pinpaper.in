import React, { createContext, useContext, useState } from "react";

// Create Context
const LoadingContext = createContext();

// Loading Provider Component
export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Show loading spinner
    const showLoading = (msg = "") => {
        setMessage(msg);
        setLoading(true);
    };

    // Hide loading spinner
    const hideLoading = () => {
        setMessage("");
        setLoading(false);
    };

    return (
        <LoadingContext.Provider value={{ loading, message, showLoading, hideLoading }}>
            {children}
            {loading && <LoadingOverlay message={message} />}
        </LoadingContext.Provider>
    );
};

// Hook to use Loading Context
export const useLoading = () => useContext(LoadingContext);

// Loading Overlay Component
const LoadingOverlay = ({ message }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
            <div className="loader border-t-blue-600"></div>
            {message && <p className="text-white mt-4">{message}</p>}
        </div>
    );
};
