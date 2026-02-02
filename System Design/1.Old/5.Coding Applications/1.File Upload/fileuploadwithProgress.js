import React, { useState } from "react";

export default function FileUploadFetchSimple() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setDownloadUrl("");
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://tmpfiles.org/api/v1/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();

      // tmpfiles returns a URL inside data.url
      setDownloadUrl(result.data.url);
      setFile(null);
    } catch (err) {
      setError("Upload failed");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {downloadUrl && (
        <div>
          Uploaded successfully:{" "}
          <a href={downloadUrl} target="_blank" rel="noreferrer">
            View File
          </a>
        </div>
      )}
    </div>
  );
}
