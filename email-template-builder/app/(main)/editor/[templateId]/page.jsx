"use client";
import Canvas from "@/components/editorComp/Canvas";
import EditorHeader from "@/components/editorComp/EditorHeader";
import ElementSidebar from "@/components/editorComp/ElementSidebar";
import Settings from "@/components/editorComp/Settings";
import { useState } from "react";

const Editor = ({ closeDialog }) => {
  const [viewHTMLCode, setViewHTMLCode] = useState(false);

  return (
    <div className="">
      <EditorHeader viewHTMLCode={(val) => setViewHTMLCode(val)} />

      <div className="grid grid-cols-5">
        <ElementSidebar />
        <div className="col-span-3 bg-gray-100">
          <Canvas
            viewHTMLCode={viewHTMLCode}
            closeDialog={() => setViewHTMLCode(false)}
          />
        </div>
        <Settings />
      </div>
    </div>
  );
};

export default Editor;
