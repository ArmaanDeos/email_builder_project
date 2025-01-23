"use client";
import { canvasContext } from "@/app/provider";

const Canvas = () => {
  const { canvasSize, setCanvasSize } = canvasContext();

  return (
    <div className="mt-20 flex justify-center">
      <div
        className={`bg-white p-6 w-full ${
          canvasSize === "desktop" ? "max-w-2xl" : "max-w-md"
        }`}
      ></div>
    </div>
  );
};

export default Canvas;
