import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadPDF } from "../api";

const UploadPDF = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("pdf", file);

    setUploading(true);
    setError(null);

    try {
      const res = await uploadPDF(formData);
      onUploadSuccess(res.data.filename);
    } catch (err) {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the PDF here...</p>
      ) : (
        <p>Drag & drop a PDF here, or click to upload</p>
      )}
      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadPDF;
