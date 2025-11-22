import React, { useState } from "react";
import { FileUp, Trash2, Download } from "lucide-react";
import PDFViewer from "../components/PDFViewer";
import PDFEditor from "../components/PDFEditor";


export default function Home() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleDelete = () => {
    setFile(null);
    setFileUrl(null);
  };

  const handleDownload = () => {
    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = file.name || "document.pdf";
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">PDF Editor</h1>

        {!file ? (
          <label
            htmlFor="pdfUpload"
            className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-10 hover:bg-gray-50 transition"
          >
            <FileUp className="w-12 h-12 text-blue-500 mb-3" />
            <p className="text-gray-600">
              Drag & drop your PDF here or{" "}
              <span className="text-blue-600 font-semibold">browse</span>
            </p>
            <input
              id="pdfUpload"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium text-gray-700 truncate max-w-[60%]">
                {file.name}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
                >
                  <Download className="w-5 h-5" /> Download
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                >
                  <Trash2 className="w-5 h-5" /> Remove
                </button>
              </div>
            </div>

            {/* PDF Viewer Section */}
            <div className="border rounded-xl overflow-hidden shadow-sm mb-8">
              <PDFViewer fileUrl={fileUrl} canvasRef={canvasRef}/>
            </div>

            {/* PDF Editor Section */}
            <PDFEditor fileUrl={fileUrl} canvasRef={canvasRef}/>
          </>
        )}
      </div>
    </div>
  );
}
