import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { Type, Pencil, Highlighter, Save } from "lucide-react";

export default function PDFEditor({ fileUrl }) {
  const [tool, setTool] = useState("select");
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);

  const handleMouseDown = (e) => {
    if (tool === "draw" || tool === "highlight") {
      setDrawing(true);
      const context = canvasRef.current.getContext("2d");
      context.beginPath();
      context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      setCtx(context);
    }
  };

  const handleMouseMove = (e) => {
    if (!drawing || !ctx) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.lineWidth = tool === "highlight" ? 15 : 2;
    ctx.strokeStyle = tool === "highlight" ? "rgba(255,255,0,0.5)" : "black";
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setDrawing(false);
    if (ctx) ctx.closePath();
  };

  const handleAddText = () => {
    const context = canvasRef.current.getContext("2d");
    context.font = "18px Arial";
    context.fillStyle = "black";
    context.fillText("Sample Text", 150, 150);
  };

  const handleSave = async () => {
    const pdfBytes = await fetch(fileUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const page = pdfDoc.getPages()[0];

    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/png");
    const pngImage = await pdfDoc.embedPng(imageData);
    const { width, height } = page.getSize();
    page.drawImage(pngImage, { x: 0, y: 0, width, height });

    const modifiedPdf = await pdfDoc.save();
    const blob = new Blob([modifiedPdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "edited.pdf";
    link.click();
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Toolbar */}
      <div className="flex gap-3 justify-center my-4">
        <button
          onClick={() => setTool("text")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            tool === "text"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <Type className="w-5 h-5" /> Text
        </button>
        <button
          onClick={() => setTool("draw")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            tool === "draw"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <Pencil className="w-5 h-5" /> Draw
        </button>
        <button
          onClick={() => setTool("highlight")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            tool === "highlight"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <Highlighter className="w-5 h-5" /> Highlight
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg flex items-center gap-2 bg-green-500 text-white hover:bg-green-600"
        >
          <Save className="w-5 h-5" /> Save
        </button>
      </div>

      {/* Canvas overlay */}
      <div className="relative w-[600px] h-[800px]">
        <canvas
          ref={canvasRef}
          width={600}
          height={800}
          className="absolute top-0 left-0 border rounded-lg cursor-crosshair bg-transparent"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      </div>

      {tool === "text" && (
        <button
          onClick={handleAddText}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Sample Text
        </button>
      )}
    </div>
  );
}
