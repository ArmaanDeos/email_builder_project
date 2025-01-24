"use client";
import {
  dragElementContext,
  emailTemplateContext,
  useSelectedElement,
} from "@/app/provider";
import { useState } from "react";
import ButtonElement from "../elementComp/ButtonElement";
import TextElement from "../elementComp/TextElement";
import ImageElement from "../elementComp/ImageElement";
import LogoElement from "../elementComp/LogoElement";
import DividerElement from "../elementComp/DividerElement";
import SocialElement from "../elementComp/SocialElement";
import HeaderLogoElement from "../elementComp/HeaderLogoElement";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";

const ColumnLayout = ({ layout }) => {
  const [dragOver, setDragOver] = useState();
  const { emailTemplate, setEmailTemplate } = emailTemplateContext();
  const { dragElementLayout, setDragElementLayout } = dragElementContext();
  const { selectedElement, setSelectedElement } = useSelectedElement();

  const onDragOverHandler = (e, index) => {
    e.preventDefault();
    setDragOver({
      index: index,
      columnId: layout?.id,
    });
  };

  const dropHandler = (e) => {
    const index = dragOver.index;
    setEmailTemplate((prevItem) =>
      prevItem.map((col) =>
        col.id === layout?.id
          ? { ...col, [index]: dragElementLayout?.dragElement }
          : col
      )
    );
    setDragOver(null);
  };

  const GetElementComponent = (element) => {
    if (element?.type === "Button") {
      return <ButtonElement {...element} />;
    }
    if (element?.type === "Text") {
      return <TextElement {...element} />;
    }
    if (element?.type === "Image") {
      return <ImageElement {...element} />;
    }
    if (element?.type === "Logo") {
      return <LogoElement {...element} />;
    }

    if (element?.type === "Divider") {
      return <DividerElement {...element} />;
    }

    if (element?.type === "SocialIcons") {
      return <SocialElement {...element} />;
    }
    if (element?.type === "LogoHeader") {
      return <HeaderLogoElement {...element} />;
    }

    return element?.type;
  };

  const deleteLayout = (layoutId) => {
    const updatedEmailTemplate = emailTemplate.filter(
      (item) => item.id !== layoutId
    );
    setEmailTemplate(updatedEmailTemplate);
    setSelectedElement(null);
  };

  const moveItemUp = (layoutId) => {
    const index = emailTemplate.findIndex((item) => item.id === layoutId);
    if (index > 0) {
      setEmailTemplate((prevItems) => {
        const updatedItems = [...prevItems];
        // save the current item with the one above it
        [updatedItems[index], updatedItems[index - 1]] = [
          updatedItems[index - 1],
          updatedItems[index],
        ];
        return updatedItems;
      });
    }
  };
  const moveItemDown = (layoutId) => {
    const index = emailTemplate.findIndex((item) => item.id === layoutId);
    if (index > 0) {
      setEmailTemplate((prevItems) => {
        const updatedItems = [...prevItems];
        // save the current item with the one above it
        [updatedItems[index], updatedItems[index + 1]] = [
          updatedItems[index + 1],
          updatedItems[index],
        ];
        return updatedItems;
      });
    }
  };

  return (
    <div className="relative">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
          gap: "0px",
        }}
        className={`${selectedElement?.layout?.id === layout?.id && "border-4 border-dashed border-blue-500"}`}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center p-4 justify-center cursor-pointer border-[2px] border-dashed ${!layout?.[index]?.type && "bg-gray-100 border-[2px] border-dashed"}  mb-4 ${index === dragOver?.index && dragOver?.columnId && "bg-green-200"} 
            ${selectedElement?.layout?.id === layout?.id && selectedElement?.index === index && "border-2 border-primary"}`}
            onDragOver={(e) => onDragOverHandler(e, index)}
            onDrop={dropHandler}
            onClick={() => setSelectedElement({ layout: layout, index: index })}
          >
            {GetElementComponent(layout?.[index]) ?? "Drag Element Here"}
          </div>
        ))}

        {selectedElement?.layout?.id === layout?.id && (
          <div className="absolute -right-10 flex gap-2 flex-col">
            <div
              className="cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md"
              onClick={() => deleteLayout(layout?.id)}
            >
              <Trash className="w-4 h-4 text-red-500 cursor-pointer" />
            </div>
            <div
              className="cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md"
              onClick={() => moveItemUp(layout?.id)}
            >
              <ArrowUp className="w-4 h-4" />
            </div>
            <div
              className="cursor-pointer   bg-gray-100 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md"
              onClick={() => moveItemDown(layout?.id)}
            >
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColumnLayout;
