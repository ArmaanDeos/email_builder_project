"use client";
import { useSelectedElement } from "@/app/provider";
import { useEffect, useState } from "react";
import InputFields from "../settingsComp/InputFields";

const Settings = () => {
  const { selectedElement, setSelectedElement } = useSelectedElement();

  const [element, setElement] = useState();

  useEffect(() => {
    setElement(selectedElement?.layout?.[selectedElement?.index]);
  }, [selectedElement]);

  const handleInputChange = (fieldName, value) => {
    // copy of current selectedElement
    const updatedData = { ...selectedElement };
    // update the specific field
    updatedData.layout[selectedElement.index][fieldName] = value;
    // update the original selectedElement
    setSelectedElement(updatedData);
  };

  return (
    <div className="p-5">
      <h2 className="font-bold text-lg">Settings</h2>

      {element?.content && (
        <InputFields
          label={"Content"}
          value={element?.content}
          handleInputChange={(value) => handleInputChange("content", value)}
        />
      )}
    </div>
  );
};

export default Settings;
