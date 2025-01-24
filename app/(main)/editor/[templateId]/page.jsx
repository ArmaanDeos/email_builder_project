"use client";
import { emailTemplateContext, userContext } from "@/app/provider";
import Canvas from "@/components/editorComp/Canvas";
import EditorHeader from "@/components/editorComp/EditorHeader";
import ElementSidebar from "@/components/editorComp/ElementSidebar";
import Settings from "@/components/editorComp/Settings";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";

const Editor = ({ closeDialog }) => {
  const [viewHTMLCode, setViewHTMLCode] = useState(false);
  const { templateId } = useParams();
  const convex = useConvex();
  const { emailTemplate, setEmailTemplate } = emailTemplateContext();
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = userContext();

  console.log("Email Templates", emailTemplate);

  useEffect(() => {
    if (userDetail) {
      GetTemplateData();
    }
  }, [userDetail]);

  const GetTemplateData = async () => {
    setLoading(true);
    const result = await convex.query(api.emailTemplates.GetTemplateDesign, {
      tid: templateId,
      email: userDetail?.email,
    });
    console.log("Email Data", result);
    setEmailTemplate(result?.design);
    setLoading(false);
  };

  return (
    <div className="">
      <EditorHeader viewHTMLCode={(val) => setViewHTMLCode(val)} />

      {!loading ? (
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
      ) : (
        <h2 className="text-center p-20">Loading...</h2>
      )}
    </div>
  );
};

export default Editor;
