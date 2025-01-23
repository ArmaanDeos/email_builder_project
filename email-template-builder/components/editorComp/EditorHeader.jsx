"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  CodeSquare,
  MonitorIcon,
  SaveIcon,
  SendIcon,
  Smartphone,
} from "lucide-react";
import { canvasContext } from "@/app/provider";

const EditorHeader = ({ viewHTMLCode }) => {
  const { canvasSize, setCanvasSize } = canvasContext();
  return (
    <div className="p-4 shadow-sm flex justify-between items-center">
      <Image src={"/logo.svg"} alt="logo" width={180} height={140} />

      <div className="flex gap-3">
        <Button
          variant="outline"
          className={`${canvasSize === "desktop" && "bg-primary text-white"}`}
          onClick={() => setCanvasSize("desktop")}
        >
          <MonitorIcon />
        </Button>
        <Button
          variant="outline"
          className={`${canvasSize === "mobile" && "bg-primary text-white"}`}
          onClick={() => setCanvasSize("mobile")}
        >
          <Smartphone />
        </Button>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="hover:text-primary"
          onClick={() => {
            viewHTMLCode(true);
          }}
        >
          <CodeSquare /> View Code
        </Button>
        <Button variant="outline">
          <SendIcon /> Send Test Email
        </Button>
        <Button>
          <SaveIcon /> Save Template
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
