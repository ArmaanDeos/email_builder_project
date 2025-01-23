"use client";
import {
  canvasContext,
  dragElementContext,
  emailTemplateContext,
} from "@/app/provider";
import { useState } from "react";
import ColumnLayout from "../layoutElement/ColumnLayout";

const Canvas = () => {
  const { canvasSize, setCanvasSize } = canvasContext();
  const { dragElementLayout, setDragElementLayout } = dragElementContext();
  const { emailTemplate, setEmailTemplate } = emailTemplateContext();

  const [dragOver, setDragOver] = useState(false);

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
    // console.log("Over..");
  };

  const onDropHandler = (e) => {
    setDragOver(false);

    if (dragElementLayout?.dragLayout) {
      setEmailTemplate((prev) => [...prev, dragElementLayout?.dragLayout]);
    }
  };

  // Multiple Layout Columns
  const getLayoutComponent = (layout) => {
    if (layout?.type === "column") {
      return <ColumnLayout layout={layout} />;
    }
  };

  return (
    <div className="mt-20 flex justify-center">
      <div
        className={`bg-white p-6 w-full ${
          canvasSize === "desktop" ? "max-w-2xl" : "max-w-md"
        } ${dragOver && "bg-red-200 p-4"}`}
        onDragOver={onDragOver}
        onDrop={() => onDropHandler()}
      >
        {emailTemplate?.length > 0 ? (
          emailTemplate?.map((layout, index) => (
            <div key={index}>{getLayoutComponent(layout)}</div>
          ))
        ) : (
          <h2 className="text-center p-4 bg-gray-200 border border-dashed shadow-sm rounded-xl">
            Drag and drop elements here.
          </h2>
        )}
      </div>
    </div>
  );
};

export default Canvas;
