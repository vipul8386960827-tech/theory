"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function MediaUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      // 1. Get the Presigned URL from your backend
      const res = await fetch("/api/upload/presigned-url", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });
      const { url, fileKey } = await res.json();

      // 2. Upload the file DIRECTLY to S3/Cloudinary using XHR to track progress
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", file.type);

        // TRACK PROGRESS
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round(
              (event.loaded / event.total) * 100,
            );
            setUploadProgress(percentComplete);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) resolve(fileKey);
          else reject("Upload failed");
        };

        xhr.send(file);
      });
    },
    onSuccess: (fileKey) => {
      console.log("File successfully uploaded to S3:", fileKey);
      // Now you would save the 'fileKey' to your database via another API call
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) uploadMutation.mutate(file);
  };

  return (
    <div
      className="upload-section"
      style={{ padding: "20px", border: "1px dashed #ccc" }}
    >
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        disabled={uploadMutation.isPending}
      />

      {uploadMutation.isPending && (
        <div style={{ marginTop: "10px" }}>
          <progress value={uploadProgress} max="100" />
          <span>{uploadProgress}%</span>
        </div>
      )}

      {uploadMutation.isSuccess && (
        <p style={{ color: "green" }}>Upload Complete!</p>
      )}
      {uploadMutation.isError && <p style={{ color: "red" }}>Upload Failed.</p>}
    </div>
  );
}


//chunking

"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function ChunkedUpload() {
  const [progress, setProgress] = useState(0);

  const chunkedMutation = useMutation({
    mutationFn: async (file) => {
      const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB minimum for S3 multipart
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

      // STEP 1: Initiate Multipart Upload
      const initRes = await fetch("/api/upload/initiate", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });
      const { uploadId, fileKey } = await initRes.json();

      const uploadPromises = [];
      const parts = [];

      // STEP 2: Create and Upload Chunks
      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);
        const partNumber = i + 1;

        // Get a presigned URL specifically for this part
        const partPromise = fetch("/api/upload/presigned-part", {
          method: "POST",
          body: JSON.stringify({ fileKey, uploadId, partNumber }),
        })
          .then((res) => res.json())
          .then(async ({ url }) => {
            // Upload the binary chunk to the signed URL
            const uploadRes = await fetch(url, { method: "PUT", body: chunk });
            // S3 returns an ETag header which is required to "finish" the upload
            const etag = uploadRes.headers.get("ETag");
            parts.push({ ETag: etag, PartNumber: partNumber });
            
            // Update progress
            setProgress(Math.round(((i + 1) / totalChunks) * 100));
          });

        uploadPromises.push(partPromise);
      }

      // Wait for all 5MB chunks to finish uploading
      await Promise.all(uploadPromises);

      // STEP 3: Complete Multipart Upload
      // We send the list of ETags so S3 can merge the file
      await fetch("/api/upload/complete", {
        method: "POST",
        body: JSON.stringify({ fileKey, uploadId, parts: parts.sort((a,b) => a.PartNumber - b.PartNumber) }),
      });

      return fileKey;
    },
  });

  return (
    <div>
      <input type="file" onChange={(e) => chunkedMutation.mutate(e.target.files[0])} />
      {chunkedMutation.isPending && <p>Uploading: {progress}%</p>}
      {chunkedMutation.isSuccess && <p>Video Live!</p>}
    </div>
  );
}