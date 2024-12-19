// src/components/ServiceForms/FileUpload.jsx
import React, { useState, useEffect } from 'react';
import { FileText, Trash2 } from 'lucide-react';
import getPagesCount from '../../utils/countPages';

const FileUpload = ({ formData, onFilesChange }) => {
    const [files, setFiles] = useState([]);
    const [totalSize, setTotalSize] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // Initialize with pre-populated files if they exist
        if (formData.files && formData.files.length > 0) {
            setFiles(formData.files);

            // below lines code is to be reviewed and its affect
            const newTotalSize = formData.files.reduce((sum, file) => sum + file.size, 0);
            setTotalSize(newTotalSize);
            setTotalPages(formData.noOfPages);
        }
    }, [formData.files, formData.noOfPages]);

    const formatFileName = (name) => {
        const maxLength = 20;
        const extension = name.split('.').pop();
        const nameWithoutExtension = name.slice(0, name.length - extension.length - 1);

        if (name.length <= maxLength) {
            return name;
        } else {
            const visibleStart = nameWithoutExtension.slice(0, 10);
            const visibleEnd = nameWithoutExtension.slice(-7);
            return `${visibleStart}...${visibleEnd}.${extension}`;
        }
    };

    const handleFileUpload = async (e) => {
        const newFiles = Array.from(e.target.files);
        const validTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            // 'application/vnd.ms-powerpoint', // PPT
            // 'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX
            // 'image/jpeg',
            // 'image/png',
            // 'image/jpg',

        ];
        const maxFileSize = 50 * 1024 * 1024;
        const maxTotalSize = 200 * 1024 * 1024;

        let newTotalSize = totalSize;
        let totalPageCount = totalPages;

        const validFiles = [];
        for (const file of newFiles) {
            const isValid = validTypes.includes(file.type) && file.size <= maxFileSize;
            if (isValid) {
                newTotalSize += file.size;
                const pages = await getPagesCount(file);
                totalPageCount += pages;
                file.noOfPages = pages; // ---
                validFiles.push(file);
            }
        }

        if (validFiles.length !== newFiles.length) {
            alert('Some files were not uploaded due to invalid type or size. Only PDF, DOC, DOCX under 50MB are allowed.');
        }

        if (newTotalSize > maxTotalSize) {
            alert('Total file size exceeds 200MB. Please select smaller files.');
            return;
        }

        const totalFiles = [...files, ...validFiles].slice(0, 5);
        if (totalFiles.length > 5) {
            alert('You can only upload up to 5 files.');
        }

        setFiles(totalFiles);
        setTotalSize(newTotalSize);
        setTotalPages(totalPageCount);
        // setFiles((prevFiles) => {
        //     prevFiles.noOfPages = totalPages;

        // });

        // formData.noOfPages = totalPageCount;
        // or
        // setTotalPages((prevTotalPages) => { // not working
        //     console.log(prevTotalPages + " " + totalPageCount)
        //     const updatedPages = prevTotalPages + totalPageCount;
        //     formData.noOfPages = updatedPages; // Update formData with latest totalPages
        //     return updatedPages;
        // });

        onFilesChange(totalFiles);
    };

    const removeFile = (index) => {
        const fileToRemove = files[index];
        // const pagesToRemove = fileToRemove.noOfPages;
        const updatedFiles = files.filter((_, i) => i !== index);

        setTotalSize((prevSize) => prevSize - fileToRemove.size);
        // const prevNoOfPages = formData.noOfPages;
        // formData.noOfPages = prevNoOfPages - pagesToRemove; 
        setFiles(updatedFiles);
        onFilesChange(updatedFiles);
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Upload Files (Max 5, Total Size ≤ 200MB)</label>
            <div className="border-2 border-dashed border-gray-500 rounded-lg p-5 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-blue-600" />

                <label htmlFor="uploadFile1"
                    className="flex bg-blue-600 hover:bg-blue-800 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white inline" viewBox="0 0 32 32">
                        <path
                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                        />
                        <path
                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                        />
                    </svg>
                    Upload
                    <input id="uploadFile1" type="file" onChange={handleFileUpload} multiple className="hidden" />
                </label>

                <p className="text-sm mt-3 text-gray-500">
                    <span style={{ color: "blue", fontWeight: "bold" }}>Recommended file type is PDF</span> <br />
                    Allowed files type: <span style={{ color: "blue" }}>PDF.</span> <br />
                    If yours is a <span style={{ color: "red" }}>DOC, DOCX, PPT, PPTX, JPG, JPEG, PNG</span> convert it to PDF <br />
                    (Max 50MB each, up to 5 files, Total ≤ 200MB)
                </p>

                {files.length > 0 && (
                    <ul className="mt-4 grid grid-cols-1 gap-4">
                        {files.map((file, index) => (
                            <li key={index} className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center">
                                    <FileText className="w-8 h-8 text-blue-500 mr-2" />
                                    <div>
                                        <p className="text-sm text-left font-medium text-gray-800 truncated">{formatFileName(file.name)}</p>
                                        <p className="text-xs text-left text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="text-red-600 hover:text-red-800 ml-3"
                                >
                                    <Trash2 className="w-6 h-6" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <p className="text-sm text-gray-600 mt-2">Total size: {(totalSize / (1024 * 1024)).toFixed(2)} MB</p>
                {/* <p className="text-sm text-gray-600 mt-2">Total pages: {totalPages}</p> */}
            </div>
        </div>
    );
};

export default FileUpload;
