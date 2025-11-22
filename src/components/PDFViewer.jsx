import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PDFViewer({ fileUrl }) {
  return (
    <div className="relative flex justify-center">
      {fileUrl ? (
        <Document file={fileUrl}>
          <Page pageNumber={1} width={600} />
        </Document>
      ) : (
        <p>No PDF uploaded yet</p>
      )}
    </div>
  );
}
