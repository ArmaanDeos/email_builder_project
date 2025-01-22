import Canvas from "@/components/editorComp/Canvas";
import EditorHeader from "@/components/editorComp/EditorHeader";
import ElementSidebar from "@/components/editorComp/ElementSidebar";
import Settings from "@/components/editorComp/Settings";

const Editor = () => {
  return (
    <div className="">
      <EditorHeader />

      <div className="grid grid-cols-5">
        <ElementSidebar />
        <div className="col-span-3 bg-gray-100">
          <Canvas />
        </div>
        <Settings />
      </div>
    </div>
  );
};

export default Editor;
