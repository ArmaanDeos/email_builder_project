"use client";
import { CanvasSize } from "@/context/CanvasSize";
import { DragDropLayoutElement } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { SelectedElementContext } from "@/context/SelectedElementContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useContext, useEffect, useState } from "react";
const Provider = ({ children }) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  const [userDetail, setUserDetail] = useState(null);
  const [canvasSize, setCanvasSize] = useState("desktop");
  const [dragElementLayout, setDragElementLayout] = useState(null);

  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedElement, setSelectedElement] = useState();

  // check for user logged in or not
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = JSON.parse(localStorage.getItem("userDetail"));
      // get email template
      const emailTemplateStorage = JSON.parse(
        localStorage.getItem("emailTemplate")
      );
      setEmailTemplate(emailTemplateStorage);

      if (!storage?.email || !storage) {
        // redirect to home page
      } else {
        setUserDetail(storage);
      }
    }
  }, []);

  // Save email template on local storage on change
  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
  }, [emailTemplate]);

  // Updating setting
  useEffect(() => {
    if (selectedElement) {
      let updatedEmailTemplate = [];
      emailTemplate.forEach((item) => {
        if (item.id === selectedElement?.layout?.id) {
          updatedEmailTemplate.push(selectedElement?.layout);
        } else {
          updatedEmailTemplate.push(item);
        }
      });
      setEmailTemplate(updatedEmailTemplate);
    }
  }, [selectedElement]);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <CanvasSize.Provider value={{ canvasSize, setCanvasSize }}>
            <DragDropLayoutElement.Provider
              value={{ dragElementLayout, setDragElementLayout }}
            >
              <EmailTemplateContext.Provider
                value={{ emailTemplate, setEmailTemplate }}
              >
                <SelectedElementContext.Provider
                  value={{ selectedElement, setSelectedElement }}
                >
                  <div> {children}</div>
                </SelectedElementContext.Provider>
              </EmailTemplateContext.Provider>
            </DragDropLayoutElement.Provider>
          </CanvasSize.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
};

export default Provider;

export const userContext = () => {
  return useContext(UserDetailContext);
};

export const canvasContext = () => {
  return useContext(CanvasSize);
};

export const dragElementContext = () => {
  return useContext(DragDropLayoutElement);
};

export const emailTemplateContext = () => {
  return useContext(EmailTemplateContext);
};

export const useSelectedElement = () => {
  return useContext(SelectedElementContext);
};
