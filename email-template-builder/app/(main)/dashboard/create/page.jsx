import AIInputBox from "@/components/common/AIInputBox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkle } from "lucide-react";

const CreateNewTemplate = () => {
  return (
    <div className="px-10 md-px-28 lg:px-64 xl:px-74 mt-20">
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-bold text-3xl text-primary">
          Create New Email Template
        </h2>
        <p className="text-lg text-gray-400">
          Effortlessly design dynamic, responsive, and visually stunning emails.
        </p>
        <Tabs defaultValue="AI" className="w-[500px] mt-10">
          <TabsList>
            <TabsTrigger value="AI">
              <Sparkle className="w-5 h-5 mr-2" /> Create with AI
            </TabsTrigger>
            <TabsTrigger value="SCRATCH">Start from Scratch</TabsTrigger>
          </TabsList>
          <TabsContent value="AI">
            <AIInputBox />
          </TabsContent>
          <TabsContent value="SCRATCH">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateNewTemplate;
