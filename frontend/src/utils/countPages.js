import { PDFDocument } from 'pdf-lib';
// const mammoth = require('mammoth');
// const libre = require('libreoffice-convert');
// const fs = require('fs').promises;

// Function to get page count of PDF
const getPdfPageCount = async (file) => {
    const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true});
    return pdfDoc.getPageCount();
};

// Function to convert DOCX to PDF and get page count
// const getDocxPageCount = async (file) => {
//     const docxBuffer = await file.arrayBuffer();
//     const pdfBuffer = await new Promise((resolve, reject) => {
//         libre.convert(docxBuffer, '.pdf', undefined, (err, result) => {
//             if (err) reject(err);
//             resolve(result);
//         });
//     });
//     const pdfDoc = await PDFDocument.load(pdfBuffer);
//     return pdfDoc.getPageCount();
// };

let totalPageCount = 0;
const getPagesCount = async (file) => {
    if (file.type === 'application/pdf') {
        totalPageCount = await getPdfPageCount(file);
    }
    // else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    //     totalPageCount = await getDocxPageCount(file);
    // }
    return totalPageCount;
};

export default getPagesCount;