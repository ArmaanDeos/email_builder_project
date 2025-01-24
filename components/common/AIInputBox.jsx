"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Prompt from "@/Data/Prompt";
import axios from "axios";
import { useMutation } from "convex/react";
import { v4 as uuidv4 } from "uuid";
import { userContext } from "@/app/provider";
import { api } from "@/convex/_generated/api";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const AIInputBox = () => {
  const [userInput, setUserInput] = useState(""); // Initialize with an empty string
  const [loading, setLoading] = useState(false);

  // Correct mutation path as a string
  const SaveTemplate = useMutation(api.emailTemplates.SaveTemplate);

  const { userDetail } = userContext(); // Destructure safely

  const router = useRouter();

  // console.log(userDetail);
  // console.log(userInput);

  const handleGenerate = async () => {
    if (!userInput) {
      console.error("User input is missing!");
      return;
    }

    if (!userDetail?.email) {
      console.error("User email is missing in the context!");
      return;
    }

    const PROMPT = `${Prompt.EMAIL_PROMPT}\n-${userInput}`;
    const tid = uuidv4();
    setLoading(true);

    try {
      const result = await axios.post("/api/ai-email-generate", {
        prompt: PROMPT,
      });

      console.log("AI Generated Email:", result.data);

      const res = await SaveTemplate({
        tid: tid,
        design: result?.data,
        email: userDetail.email,
        description: userInput,
      });

      // navigate user to editor screen
      router.push("/editor/" + tid);

      console.log("Save Template Response:", res);
    } catch (error) {
      console.error("Error during email generation or saving:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <p className="mb-2">
        Provide details about the email template you'd like to create.
      </p>
      <Textarea
        placeholder="Start typing here..."
        rows={5}
        className="text-xl"
        value={userInput} // Bind the value to the state
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Button
        className="mt-7 w-full"
        disabled={!userInput || loading} // Use a cleaner check for disabled state
        onClick={handleGenerate}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader className="animate-spin" /> Generating Please wait.
          </span>
        ) : (
          "Generate"
        )}
      </Button>
    </div>
  );
};

export default AIInputBox;
