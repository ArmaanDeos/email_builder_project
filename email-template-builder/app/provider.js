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
  const [selectedElement, setSelectedElement] = useState([]);

  console.log("Provider", emailTemplate);

  // Check for user logged in or not
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storage = localStorage.getItem("userDetail");
        // const emailTemplateStorage = localStorage.getItem("emailTemplate");

        // Parse if data exists, otherwise fallback to default values
        setUserDetail(storage ? JSON.parse(storage) : null);
        // setEmailTemplate(
        //   emailTemplateStorage ? JSON.parse(emailTemplateStorage) : []
        // );

        if (!storage || !JSON.parse(storage)?.email) {
          // Handle redirection if needed (e.g., navigate to home)
          console.warn("User not logged in.");
        }
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
        setUserDetail(null);
        setEmailTemplate([]);
      }
    }
  }, []);

  // Save email template in local storage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const emailTemplateStorage = localStorage.getItem("emailTemplate");
        const parsedTemplate = emailTemplateStorage
          ? JSON.parse(emailTemplateStorage)
          : [];

        // console.log("Parsed Email Template:", parsedTemplate); // Debug

        setEmailTemplate(parsedTemplate);
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
        setEmailTemplate([]);
      }
    }
  }, []);

  // Updating email template when selected element changes
  useEffect(() => {
    if (selectedElement && emailTemplate.length > 0) {
      const updatedEmailTemplate = emailTemplate?.map((item) =>
        item.id === selectedElement?.layout?.id ? selectedElement?.layout : item
      );
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
                  <div>{children}</div>
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
