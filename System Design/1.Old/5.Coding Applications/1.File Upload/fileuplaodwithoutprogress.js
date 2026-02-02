/*  
===============================================================================
FRONTEND SYSTEM DESIGN — FILE UPLOAD SYSTEM (REACT)
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================
*/

import React, { useState } from "react";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type");
      setSelectedFile(null);
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      setError("File size exceeds 5MB");
      setSelectedFile(null);
      return;
    }

    setError("");
    setSelectedFile(file);
    setUploadedFileUrl("");
    setUploadProgress(0);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    /*
      Files cannot be sent as JSON,
      so FormData is used for multipart/form-data upload.
    */
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      /*
        Using XMLHttpRequest instead of fetch
        because fetch does NOT support upload progress events.
      */
      const xhr = new XMLHttpRequest();

      // REAL PUBLIC TEST API
      xhr.open("POST", "https://tmpfiles.org/api/v1/upload");

      // Upload progress tracking
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      // Success / failure handling
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);

          /*
            tmpfiles response structure:
            {
              status: "success",
              data: { url: "https://tmpfiles.org/xxxx" }
            }
          */
          setUploadedFileUrl(response.data.url);
          setSelectedFile(null);
          setUploadProgress(0);
        } else {
          setError("Upload failed");
        }
      };

      xhr.onerror = () => {
        setError("Upload failed");
      };

      xhr.send(formData);
    } catch (err) {
      setError("Upload failed");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      {error && <div style={{ color: "red" }}>{error}</div>}

      {selectedFile && <div>Selected File: {selectedFile.name}</div>}

      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>

      {uploadProgress > 0 && <div>Uploading: {uploadProgress}%</div>}

      {uploadedFileUrl && (
        <div>
          Uploaded File:{" "}
          <a href={uploadedFileUrl} target="_blank" rel="noreferrer">
            View / Download
          </a>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
