import React, { useState } from "react";
import UploadPDF from "../components/UploadPDF";
import PDFViewer from "../components/PDFViewer";

const Home = () => {
  const [fileUrl, setFileUrl] = useState(null);

  const handleUploadSuccess = (filename) => {
    const fullUrl = `http://localhost:5000/uploads/${filename}`;
    setFileUrl(fullUrl);
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">PDF Editor</h1>
      <UploadPDF onUploadSuccess={handleUploadSuccess} />
      <PDFViewer fileUrl={fileUrl} />
    </div>
  );
};

export default Home;
