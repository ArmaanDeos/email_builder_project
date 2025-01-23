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

  return (
    <div className="">
      <div
        className=""
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
          gap: "0",
        }}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-center cursor-pointer border-[2px] border-dashed ${!layout?.[index]?.type && "bg-gray-100 border-[2px] border-dashed"}  p-4 mb-4 ${index === dragOver?.index && dragOver?.columnId && "bg-green-200"} 
            ${selectedElement?.layout?.id === layout?.id && selectedElement?.index === index && "border-2 border-primary"}`}
            onDragOver={(e) => onDragOverHandler(e, index)}
            onDrop={dropHandler}
            onClick={() => setSelectedElement({ layout: layout, index: index })}
          >
            {GetElementComponent(layout?.[index]) ?? "Drag Element Here"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnLayout;
