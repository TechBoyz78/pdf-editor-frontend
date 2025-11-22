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
      className={`w-full max-w-lg p-8 border-2 border-dashed rounded-2xl text-center transition-all cursor-pointer ${
        isDragActive
          ? "border-pink-400 bg-white/20"
          : "border-white/30 hover:bg-white/10"
      }`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <p className="text-white/80 animate-pulse">Uploading...</p>
      ) : isDragActive ? (
        <p className="text-pink-200 font-semibold">Drop it here...</p>
      ) : (
        <p className="text-white/80">
          Drag & drop your PDF here, or click to <span className="text-pink-300 font-semibold">browse</span>
        </p>
      )}
      {error && <p className="text-red-300 mt-2">{error}</p>}
    </div>
  );
};

export default UploadPDF;
