// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import SpiralBindingForm from '../components/ServiceForms/SpiralBindingForm';
// import ThermalBindingForm from '../components/ServiceForms/ThermalBindingForm';
// import FileUpload from '../components/ServiceForms/FileUpload';
// import { useAlert } from '../contexts/AlertContext';


// const BookServicePage = () => {
//     const { showAlert } = useAlert();
//     const [selectedService, setSelectedService] = useState(null);
//     const [formData, setFormData] = useState({
//         noOfPages: 0
//     });
//     const [showModal, setShowModal] = useState(false); // Modal visibility state
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();
//     const serviceID = parseInt(searchParams.get('serviceID'), 10);

//     useEffect(() => {
//         if (serviceID) {
//             setSelectedService(serviceID);
//         }
//     }, [serviceID]);

//     useEffect(() => {
//         console.log(formData);
//     }, [formData])

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const servicesComponents = {
//         1: {
//             name: 'Spiral Binding',
//             articleType: 'spiralBinding',
//             component: <SpiralBindingForm formData={formData} handleInputChange={handleInputChange} />
//         },
//         2: {
//             name: 'Thermal Binding',
//             articleType: 'thermalBinding',
//             component: <ThermalBindingForm formData={formData} handleInputChange={handleInputChange} />
//         }
//     };

//     const handleFilesChange = (files) => {
//         const sumOfPages = files.reduce((sum, file) => sum + (file.noOfPages || 0), 0);
//         setFormData((prevData) => ({
//             ...prevData,
//             files,
//             noOfPages: sumOfPages
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const form = e.target.closest("form"); // assuming handleSubmit is bound to the form submission
//         if(!formData.files || formData.files.length === 0){
//             showAlert('Please upload atleast one file', 'error');
//             return;
//         }
//         if(formData.printColor === 'BWandColorMix' && !formData.colorPagesNos){
//             showAlert('Please enter alleast one color page number', 'error');
//             return;
//         }
//         if (!form.checkValidity()) {
//             form.reportValidity(); // This shows native validation messages
//             return;
//         } 

//         const updatedFormData = {
//             ...formData,
//             serviceID: selectedService,
//             articleAmount: 200,
//             articleType: servicesComponents[selectedService]?.articleType
//         };

//         try {
//             const response = await fetch('http://localhost:4000/api/v1/orders/addToCart', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(updatedFormData)
//             });

//             if (response.ok) {
//                 const result = await response.json();
//                 console.log('Article added successfully:', result);
//                 setFormData({}); // Clear form data
//                 form.reset(); // clear the form
//                 setShowModal(true); // Show modal after successful add to cart
//             } else {
//                 console.error(`Server error: ${response.statusText}`);
//                 throw new Error("Failed to submit the article.");
//             }
//         } catch (error) {
//             console.error('Error submitting form:', error);
//         }
//     };

//     const handleCheckout = () => {
//         setShowModal(false);
//         navigate('/cart'); // Navigate to checkout page
//     };

//     const handleAddAnotherService = () => {
//         setShowModal(false); // Close modal and allow user to add another service
//         navigate('/services');
//     };

//     const renderForm = () => (
//         <div className="p-4 mt-16">
//             <h2 className="text-xl font-semibold mb-4">
//                 Fill in the details for {selectedService ? servicesComponents[selectedService].name : 'Service'}
//             </h2>
//             <form>
//                 <FileUpload formData={formData} onFilesChange={handleFilesChange} />
//                 {selectedService && servicesComponents[selectedService]?.component}
//                 <button
//                     type="submit"
//                     onClick={handleSubmit}
//                     className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
//                 >
//                     Add to cart
//                 </button>
//             </form>
//         </div>
//     );

//     const renderModal = () => (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//                 <h3 className="text-lg font-semibold mb-4">Item added to cart</h3>
//                 <p className="mb-6">Would you like to checkout or add another service?</p>
//                 <div className="flex gap-4">
//                     <button
//                         onClick={handleCheckout}
//                         className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
//                     >
//                         Checkout
//                     </button>
//                     <button
//                         onClick={handleAddAnotherService}
//                         className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
//                     >
//                         Add Another
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );

//     return (
//         <>
//             {renderForm()}
//             {showModal && renderModal()}
//         </>
//     );
// };

// export default BookServicePage;



// // src/pages/BookServicePage.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
// import SpiralBindingForm from '../components/ServiceForms/SpiralBindingForm';
// import ThermalBindingForm from '../components/ServiceForms/ThermalBindingForm';
// import FileUpload from '../components/ServiceForms/FileUpload';
// import { useAlert } from '../contexts/AlertContext';
// import { uploadFilesToPinata } from '../utils/pinata';
// import { getFilesFromPinata } from '../utils/pinata';
// import { useEdit } from '../contexts/EditContext';

// const BookServicePage = ({ itemData }) => {
//     const { showAlert } = useAlert();

//     const { editItem, setEditItem } = useEdit();

//     const [selectedService, setSelectedService] = useState(null);
//     const [formData, setFormData] = useState({ noOfPages: 0 });
//     const [showModal, setShowModal] = useState(false);
//     const [isLoading, setIsLoading] = useState(false); // Loading state
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();

//     const serviceID = parseInt(searchParams.get('serviceID'), 10);
//     const mode = searchParams.get('mode');

//     // useEffect(() => {
//     //     if (serviceID) {
//     //         setSelectedService(serviceID);
//     //     }
//     // }, [serviceID]);

//     useEffect(() => {
//         if (serviceID) {
//             setSelectedService(serviceID);
//         }

//         // Check if we're in edit mode and have edit item data
//         if (mode === 'edit' && editItem) {
//             // Fetch the files from CIDs and convert them to File objects

//             // const files = await

//             // const fetchFiles = async () => {
//             //     try {
//             //         const files = await Promise.all(
//             //             editItem.filesUri.map(async (cid) => {
//             //                 const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
//             //                 const blob = await response.blob();
//             //                 return new File([blob], `file-${cid}.pdf`, { type: 'application/pdf' });
//             //             })
//             //         );

//             //         // Update form data with the fetched files and other item data
//             //         setFormData({
//             //             ...editItem,
//             //             files,
//             //             colorPagesNos: editItem.colorPagesNos || '',
//             //         });
//             //     } catch (error) {
//             //         console.error('Error fetching files:', error);
//             //         showAlert('Error loading files', 'error');
//             //     }
//             // };

//             // fetchFiles();
//             const files = await getFilesFromPinata(filesUri);
//             // Update form data with the fetched files and other item data
//             setFormData({
//                 ...editItem,
//                 files,
//                 // colorPagesNos: editItem.colorPagesNos || '',
//             });

//         }

//         // Cleanup function to clear edit item when component unmounts
//         return () => {
//             setEditItem(null);
//         };
//     }, [serviceID, mode, editItem, setEditItem]);

//     // useEffect(() => {
//     //     if (itemData) {
//     //       setFormData({
//     //         // ...formData,
//     //         ...itemData,
//     //       });
//     //     }
//     //   }, [itemData]);

//     useEffect(() => {
//         console.log(formData)
//     }, [formData]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleFilesChange = (files) => {
//         const sumOfPages = files.reduce((sum, file) => sum + (file.noOfPages || 0), 0);
//         setFormData((prevData) => ({ ...prevData, files, noOfPages: sumOfPages }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.files || formData.files.length === 0) {
//             showAlert('Please upload at least one file', 'error');
//             return;
//         }
//         if (formData.printColor === 'BWandColorMix' && !formData.colorPagesNos) {
//             showAlert('Please enter at least one color page number', 'error');
//             return;
//         }

//         const updatedFormData = {
//             ...formData,
//             serviceID: selectedService,
//             articleType: servicesComponents[selectedService]?.articleType,
//         };

//         try {
//             setIsLoading(true); // Start loading spinner

//             // Upload files to Pinata
//             const fileCIDs = await uploadFilesToPinata(formData.files);
//             updatedFormData.filesUri = fileCIDs; // Add CIDs to form data

//             console.log("sent data: ", updatedFormData);

//             // Send data to addToCart API
//             const response = await fetch('http://localhost:4000/api/v1/orders/addToCart', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(updatedFormData),
//             });

//             if (response.ok) {
//                 const result = await response.json();
//                 console.log('Article added successfully:', result);
//                 setFormData({}); // Clear form data
//                 setShowModal(true); // Show modal after successful add to cart
//             } else {
//                 throw new Error('Failed to submit the article.');
//             }
//         } catch (error) {
//             console.error('Error submitting form:', error);
//         } finally {
//             setIsLoading(false); // Stop loading spinner
//         }
//     };

//     const servicesComponents = {
//         1: {
//             name: 'Spiral Binding',
//             articleType: 'spiralBinding',
//             component: <SpiralBindingForm formData={formData} handleInputChange={handleInputChange} />,
//         },
//         2: {
//             name: 'Thermal Binding',
//             articleType: 'thermalBinding',
//             component: <ThermalBindingForm formData={formData} handleInputChange={handleInputChange} />,
//         },
//     };

//     return (
//         <>
//             {isLoading && (
//                 <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//                     <div className="text-center space-y-4 px-4 py-8 bg-white bg-opacity-80 rounded-lg shadow-lg flex flex-col items-center justify-center">
//                         <button type="button" className="bg-blue-600 flex items-center px-6 py-3 rounded-lg text-white" disabled>
//                             <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
//                                 <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
//                                 <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" />
//                             </svg>
//                             Processing...
//                         </button>
//                         <p className="text-black font-medium text-sm leading-relaxed mt-4">
//                             Please wait. The files are being received.
//                             <br />
//                             This may take a while.
//                             <br />
//                             <p className='text-red-600 font-bold'>Don’t close this window until processing is done.</p>
//                         </p>
//                     </div>
//                 </div>

//             )}

//             <div className="p-4 mt-16">
//                 <h2 className="text-xl font-semibold mb-4">
//                     Fill in the details for {selectedService ? servicesComponents[selectedService].name : 'Service'}
//                 </h2>
//                 <form onSubmit={handleSubmit}>
//                     <FileUpload formData={formData} onFilesChange={handleFilesChange} />
//                     {selectedService && servicesComponents[selectedService]?.component}
//                     <button
//                         type="submit"
//                         className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
//                         disabled={isLoading} // Disable button while loading
//                     >
//                         Add to cart
//                     </button>
//                 </form>
//             </div>

//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//                         <h3 className="text-lg font-semibold mb-4">Item added to cart</h3>
//                         <p className="mb-6">Would you like to checkout or add another service?</p>
//                         <div className="flex gap-4">
//                             <button
//                                 onClick={() => navigate('/cart')}
//                                 className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
//                             >
//                                 Checkout
//                             </button>
//                             <button
//                                 onClick={() => navigate('/services')}
//                                 className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
//                             >
//                                 Add Another
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default BookServicePage;






// src/pages/BookServicePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SpiralBindingForm from '../components/ServiceForms/SpiralBindingForm';
import ThermalBindingForm from '../components/ServiceForms/ThermalBindingForm';
import FileUpload from '../components/ServiceForms/FileUpload';
import { useAlert } from '../contexts/AlertContext';
import { uploadFilesToPinata, deleteFilesFromPinata } from '../utils/pinata';
import { useEdit } from '../contexts/EditContext';
import Api from '../Api';

const BookServicePage = () => {
    const { showAlert } = useAlert();
    const { editItem, setEditItem } = useEdit();

    const [selectedService, setSelectedService] = useState(null);
    const [formData, setFormData] = useState({ noOfPages: 0 });
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const serviceID = parseInt(searchParams.get('serviceID'), 10);
    const mode = searchParams.get('mode');

    useEffect(() => {
        const fetchFilesForEditMode = async () => {
            if (mode === 'edit' && editItem) {
                try {
                    setFormData({
                        ...editItem,
                    });
                } catch (error) {
                    console.error('Error fetching files:', error);
                }
            }
        };

        if (serviceID) setSelectedService(serviceID);
        fetchFilesForEditMode();

        return () => {
            if (mode === 'edit') setEditItem(null);
        };
    }, [serviceID, mode, editItem, setEditItem]);

    // useEffect(() => {
    //     console.log(formData);
    // }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilesChange = (files) => {
        const sumOfPages = files.reduce((sum, file) => sum + (file.noOfPages || 0), 0);
        setFormData((prevData) => ({ ...prevData, files, noOfPages: sumOfPages }));
    };

    const processEditFiles = async (files, filesDetails) => {
        // Step 1: Find CIDs in filesDetails that are not in files
        const filesCIDs = files.map(file => file.cid).filter(Boolean); // Collect CIDs only from `files`
        const removeFilesCIDs = filesDetails
            .map(fileDetail => fileDetail.cid)
            .filter(cid => !filesCIDs.includes(cid)); // Find CIDs in filesDetails not in files
    
        // Step 2: Separate files into those with and without CIDs
        const noCIDFiles = files.filter(file => !file.cid); // Files that lack `cid`
        const CIDFiles = files.filter(file => file.cid);    // Files that already have `cid`
    
        // Step 3: Upload new files to Pinata and get their CIDs
        if (noCIDFiles.length > 0) {
            const newFileCIDs = await uploadFilesToPinata(noCIDFiles); // Assuming it returns an array of CIDs
    
            // Step 4: Convert File objects to plain objects and add the CID
            const updatedNoCIDFiles = noCIDFiles.map((file, index) => {
                // Create a plain object from the File object and add the CID
                return {
                    cid: newFileCIDs[index], // Add the new CID
                    name: file.name,
                    size: file.size,
                    noOfPages: file.noOfPages,
                    type: file.type
                };
            });
    
            // Step 5: Merge new and existing files
            const updatedFiles = [
                ...updatedNoCIDFiles,  // New files with updated CIDs
                ...CIDFiles,           // Existing files with CIDs
            ];
    
            // Return the updated files and removeFilesCIDs
            return {
                updatedFiles,
                removeFilesCIDs, // List of CIDs to remove
            };
        } else {
            // If there are no files without CID, just return the existing files
            return {
                updatedFiles: [...CIDFiles],
                removeFilesCIDs,
            };
        }
    };
    

    const submitEditForm = async (updatedFormData) => {
        try {

            console.log('old data: ', updatedFormData);

            // remoce files cids later
            const { updatedFiles, removeFilesCIDs } = await processEditFiles(updatedFormData.files, updatedFormData.filesDetails);


            updatedFormData.filesDetails = updatedFiles;
            delete updatedFormData.files;
            updatedFormData.filesUri = updatedFormData.filesDetails.map((file) => {
                return file.cid;
            });
            // or
            // updatedFormData.filesUri = updatedFormData.files.map(file => file.cid);
            
            updatedFormData.mode = 'edit';

            console.log('new data: ', updatedFormData);

            // const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/v1/cart/updateCartItem`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(updatedFormData),
            // });

            const response = await Api.put(`/api/v1/cart/updateCartItem`, updatedFormData);

            if (response.status !== 200) {
                throw new Error('Failed to update the article.');
            }
            const result = await response.data;
            console.log('Article updated successfully:', result);
            return {result, removeFilesCIDs};
        } catch (error) {
            console.error('Error updating article:', error);
            throw error;
        }
    };

    const submitForm = async (updatedFormData) => {
        try {
            // Upload Files and Update Files Details
            const fileCIDs = await uploadFilesToPinata(formData.files);
            const filesDetails = formData.files.map((file, index) => ({
                cid: fileCIDs[index],
                name: file.name,
                size: file.size,
                noOfPages: file.noOfPages,
                type: file.type,
            }));

            updatedFormData.filesDetails = filesDetails;
            updatedFormData.filesUri = fileCIDs;
            delete updatedFormData.files;
            
            console.log('sent data: ', updatedFormData);

            // const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/v1/cart/addToCart`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(updatedFormData),
            // });

            const response = await Api.post(`/api/v1/cart/addToCart`, updatedFormData);

            if (response.status !== 200) {
                throw new Error('Failed to submit the article.');
            }
            const result = await response.data;
            console.log('Article added successfully:', result);
            return result;
        } catch (error) {
            console.error('Error submitting article:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target.closest("form");

        // Validation Checks
        if (!formData.files || formData.files.length === 0) {
            showAlert('Please upload at least one file', 'error');
            return;
        }
        if (formData.printColor === 'BWandColorMix' && !formData.colorPagesNos) {
            showAlert('Please enter at least one color page number', 'error');
            return;
        }
        // if (!form.checkValidity()) {
        //     form.reportValidity();
        //     return;
        // }

        // // Build updatedFormData
        // const updatedFormData = {
        //     ...formData,
        //     serviceID: selectedService,
        //     articleType: servicesComponents[selectedService]?.articleType,
        // };

        try {
            setIsLoading(true);

            // Send Form Data Based on Mode
            if (mode === 'edit') {
                // Build updatedFormData
                const updatedFormData = {
                    ...formData
                };
                const {result, removeFilesCIDs} = await submitEditForm(updatedFormData);
                console.log(result);
                if(!result){
                    return console.error('Error updating form:');
                }
                setFormData({});
                form.reset();
                navigate('/cart');
                await deleteFilesFromPinata(removeFilesCIDs);
            } else {
                // Build updatedFormData
                const updatedFormData = {
                    ...formData,
                    serviceID: selectedService,
                    articleType: servicesComponents[selectedService]?.articleType,
                };

                const submittedFormResult = await submitForm(updatedFormData);
                if(!submittedFormResult){
                    return console.error('Error submitting form');
                }
                setFormData({});
                form.reset();
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const servicesComponents = {
        1: {
            name: 'Spiral Binding',
            articleType: 'spiralBindingUsrs',
            component: <SpiralBindingForm formData={formData} handleInputChange={handleInputChange} />,
        },
        2: {
            name: 'Thermal Binding',
            articleType: 'thermalBinding',
            component: <ThermalBindingForm formData={formData} handleInputChange={handleInputChange} />,
        },
    };

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div
                        className="text-center space-y-4 px-4 py-8 bg-white bg-opacity-80 rounded-lg shadow-lg flex flex-col items-center justify-center"
                        aria-live="assertive"
                    >
                        <button type="button" className="bg-blue-600 flex items-center px-6 py-3 rounded-lg text-white" disabled>
                            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" />
                            </svg>
                            Processing...
                        </button>
                        <p className="text-black font-medium text-sm leading-relaxed mt-4">
                            Please wait. The files are being received.
                            <br />
                            This may take a while.
                            <br />
                            <span className="text-red-600 font-bold">Don’t close this window until processing is done.</span>
                        </p>
                    </div>
                </div>
            )}

            <div className="p-4 mt-16">
                <h2 className="text-xl font-semibold mb-4">
                    Fill in the details for {selectedService ? servicesComponents[selectedService].name : 'Service'}
                </h2>
                <form onSubmit={handleSubmit} >
                    <FileUpload formData={formData} onFilesChange={handleFilesChange} />
                    {selectedService && servicesComponents[selectedService]?.component}
                    {mode === 'edit' ? (
                        <button
                            type="submit"
                            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
                            disabled={isLoading}
                        >
                            Update cart
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
                            disabled={isLoading}
                        >
                            Add to cart
                        </button>
                    )}
                    {/* <button
                        type="submit"
                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
                        disabled={isLoading}
                    >
                        Add to cart
                    </button> */}
                </form>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full" aria-live="polite">
                        <h3 className="text-lg font-semibold mb-4">Item added to cart</h3>
                        <p className="mb-6">Would you like to checkout or add another service?</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/cart')}
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
                            >
                                Checkout
                            </button>
                            <button
                                onClick={() => navigate('/services')}
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
                            >
                                Add Another
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookServicePage;
