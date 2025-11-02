import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// ✅ Use local worker file
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const PDFViewer = ({ fileUrl }) => {
  return (
    <div className="mt-4">
      {fileUrl ? (
        <Document file={fileUrl}>
          <Page pageNumber={1} width={600} />
        </Document>
      ) : (
        <p>No PDF uploaded yet</p>
      )}
    </div>
  );
};

export default PDFViewer;
