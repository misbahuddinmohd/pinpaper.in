// src/utils/pinata.js
import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
    pinataJwt: process.env.REACT_APP_PINATA_JWT,
    pinataGateway: process.env.REACT_APP_PINATA_GATEWAY_URL,
});

export const uploadFilesToPinata = async (files) => {
    const cids = [];

    try {
        for (const file of files) {
            console.log('file: ', file);
            const upload = await pinata.upload.file(file);
            console.log('Upload response:', upload);
            cids.push(upload.cid); // Save the CID
        }
    } catch (error) {
        console.error('Error uploading files to Pinata:', error);
        throw error;
    }

    return cids;
};


export const getFilesFromPinata = async (filesUris) => {
    try {
        const files = [];
        for (const fileCid of filesUris) {
            const { data, contentType } = await pinata.gateways.get(fileCid);

            if (data instanceof Blob) {
                // Convert Blob data to a File, using a generic name if unavailable
                const fileName = `file-${fileCid}`;
                files.push(new File([data], fileName, { type: contentType }));
            } else {
                console.warn(`Expected Blob data but received ${typeof data} for CID: ${fileCid}`);
            }
        }
        return files;
    } catch (error) {
        console.error('Error fetching files:', error);
        throw error;
    }
};

export const deleteFilesFromPinata = async (filesCIDs) => {
    try {
      let filesIDs = [];
  
      for (const cid of filesCIDs) {
        // Use the updated .list().cid(cid) directly to get file data
        const respData = await pinata.files.list().cid(cid);
        console.log('respData: ', respData);
  
        if (respData && respData.files && respData.files.length > 0) {
          filesIDs.push(respData.files[0].id); // Assuming you want the first match per CID
        }
      }
  
      if (filesIDs.length > 0) {
        const deletedFiles = await pinata.files.delete(filesIDs);
        console.log("Deleted files:", deletedFiles);
      } else {
        console.log("No files found to delete for the given CIDs.");
      }
    } catch (error) {
      console.error("Error deleting files:", error);
      throw error;
    }
  };