"use client";
import { useSelectedElement } from "@/app/provider";
import { useEffect, useState } from "react";
import InputFields from "../settingsComp/InputFields";
import ColorPickerFill from "../settingsComp/ColorPickerFill";
import InputStyleField from "../settingsComp/InputStyleField";
import SliderField from "../settingsComp/SliderField";
import TextAreaField from "../settingsComp/TextAreaField";
import ToggleGroupField from "../settingsComp/ToggleGroupField";
import {
  AArrowUp,
  AlignCenter,
  AlignLeft,
  AlignRight,
  CaseLower,
  CaseUpper,
} from "lucide-react";
import DropDownFields from "../settingsComp/DropDownFields";
import ImagePreview from "../settingsComp/ImagePreview";

const TextAlignOption = [
  {
    value: "left",
    icon: AlignLeft,
  },
  {
    value: "center",
    icon: AlignCenter,
  },
  {
    value: "right",
    icon: AlignRight,
  },
];

const TextTransformOption = [
  {
    value: "uppercase",
    icon: CaseUpper,
  },
  {
    value: "lowercase",
    icon: CaseLower,
  },
  {
    value: "capitalize",
    icon: AArrowUp,
  },
];

const Settings = () => {
  const { selectedElement, setSelectedElement } = useSelectedElement();

  const [element, setElement] = useState();

  useEffect(() => {
    setElement(selectedElement?.layout?.[selectedElement?.index]);
  }, [selectedElement]);

  const handleInputChange = (fieldName, value) => {
    // copy of current selectedElement
    const updatedData = {
      ...selectedElement,
    };
    // update the specific field
    updatedData.layout[selectedElement.index][fieldName] = value;
    // update the original selectedElement
    setSelectedElement(updatedData);
  };

  const handleStyleChanges = (fieldName, value) => {
    if (
      !selectedElement ||
      !selectedElement.layout ||
      selectedElement.index === undefined
    ) {
      console.error("Invalid selectedElement or index");
      return;
    }

    // Create an updated version of the selectedElement with modified style
    let updatedElement = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          style: {
            ...selectedElement.layout[selectedElement.index]?.style,
            [fieldName]: value, // Apply the new style change
          },
        },
      },
    };

    // Update the state with the new selectedElement
    setSelectedElement(updatedElement);
  };

  const handleOuterStyleChanges = (fieldName, value) => {
    if (
      !selectedElement ||
      !selectedElement.layout ||
      selectedElement.index === undefined
    ) {
      console.error("Invalid selectedElement or index");
      return;
    }

    // Create an updated version of the selectedElement with modified style
    let updatedElement = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          outerStyle: {
            ...selectedElement.layout[selectedElement.index]?.outerStyle,
            [fieldName]: value, // Apply the new style change
          },
        },
      },
    };

    // Update the state with the new selectedElement
    setSelectedElement(updatedElement);
  };

  return (
    <div className="p-5 flex flex-col gap-4">
      <h2 className="font-bold text-lg">Settings</h2>

      {element?.imageUrl && (
        <ImagePreview
          label={"Image Preview"}
          value={element?.imageUrl}
          handleInputChange={(value) => handleInputChange("imageUrl", value)}
        />
      )}

      {element?.content && (
        <InputFields
          label={"Content"}
          value={element?.content}
          handleInputChange={(value) => handleInputChange("content", value)}
        />
      )}

      {element?.textarea && (
        <TextAreaField
          label={"Text Area"}
          value={element?.textarea}
          handleInputChange={(value) => handleInputChange("textarea", value)}
        />
      )}

      {element?.style.textAlign && (
        <ToggleGroupField
          label={"Text Align"}
          value={element?.style.textAlign}
          options={TextAlignOption}
          handleStyleChanges={(value) => handleStyleChanges("textAlign", value)}
        />
      )}

      {element?.url && (
        <InputFields
          label={"url"}
          value={element?.url}
          handleInputChange={(value) => handleInputChange("url", value)}
        />
      )}

      {element?.style?.width && (
        <SliderField
          label={"Width"}
          value={element?.style?.width}
          type="%"
          handleStyleChanges={(value) => handleStyleChanges("width", value)}
        />
      )}

      {element?.style?.backgroundColor && (
        <ColorPickerFill
          label="Background Color"
          value={element?.style?.backgroundColor}
          handleStyleChanges={(value) =>
            handleStyleChanges("backgroundColor", value)
          }
        />
      )}

      {element?.style?.color && (
        <ColorPickerFill
          label="Text Color"
          value={element?.style?.color}
          handleStyleChanges={(value) => handleStyleChanges("color", value)}
        />
      )}

      {element?.style.textTransform && (
        <ToggleGroupField
          label={"Text Transform"}
          value={element?.style.textTransform}
          options={TextTransformOption}
          handleStyleChanges={(value) =>
            handleStyleChanges("textTransform", value)
          }
        />
      )}

      {element?.style?.fontSize && (
        <InputStyleField
          label={"Font Size"}
          value={element?.style?.fontSize}
          handleStyleChanges={(value) => handleStyleChanges("fontSize", value)}
        />
      )}

      {element?.style?.padding && (
        <InputStyleField
          label={"Padding"}
          value={element?.style?.padding}
          handleStyleChanges={(value) => handleStyleChanges("padding", value)}
        />
      )}

      {element?.style?.margin && (
        <InputStyleField
          label={"Margin"}
          value={element?.style?.margin}
          handleStyleChanges={(value) => handleStyleChanges("margin", value)}
        />
      )}

      {element?.style?.borderRadius && (
        <SliderField
          label={"Border Radius"}
          value={element?.style?.borderRadius}
          handleStyleChanges={(value) =>
            handleStyleChanges("borderRadius", value)
          }
        />
      )}

      {element?.style?.fontWeight && (
        <DropDownFields
          label={"Font Width"}
          value={element?.style?.fontWeight}
          options={["normal", "bold"]}
          handleStyleChanges={(value) =>
            handleStyleChanges("fontWeight", value)
          }
        />
      )}

      <div className="">
        <h2 className="mb-2 font-bold">Outer Style</h2>
        {element?.outerStyle?.backgroundColor && (
          <ColorPickerFill
            label="Background Color"
            value={element?.outerStyle?.backgroundColor}
            handleOuterStyleChanges={(value) =>
              handleOuterStyleChanges("backgroundColor", value)
            }
          />
        )}

        {element?.outerStyle?.justifyContent && (
          <ToggleGroupField
            label="Align"
            value={element?.outerStyle?.justifyContent}
            options={TextAlignOption}
            handleOuterStyleChanges={(value) =>
              handleOuterStyleChanges("justifyContent", value)
            }
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
