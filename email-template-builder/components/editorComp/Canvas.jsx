"use client";
import {
  canvasContext,
  dragElementContext,
  emailTemplateContext,
} from "@/app/provider";
import { useEffect, useRef, useState } from "react";
import ColumnLayout from "../layoutElement/ColumnLayout";
import ViewHTMLDialog from "../common/ViewHTMLDialog";

const Canvas = ({ viewHTMLCode, closeDialog }) => {
  const htmlRef = useRef();
  const { canvasSize, setCanvasSize } = canvasContext();
  const { dragElementLayout, setDragElementLayout } = dragElementContext();
  const { emailTemplate, setEmailTemplate } = emailTemplateContext();

  const [dragOver, setDragOver] = useState(false);
  const [saveHTMLCode, setSaveHTMLCode] = useState();

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

  useEffect(() => {
    viewHTMLCode && getHTMLCode();
  }, [viewHTMLCode]);

  // Get HTML Code
  const getHTMLCode = () => {
    if (htmlRef.current) {
      const htmlContent = htmlRef.current.innerHTML;
      // console.log(htmlContent);
      setSaveHTMLCode(htmlContent);
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
        ref={htmlRef}
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
      <ViewHTMLDialog
        openDialog={viewHTMLCode}
        htmlCode={saveHTMLCode}
        closeDialog={closeDialog}
      />
    </div>
  );
};

export default Canvas;
